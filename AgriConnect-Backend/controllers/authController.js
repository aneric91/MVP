const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const bcrypt = require('bcrypt');

// 🔹 Fonction de validation du numéro de téléphone
const validatePhoneNumber = (phoneNumber) => {
    return /^\+?[0-9]{7,15}$/.test(phoneNumber);
};

// 🔹 Inscription
exports.register = async (req, res) => {
    let { phoneNumber, name, region, farmSize, address, email, password } = req.body;

    try {
        if (!phoneNumber || !farmSize || !password) {
            return res.status(400).json({ error: "Le numéro de téléphone, la superficie et le mot de passe sont obligatoires." });
        }

        phoneNumber = phoneNumber.trim();
        if (!validatePhoneNumber(phoneNumber)) {
            return res.status(400).json({ error: "Numéro de téléphone invalide." });
        }

        name = name ? name.trim() : '';
        region = region ? region.trim() : '';
        address = address ? address.trim() : '';
        farmSize = Number(farmSize);

        const userExists = await User.findOne({ phoneNumber });
        if (userExists) {
            return res.status(400).json({ error: "Utilisateur déjà enregistré." });
        }

        const subscription = await Subscription.findOne({
            minSize: { $lte: farmSize },
            maxSize: { $gte: farmSize }
        });
        if (!subscription) {
            return res.status(400).json({ error: "Aucun abonnement disponible pour cette superficie." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            phoneNumber,
            name,
            region,
            farmSize,
            address,
            email: email ? email.trim() : undefined,
            password: hashedPassword,
            subscription: subscription._id
        });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: "Inscription réussie", token, user: newUser });
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        res.status(500).json({ error: "Échec de l'inscription." });
    }
};

// 🔹 Connexion
exports.login = async (req, res) => {
    let { phoneNumber, password } = req.body;

    try {
        if (!phoneNumber || !password) {
            return res.status(400).json({ error: "Le numéro de téléphone et le mot de passe sont requis." });
        }

        phoneNumber = phoneNumber.trim();
        if (!validatePhoneNumber(phoneNumber)) {
            return res.status(400).json({ error: "Numéro de téléphone invalide." });
        }

        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(400).json({ error: "Utilisateur non trouvé." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Mot de passe incorrect." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: "Connexion réussie", token, user });
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        res.status(500).json({ error: "Échec de la connexion." });
    }
};
