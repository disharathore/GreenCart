const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const analyzeRoutes = require('./routes/analyzeRoute'); // ✅ THIS FIX

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analyze', analyzeRoutes); // ✅ MOUNT THIS

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
