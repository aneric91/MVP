const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    minSize: { type: Number, required: true },
    maxSize: { type: Number, required: true }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
