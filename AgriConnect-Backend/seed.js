require('dotenv').config();
const mongoose = require('mongoose');
const Subscription = require('./models/Subscription');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/agriculture';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connecté à MongoDB"))
    .catch(err => console.error("❌ Erreur de connexion MongoDB :", err));

const subscriptions = [
    { name: "Basique", price: 10, minSize: 0, maxSize: 3 },
    { name: "Standard", price: 20, minSize: 4, maxSize: 6 },
    { name: "Premium", price: 30, minSize: 7, maxSize: 10 }
];

const seedDatabase = async () => {
    try {
        await Subscription.deleteMany({});
        await Subscription.insertMany(subscriptions);
        console.log("✅ Abonnements ajoutés !");
    } catch (error) {
        console.error("❌ Erreur lors de l'ajout des abonnements :", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
