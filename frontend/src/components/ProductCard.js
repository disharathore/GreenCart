// frontend/src/components/ProductCard.jsx
import React from 'react';

const getBadgeColor = (score) => {
  if (score > 80) return 'bg-green-500';
  if (score >= 50) return 'bg-yellow-400';
  return 'bg-red-500';
};

const ProductCard = ({ product }) => {
  return (
    <div className="p-4 rounded-2xl shadow-lg bg-white hover:scale-105 transition-transform duration-300 w-full max-w-sm">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-xl"
      />
      <h2 className="text-lg font-bold mt-2 text-gray-800">{product.name}</h2>
      <p className="text-sm text-gray-500">Brand: {product.brand}</p>
      <p className="text-sm text-gray-500">Category: {product.category}</p>
      <p className="text-sm text-gray-500 mb-2">Origin: {product.originCountry}</p>

      <div className="flex items-center gap-2">
        <span
          className={`px-3 py-1 text-white text-xs font-bold rounded-full ${getBadgeColor(
            product.greenScore
          )}`}
        >
          ♻️ {product.greenScore} Green Score
        </span>
        <span className="text-xs text-gray-400">{product.carbonFootprint} kg CO₂</span>
      </div>

      {product.suggestions?.length > 0 && (
        <div className="mt-3 text-sm text-gray-600">
          <span className="font-medium text-gray-700">Suggestions:</span>
          <ul className="list-disc ml-5 mt-1">
            {product.suggestions.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
