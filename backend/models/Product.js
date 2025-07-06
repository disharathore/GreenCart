// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  category: String,
  packagingType: String,
  originCountry: String,
  imageUrl: String,
  greenScore: Number,
  carbonFootprint: Number,
  suggestions: [String],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
