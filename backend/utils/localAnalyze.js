const fs = require('fs');
const path = require('path');

// Load keyword and suggestion files
const keywords = JSON.parse(fs.readFileSync(path.join(__dirname, 'keywords.json')));
const suggestions = JSON.parse(fs.readFileSync(path.join(__dirname, 'suggestions.json')));

const analyzeLocally = (title) => {
  let score = 0;
  const titleLower = title.toLowerCase();

  // Match keywords in product title
  keywords.forEach(({ term, score: termScore }) => {
    if (titleLower.includes(term.toLowerCase())) {
      score += termScore;
    }
  });

  // Cap the score at 100
  if (score > 100) score = 100;

  // Find a suggestion based on keywords in title
  let suggestion = "Consider choosing reusable, locally sourced, low-carbon alternatives.";
  for (const key in suggestions) {
    if (titleLower.includes(key)) {
      suggestion = suggestions[key];
      break;
    }
  }

  const reason = `Matched ${score} eco-keyword points from product name.`

  return {
    greenScore: score,
    reason,
    suggestion
  };
};

module.exports = analyzeLocally;

