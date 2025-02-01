/*require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendOTP, verifyOTPLogin, verifyOTPRegister } = require('../controllers/authController'); // Ajouté la fonction verifyOTPLogin
const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp-login', verifyOTPLogin); // Route pour la vérification OTP pour la connexion
router.post('/verify-otp-register', verifyOTPRegister); // Route pour la vérification OTP pour l'inscription

module.exports = router;*/
require('dotenv').config();
const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');

router.post('/register', register);

// Route pour la connexion d'un utilisateur existant
router.post('/login', login);

module.exports = router;
