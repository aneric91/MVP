const User = require('../models/User');
const axios = require('axios'); // Pour envoyer l'OTP via Interswitch
const jwt = require('jsonwebtoken');

//  Envoi d'un OTP
exports.sendOTP = async (req, res) => {
    const { phoneNumber } = req.body;
    
    if (!phoneNumber) {
        return res.status(400).json({ error: "Numéro de téléphone requis" });
    }

    try {
        //  Génération d'un OTP à 6 chiffres
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Envoi via API Interswitch (simulation ici)
        await axios.post('https://api.interswitch.com/v3/otp/send', {
            phoneNumber,
            otp
        });

        // Vérifier si l'utilisateur existe déjà
        let user = await User.findOne({ phoneNumber });

        if (!user) {
            //  Création d'un nouvel utilisateur temporaire avec OTP
            user = new User({ phoneNumber, otp });
        } else {
            //  Mise à jour de l'OTP
            user.otp = otp;
        }

        await user.save();
        res.json({ message: "OTP envoyé", phoneNumber });

    } catch (error) {
        console.error("Erreur envoi OTP:", error);
        res.status(500).json({ error: "Échec de l'envoi de l'OTP" });
    }
};

//  Vérification de l'OTP
exports.verifyOTP = async (req, res) => {
    const { phoneNumber, otp, name, region, farmSize, address } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });

        if (!user || user.otp !== otp) {
            return res.status(400).json({ error: "OTP invalide ou expiré" });
        }

        //  Mise à jour des informations utilisateur s'il est nouveau
        if (!user.name) {
            user.name = name;
            user.region = region;
            user.farmSize = farmSize;
            user.address = address;
        }

        // Génération du token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Suppression de l'OTP après validation
        user.otp = null;
        await user.save();

        res.json({ message: "Connexion réussie", token, user });

    } catch (error) {
        console.error("Erreur vérification OTP:", error);
        res.status(500).json({ error: "Échec de la vérification OTP" });
    }
};
