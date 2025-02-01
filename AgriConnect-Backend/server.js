require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.error(err));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/checkout', paymentRoutes);
app.use('/subscriptions', subscriptionRoutes);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/delivery-request', (req, res) => {
  console.log('Interswitch transaction data : ', req.body);
  // Julia, j'ai besoin que tu récupères les infos de la transaction pour les mettre dans
  // l'historique des transactions de l'utilisateur
  res.redirect('http://localhost:3000/delivery-request');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));
