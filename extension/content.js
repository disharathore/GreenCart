(async function () {
  console.log("🟢 EcoPrint Extension Loaded!");

  const API_URL = "http://localhost:5050/api/products";

  const response = await fetch(API_URL);
  const products = await response.json();

  const cards = document.querySelectorAll('[data-component-type="s-search-result"]');

  cards.forEach((card) => {
    const titleElem = card.querySelector('h2 span');
    if (!titleElem) return;

    const title = titleElem.textContent.toLowerCase();
    const match = products.find(p =>
      title.includes(p.name.toLowerCase().split(' ')[0])
    );

    if (!match) return;

    const badge = document.createElement('div');
    badge.innerText = `🌿 ${match.greenScore}/100`;
    badge.style.cssText = `
      position: absolute;
      top: 10px;
      left: 10px;
      background: ${match.greenScore > 80 ? '#16a34a' : match.greenScore > 50 ? '#facc15' : '#ef4444'};
      color: white;
      font-weight: bold;
      font-size: 12px;
      padding: 4px 6px;
      border-radius: 5px;
      z-index: 1000;
    `;

    card.style.position = 'relative';
    card.appendChild(badge);
  });
})();
