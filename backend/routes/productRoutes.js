// backend/routes/productRoutes.js
const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  console.log("📥 GET /api/products called");

  try {
    const products = await Product.find({});
    console.log("✅ Products found:", products.length);
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error in /api/products:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST a product
const calculateGreenScore = require('../utils/carbonScoreCalculator');

router.post('/', async (req, res) => {
  console.log("📥 POST /api/products called");
  console.log("📦 Body received:", req.body); // 🔍 Add this to verify what Postman is sending

  try {
    const data = req.body;
    const greenScore = calculateGreenScore(data);

    const product = new Product({ ...data, greenScore });
    const saved = await product.save();

    console.log("✅ Saved product:", saved);
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error saving product:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



module.exports = router;
