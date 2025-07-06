// backend/utils/carbonScoreCalculator.js

const calculateGreenScore = (product) => {
  let score = 100;

  // Example scoring logic
  if (product.packagingType === 'Plastic') score -= 30;
  if (product.originCountry !== 'India') score -= 20;
  if (product.category === 'Non-organic') score -= 15;

  // Normalize between 0–100
  if (score < 0) score = 0;
  return score;
};

module.exports = calculateGreenScore;
