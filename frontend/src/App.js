import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://greencart-0gco.onrender.com/api/products')
      .then((res) => {
       console.log("🟢 Received in frontend:", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('❌ Error fetching products:', err);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>🌿 GreenCart Product Dashboard</h2>
      {products.length === 0 ? (
        <p>Loading or no products found.</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p._id}>
              <strong>{p.name}</strong> – Green Score: {p.greenScore}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
