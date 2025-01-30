require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const secretKey = process.env.JWT_SECRET;
const express = require('express');
const { sendOTP, verifyOTP } = require('controllers/authController');

router.post('/send-otp', sendOTP);

router.post('/verify-otp', verifyOTP);

module.exports = router;
