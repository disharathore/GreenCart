const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const analyzeRoute = require('./routes/analyzeRoute');

const app = express();

// Log all requests
app.use((req, res, next) => {
  console.log(`📡 Incoming: ${req.method} ${req.url}`);
  next();
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use('/api/analyze', analyzeRoute);

// ✅ Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.get('/test', (req, res) => {
  res.send('✅ Backend test route working');
});

// ✅ MongoDB + Server Start
const PORT = process.env.PORT || 5050;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`✅ MongoDB connected`);  
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err.message);
  });
