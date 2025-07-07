import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>🌿 GreenCart Product Dashboard</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            <strong>{p.name}</strong> - Green Score: <span style={{ color: p.greenScore > 70 ? 'green' : 'red' }}>{p.greenScore}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
