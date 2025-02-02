const mongoose = require('mongoose');

const paymentHistorySchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  retRef: { type: String, required: true },
  payRef: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true, default: undefined },
  name: { type: String },
  region: { type: String },
  farmSize: { type: Number, required: true },
  address: { type: String },
  otp: { type: String },
  password: { type: String, required: true }, // 🔒 Nouveau champ pour le mot de passe
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', default: null },
  paymentHistory: [paymentHistorySchema],
  balance: { type: Number, default: 0 } // 🔥 Champ pour stocker le solde
});

module.exports = mongoose.model('User', userSchema);
