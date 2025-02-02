const express = require('express');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware'); // Assurez-vous que ce middleware vérifie le token JWT et ajoute req.user

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
router.post('/choose', authMiddleware, async (req, res) => {
    const { planName } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        // Chercher l'abonnement correspondant par nom
        const subscription = await Subscription.findOne({ name: planName });
        if (!subscription) {
            return res.status(404).json({ error: "Abonnement non trouvé" });
        }

        user.subscription = subscription._id;
        await user.save();

        res.json({ message: "Abonnement sélectionné avec succès", subscription });
    } catch (error) {
        console.error("Erreur lors de la sélection de l'abonnement:", error);
        res.status(500).json({ error: "Erreur lors de la sélection de l'abonnement" });
    }
});

module.exports = router;
