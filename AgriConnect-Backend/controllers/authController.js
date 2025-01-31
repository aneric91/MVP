const User = require('../models/User');
const Subscription = require('../models/Subscription');
const axios = require('axios'); // Pour envoyer l'OTP via Interswitch
const jwt = require('jsonwebtoken');

// Envoi d'un OTP
exports.sendOTP = async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ error: "Numéro de téléphone requis" });
    }

    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await axios.post('https://api.interswitch.com/v3/otp/send', {
            phoneNumber,
            otp
        });

        let user = await User.findOne({ phoneNumber });
        if (!user) {
            user = new User({ phoneNumber, otp });
        } else {
            user.otp = otp;
        }
        await user.save();
        res.json({ message: "OTP envoyé", phoneNumber });
    } catch (error) {
        console.error("Erreur envoi OTP:", error);
        res.status(500).json({ error: "Échec de l'envoi de l'OTP" });
    }
};

// Vérification de l'OTP et inscription/connexion
exports.verifyOTP = async (req, res) => {
    const { phoneNumber, otp, name, region, farmSize, address } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });

        if (!user || user.otp !== otp) {
            return res.status(400).json({ error: "OTP invalide ou expiré" });
        }

        // Mise à jour des infos utilisateur lors de l'inscription
        if (!user.name) {
            user.name = name;
            user.region = region;
            user.farmSize = farmSize;
            user.address = address;

            // Attribution automatique d'un abonnement
            const subscription = await Subscription.findOne({
                minSize: { $lte: farmSize },
                maxSize: { $gte: farmSize }
            });

            if (!subscription) {
                return res.status(400).json({ error: "Aucun abonnement disponible pour cette superficie." });
            }

            user.subscription = subscription._id;
            user.paymentStatus = 'pending';
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        user.otp = null;
        await user.save();

        res.json({ message: "Connexion réussie", token, user });
    } catch (error) {
        console.error("Erreur vérification OTP:", error);
        res.status(500).json({ error: "Échec de la vérification OTP" });
    }
};
