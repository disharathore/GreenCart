// backend/routes/userRoutes.js
const express = require('express');
const User = require('../models/User');

const router = express.Router();

// POST new user
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const user = new User({ name, email });
  const saved = await user.save();
  res.status(201).json(saved);
});

// GET all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
