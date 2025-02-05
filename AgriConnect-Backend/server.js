require('dotenv').config();
require('./cron-job');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const axios = require('axios');

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

const BASE_URL = 'https://qa.interswitchng.com/quicktellerservice/api/v5';
const TERMINAL_ID = '3pbl0001';

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

// Dans votre fichier serveur (ex: server.js ou routes/profileRoutes.js)
app.get('/user/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('subscription', 'name price minSize maxSize includes') // Peupler le plan d'abonnement avec les champs désirés
      .select('-otp -__v'); // Exclure les champs sensibles inutiles

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération du profil :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post('/subscriptions/select', authMiddleware, async (req, res) => {
  const { subscriptionId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    user.subscription = subscriptionId;
    await user.save();

    res.json({ message: "Abonnement mis à jour", subscription: user.subscription });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'abonnement :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

const generateToken = async () => {
  const options = {
      method: 'POST',
      url: 'https://passport.k8.isw.la/passport/oauth/token?grant_type=client_credentials',
      headers: {
          'Accept': 'application/json',
          'Authorization': "Basic SUtJQTcyQzY1RDAwNUY5M0YzMEU1NzNFRkVBQzA0RkE2REQ5RTREMzQ0QjE6WVpNcVplenNsdHBTUE5iNCs0OVBHZVA3bFlrektuMWE1U2FWU3l6S09pST0=",
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  };

  try {
      const res = await axios.request(options);
      return res.data.access_token;
  } catch (error) {
      console.error('Erreur lors de la génération du token:', error.response?.data || error.message);
      throw error;
  }
};

app.get('/categories', async (req, res) => {
  try {
      const access_token = await generateToken();
      console.log(access_token);
      const response = await axios.get(`${BASE_URL}/services/categories`, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              Terminalid: TERMINAL_ID,
              Authorization: `Bearer ${access_token}`,
              'Cookie': 'BIGipServeruat_quickteller_service_pool=991173036.20480.0000'
          }
      });
      /* console.log("categories: ", response.data); */
      res.json(response.data);
  } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
  }
});

app.get('/billers/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
      const access_token = await generateToken();
      const response = await axios.get(`${BASE_URL}/services?categoryId=${categoryId}`, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Terminalid': TERMINAL_ID,
              'Authorization': `Bearer ${access_token}`
          }
      });
      console.dir(response.data, { depth: null, colors: true });
      res.json(response.data);
  } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: 'Erreur lors de la récupération des billers' });
  }
});

app.get('/biller/:billerId/items', async (req, res) => {
  const { billerId } = req.params;
  try {
      const access_token = await generateToken();
      const response = await axios.get(`${BASE_URL}/services/options?serviceid=${billerId}`, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Terminalid': TERMINAL_ID,
              'Authorization': `Bearer ${access_token}`
          }
      });
      console.dir(response.data, { depth: null, colors: true });
      res.json(response.data);
  } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: 'Erreur lors de la récupération des items de paiement' });
  }
});

app.post('/validate-customer', async (req, res) => {
  const { CustomerId, PaymentCode } = req.body;
  try {
      const access_token = await generateToken();
      const response = await axios.post(`${BASE_URL}/Transactions/validatecustomers`, {
          customers: [{ CustomerId, PaymentCode }],
          "TerminalId": "3pbl",
      }, 
      {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'TerminalId': TERMINAL_ID,
              'Authorization': `Bearer ${access_token}`
          }
      });
      res.json(response.data);
  } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: 'Erreur lors de la validation du client' });
  }
});

app.post('/bill-payment', async (req, res) => {
  console.log("Bill payment body data: ", req.body);
  const { paymentCode, customerId, customerMobile, customerEmail, amount } = req.body;
  const transRef = "TXN" + crypto.randomBytes(6).toString("hex");

  try {
      const access_token = await generateToken();
      const response = await axios.post(`${BASE_URL}/Transactions`, {
          paymentCode,
          customerId,
          customerMobile,
          customerEmail,
          amount,
          requestReference: transRef
      }, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Terminalid': TERMINAL_ID,
              'Authorization': `Bearer ${access_token}`
          }
      });
      res.json(response.data);
  } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: 'Erreur lors du paiement' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));
