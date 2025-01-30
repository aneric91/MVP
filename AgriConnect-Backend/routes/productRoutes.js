const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.post('/add', async (req, res) => {
    const { name, category, price } = req.body;
    const product = new Product({ name, category, price });
    await product.save();
    res.json({ message: "Produit ajouté" });
});

module.exports = router;
