const express = require('express');
const Subscription = require('../models/Subscription');

const router = express.Router();

// Route pour récupérer tous les abonnements
router.get('/subscriptions', async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.json(subscriptions);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des abonnements." });
    }
});

module.exports = router;
