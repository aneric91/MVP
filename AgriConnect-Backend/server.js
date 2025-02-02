require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.error(err));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/checkout', paymentRoutes);
app.use('/subscriptions', subscriptionRoutes);

const updateUserBalance = async (user) => {
  const newBalance = user.paymentHistory.reduce((total, transaction) => {
      return total + transaction.amount;
  }, 0);

  user.balance = newBalance;
  await user.save();
};

// Route de réception des infos de transaction après paiement
app.post('/delivery-request', async (req, res) => {
  console.log('Interswitch transaction data : ', req.body);
  
  const { phoneNumber, amount, retRef, payRef } = req.body;
  
  try {
    const user = await User.findOne({ phoneNumber });
    if (user) {
      user.paymentHistory.push({ amount, retRef, payRef });
      await updateUserBalance(user);
      console.log("Solde mis à jour :", user.balance);
    } else {
      console.log("Utilisateur non trouvé pour le numéro :", phoneNumber);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'historique des paiements:", error);
  }

  res.redirect('http://localhost:3000/delivery-request');
});

app.get('/user/balance', async (req, res) => {
  const { phoneNumber } = req.query;

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json({ balance: user.balance });
  } catch (error) {
    console.error("Erreur lors de la récupération du solde :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get('/user/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-otp -__v');

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération du profil :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));
