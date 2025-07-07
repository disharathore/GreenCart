(async function () {
  console.log("🟢 EcoPrint Extension Loaded!");

  const API_URL = "http://localhost:5050/api/products";

  // Wait until Amazon content is fully loaded
  const waitForElement = (selector, timeout = 10000) =>
    new Promise((resolve, reject) => {
      const interval = 100;
      let elapsed = 0;
      const check = () => {
        const el = document.querySelector(selector);
        if (el) return resolve();
        elapsed += interval;
        if (elapsed >= timeout) return reject("Timeout waiting for Amazon content.");
        setTimeout(check, interval);
      };
      check();
    });

  try {
    await waitForElement('[data-component-type="s-search-result"]');
  } catch (err) {
    console.error("❌ Amazon content not ready:", err);
    return;
  }

  let response;
  try {
    response = await fetch(API_URL);
  } catch (err) {
    console.error("❌ Failed to fetch product data:", err);
    return;
  }

  let products = [];
  try {
    products = await response.json();
  } catch (err) {
    console.error("❌ Failed to parse JSON:", err);
    return;
  }

  const cards = document.querySelectorAll('[data-component-type="s-search-result"]');
  cards.forEach((card) => {
    const titleElem = card.querySelector('h2 span');
    if (!titleElem) return;

    const title = titleElem.textContent.toLowerCase();
    const match = products.find((p) => title.includes(p.name.toLowerCase().split(' ')[0]));

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

  console.log(`✅ Injected EcoPrint badges on ${cards.length} cards`);
})();
