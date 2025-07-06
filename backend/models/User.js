// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  greenPoints: { type: Number, default: 0 },
  purchaseHistory: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    date: Date,
    greenScore: Number
  }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
