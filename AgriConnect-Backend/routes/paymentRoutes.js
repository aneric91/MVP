const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
    const { amount, customerId } = req.body;

    try {
        const response = await axios.post('https://api.interswitch.com/v3/invoices', {
            amount, customerId, currency: "EUR"
        }, {
            headers: { Authorization:`Bearer ${process.env.INTERSWITCH_API_KEY}`}
        });

        res.json({ paymentUrl: response.data.paymentLink });
    } catch (error) {
        res.status(400).json({ error: "Erreur de paiement" });
    }
});

module.exports = router;
