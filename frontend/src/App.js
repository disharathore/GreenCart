// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './components/ProductCard';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5050/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('❌ Error fetching products:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        🌱 EcoPrint – Sustainable Product Explorer
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default App;
