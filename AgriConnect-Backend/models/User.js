const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    name: { type: String },
    region: { type: String },
    farmSize: { type: Number, required: true },
    address: { type: String },
    otp: { type: String },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', default: null } // Lien vers l'abonnement
});

module.exports = mongoose.model('User', userSchema);
