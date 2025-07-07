// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany([
      {
        name: "Eco-Friendly Soap",
        brand: "GreenClean",
        category: "Organic",
        packagingType: "Paper",
        originCountry: "India",
        imageUrl: "https://via.placeholder.com/150",
        greenScore: 95,
        carbonFootprint: 2.1,
        suggestions: ["Use recycled paper", "Eco-inks"]
      }
    ]);
    console.log("✅ Seeded!");
    mongoose.disconnect();
  })
  .catch((err) => console.error("❌", err.message));
