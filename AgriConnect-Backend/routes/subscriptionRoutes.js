const express = require('express');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware'); // Assurez-vous que ce middleware vérifie le token JWT et ajoute req.user
// routes/subscriptionRoutes.js
const router = express.Router();

// Route pour récupérer tous les abonnements (optionnel)
router.get('/subscriptions', async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.json(subscriptions);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des abonnements." });
    }
});

// Route pour sélectionner un abonnement (choix du plan) – Accessible aux utilisateurs authentifiés
router.post('/choose', async (req, res) => {
    try {
      const { userId, subscriptionId } = req.body;
  
      if (!userId || !subscriptionId) {
        return res.status(400).json({ message: "User ID and Subscription ID are required" });
      }
  
      // Vérifier que l'abonnement existe
      const subscription = await Subscription.findById(subscriptionId);
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }
  
      // Mettre à jour l'utilisateur avec le nouvel abonnement et peupler le champ 'subscription'
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { subscription: subscriptionId },
        { new: true }
      ).populate('subscription', 'name price minSize maxSize includes'); // Peupler avec les champs souhaités
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        message: "Subscription chosen successfully",
        user: updatedUser
      });
    } catch (error) {
      console.error("Error selecting subscription:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

module.exports = router;