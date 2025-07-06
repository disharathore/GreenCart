// backend/routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// POST a product
const calculateGreenScore = require('../utils/carbonScoreCalculator');

router.post('/', async (req, res) => {
  const data = req.body;
  const greenScore = calculateGreenScore(data);

  const product = new Product({ ...data, greenScore });
  const saved = await product.save();
  res.status(201).json(saved);
});

module.exports = router;
