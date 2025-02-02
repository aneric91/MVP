const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    minSize: { type: Number, required: true },  // Added
    maxSize: { type: Number, required: true },  // Added
    includes: { type: String, required: true }
});


module.exports = mongoose.model('Subscription', subscriptionSchema);
