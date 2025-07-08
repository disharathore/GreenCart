const axios = require('axios');

const analyzeTitle = async (title) => {
  const prompt = `Analyze this product for the following attributes:
- packagingType (Plastic, Paper, etc.)
- originCountry
- category (Organic/Non-organic)

Only respond with JSON. Product: "${title}"`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4
    },
    {
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const raw = response.data.choices[0].message.content;
  return JSON.parse(raw); // must match prompt format
};

module.exports = analyzeTitle;
