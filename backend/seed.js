// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const calculateGreenScore = require('./utils/carbonScoreCalculator');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const sampleProducts = [
  {
    name: 'Organic Wheat Flour',
    brand: 'NatureFresh',
    category: 'Organic',
    packagingType: 'Paper',
    originCountry: 'India',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    name: 'Plastic Water Bottle',
    brand: 'CoolSip',
    category: 'Non-organic',
    packagingType: 'Plastic',
    originCountry: 'China',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    name: 'Eco-Friendly Bamboo Toothbrush',
    brand: 'GreenBrush',
    category: 'Organic',
    packagingType: 'Paper',
    originCountry: 'India',
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    name: 'Imported Canned Tuna',
    brand: 'BlueSea',
    category: 'Non-organic',
    packagingType: 'Metal',
    originCountry: 'USA',
    imageUrl: 'https://via.placeholder.com/150',
  }
];

const insertData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany();

    const enriched = sampleProducts.map(p => ({
      ...p,
      greenScore: calculateGreenScore(p),
    }));

    await Product.insertMany(enriched);
    console.log('✅ Sample products inserted!');
    process.exit();
  } catch (error) {
    console.error('❌ Error inserting data:', error);
    process.exit(1);
  }
};

insertData();
