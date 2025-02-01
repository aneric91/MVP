const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

exports.register = async (req, res) => {
    let { phoneNumber, name, region, farmSize, address } = req.body;

    try {
        // 🔹 Vérifier que les champs obligatoires sont bien remplis
        if (!phoneNumber || !farmSize) {
            return res.status(400).json({ error: "Numéro de téléphone et superficie sont obligatoires." });
        }

        // 🔹 Normalisation des entrées
        phoneNumber = phoneNumber.trim();
        name = name ? name.trim() : '';
        region = region ? region.trim() : '';
        address = address ? address.trim() : '';

        // 🔹 Vérifier si l'utilisateur est déjà inscrit
        let user = await User.findOne({ phoneNumber });
        if (user) {
            return res.status(400).json({ error: "Utilisateur déjà enregistré" });
        }

        // 🔹 Convertir `farmSize` en nombre
        farmSize = Number(farmSize);
        if (isNaN(farmSize) || farmSize <= 0) {
            return res.status(400).json({ error: "Superficie invalide." });
        }

        // 🔹 Trouver l'abonnement correspondant
        const subscription = await Subscription.findOne({
            minSize: { $lte: farmSize },
            maxSize: { $gte: farmSize }
        });

        if (!subscription) {
            return res.status(400).json({ error: "Aucun abonnement disponible pour cette superficie." });
        }

        // 🔹 Créer un nouvel utilisateur
        user = new User({
            phoneNumber,
            name,
            region,
            farmSize,
            address,
            subscription: subscription._id
        });

        await user.save();

        // 🔹 Générer un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ message: "Inscription réussie", token, user });
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        res.status(500).json({ error: "Échec de l'inscription" });
    }
};

// 🔹 Connexion d'un utilisateur existant
exports.login = async (req, res) => {
    let { phoneNumber } = req.body;

    try {
        if (!phoneNumber) {
            return res.status(400).json({ error: "Le numéro de téléphone est requis." });
        }

        phoneNumber = phoneNumber.trim();

        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(400).json({ error: "Utilisateur non trouvé" });
        }

        // 🔹 Générer un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ message: "Connexion réussie", token, user });
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        res.status(500).json({ error: "Échec de la connexion" });
    }
};
