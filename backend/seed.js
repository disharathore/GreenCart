const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const fs = require('fs');
const path = require('path');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("🌱 Connected to MongoDB");

    const rawData = fs.readFileSync(path.join(__dirname, 'eco_products_seed.json'));
    const products = JSON.parse(rawData);

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log(`✅ Seeded ${products.length} products!`);
    mongoose.disconnect();
  })
  .catch((err) => console.error("❌ Seeding error:", err.message));
