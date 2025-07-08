const express = require('express');
const router = express.Router();
const axios = require('axios');
const analyzeLocally = require('../utils/localAnalyze');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Missing product title' });
  }

  // 🧠 Step 1: Try Local Analysis First
  const localResult = analyzeLocally(title);
  if (localResult.greenScore >= 20) {
    return res.json(localResult); // ✅ Good local result
  }

  // 🧠 Step 2: If score too low, fallback to OpenAI
  try {
    const openaiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an eco product inspector. Score the product from 0 to 100 based on eco-friendliness. Use packaging, origin, category, etc. Return a JSON with greenScore, reason, and suggestion.",
          },
          {
            role: "user",
            content: `Analyze the following product: "${title}"`,
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const text = openaiRes.data.choices[0].message.content;

    let result = {};
    try {
      result = JSON.parse(text); // OpenAI returns JSON string
    } catch (e) {
      return res.status(500).json({ error: "OpenAI response not valid JSON", raw: text });
    }

    return res.json(result);
  } catch (error) {
    console.error("❌ OpenAI API error:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to analyze product",
      detail: error.response?.data || error.message
    });
  }
});

module.exports = router;
