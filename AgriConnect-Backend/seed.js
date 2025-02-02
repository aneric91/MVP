require('dotenv').config();
const mongoose = require('mongoose');
const Subscription = require('./models/Subscription');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/agriconnect';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

    const plans = [
        { name: "Basic", price: 10, minSize: 0, maxSize: 4, includes: "Fertilizer + Seeds" },
        { name: "Standard", price: 20, minSize: 5, maxSize: 10, includes: "Fertilizer + Seeds + Pesticides" },
        { name: "Premium", price: 30, minSize: 11, maxSize: 20, includes: "All inputs + Dedicated support" }
    ];    

const seedDatabase = async () => {
    try {
        await Subscription.deleteMany({});
        await Subscription.insertMany(plans);
        console.log("✅ Plans successfully added!");
    } catch (error) {
        console.error("❌ Error adding plans:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
