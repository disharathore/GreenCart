// content.js
const products = document.querySelectorAll('[data-component-type="s-search-result"]');

products.forEach(async (product) => {
  const titleElement = product.querySelector('h2 a span');
  if (!titleElement) return;

  const name = titleElement.innerText.trim();
  if (!name) return;

  // Call your backend
  const response = await fetch('http://localhost:5050/api/products');
  const data = await response.json();

  const match = data.find(p => name.toLowerCase().includes(p.name.toLowerCase()));

  if (match) {
    const badge = document.createElement('div');
    badge.innerText = `🌱 Score: ${match.greenScore}`;
    badge.style.cssText = `
      position: absolute;
      top: 5px;
      left: 5px;
      background: ${match.greenScore > 80 ? 'green' : match.greenScore > 50 ? 'orange' : 'red'};
      color: white;
      padding: 4px 6px;
      border-radius: 5px;
      font-size: 12px;
      z-index: 1000;
    `;
    product.style.position = 'relative';
    product.appendChild(badge);
  }
});
