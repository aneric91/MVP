const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    name: { type: String },
    region: { type: String },
    farmSize: { type: String },
    address: { type: String },
    otp: { type: String }
});

module.exports = mongoose.model('User', userSchema);
