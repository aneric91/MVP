const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

// Exemple dans register
exports.register = async (req, res) => {
    let { phoneNumber, name, region, farmSize, address, email } = req.body;
  
    try {
      // Vérifier que les champs obligatoires sont présents
      if (!phoneNumber || !farmSize) {
        return res.status(400).json({ error: "Le numéro de téléphone et la superficie sont obligatoires." });
      }
      
      // Normalisation des entrées
      phoneNumber = phoneNumber.trim();
      name = name ? name.trim() : '';
      region = region ? region.trim() : '';
      address = address ? address.trim() : '';
      
      // Si email n'est pas fourni, il ne sera pas ajouté dans userData
      const userData = {
        phoneNumber,
        name,
        region,
        farmSize: Number(farmSize),
        address,
        ...(email ? { email: email.trim() } : {}) 
      };
  
      // Vérifier si l'utilisateur existe déjà
      let user = await User.findOne({ phoneNumber });
      if (user) {
        return res.status(400).json({ error: "Utilisateur déjà enregistré" });
      }
      
      // Attribution automatique d'un abonnement (votre logique existante)
      const subscription = await Subscription.findOne({
        minSize: { $lte: userData.farmSize },
        maxSize: { $gte: userData.farmSize }
      });
      if (!subscription) {
        return res.status(400).json({ error: "Aucun abonnement disponible pour cette superficie." });
      }
      userData.subscription = subscription._id;
      
      // Création du nouvel utilisateur
      user = new User(userData);
      await user.save();
    
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
