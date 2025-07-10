(async function () {
  console.log("🟢 EcoPrint Extension Loaded!");

  // 🧩 Inject modal HTML
  const modalHTML = `
    <div id="eco-modal" style="
      display: none;
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border: 2px solid #16a34a;
      border-radius: 10px;
      z-index: 9999;
      padding: 20px;
      box-shadow: 0 10px 20px rgba(0,0,0,0.3);
      max-width: 400px;
      font-family: Arial;
    ">
      <h2 id="eco-modal-title" style="margin-top: 0;"></h2>
      <p id="eco-modal-msg"></p>
      <ul id="eco-suggestions"></ul>
      <button onclick="document.getElementById('eco-modal').style.display='none'" style="
        margin-top: 10px;
        padding: 6px 10px;
        background: #16a34a;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      ">Close</button>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // 🧠 Modal logic
  function showEcoModal(title, message, suggestions) {
    const modal = document.getElementById('eco-modal');
    document.getElementById('eco-modal-title').innerText = title;
    document.getElementById('eco-modal-msg').innerText = message;

    const suggestionsList = document.getElementById('eco-suggestions');
    suggestionsList.innerHTML = "";
    suggestions.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${item.link}" target="_blank">${item.name}</a>`;
      suggestionsList.appendChild(li);
    });

    modal.style.display = 'block';
  }

  const API_URL = "https://greencart-0gco.onrender.com/api/analyze";
  const cards = document.querySelectorAll('[data-component-type="s-search-result"]');

  for (const card of cards) {
    const titleElem = card.querySelector('h2 span');
    if (!titleElem) continue;

    const title = titleElem.textContent.trim();
    if (!title) continue;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });

      const result = await response.json();
      if (!result.greenScore) continue;

      // 🏷️ Badge
      const badge = document.createElement('div');
      badge.innerText = `🌿 ${result.greenScore}/100`;
      badge.title = result.greenScore > 80
        ? "Excellent environmental score!"
        : result.greenScore > 50
          ? "Moderate eco score. Better options available."
          : "Low eco score. Consider greener alternatives.";
      badge.style.cssText = `
        position: absolute;
        top: 10px;
        left: 10px;
        background: ${result.greenScore > 80 ? '#16a34a' : result.greenScore > 50 ? '#facc15' : '#ef4444'};
        color: white;
        font-weight: bold;
        font-size: 12px;
        padding: 4px 6px;
        border-radius: 5px;
        z-index: 1000;
        cursor: pointer;
      `;

      // 🧠 On Click → Fancy modal popup
      badge.addEventListener('click', () => {
        const titleMsg = result.greenScore > 80 ? "✅ Great Choice!" :
                         result.greenScore > 50 ? "⚠️ Moderate Eco Impact" :
                         "❌ Not Eco Friendly";

        const mainMsg = result.greenScore > 80
          ? "This product is highly eco-friendly!"
          : result.greenScore > 50
            ? "This product is average on sustainability. Consider better options."
            : "This product has a high carbon footprint. Here's why and what you can try instead.";

        const suggestions = result.greenScore > 80 ? [] :
                            result.greenScore > 50 ? [
                              { name: "Eco Soap Bar", link: "https://www.amazon.in/dp/B09ABC123" },
                              { name: "Sustainable Toothpaste", link: "https://www.amazon.in/dp/B07XYZ987" }
                            ] : [
                              { name: "Bamboo Toothbrush", link: "https://www.amazon.in/dp/B08ECO111" },
                              { name: "Refillable Cleaner", link: "https://www.amazon.in/dp/B09ECO222" },
                              { name: "Natural Detergent", link: "https://www.amazon.in/dp/B08ECO333" }
                            ];

        showEcoModal(titleMsg, mainMsg, suggestions);
      });

      // 🧩 Inject into product card
      card.style.position = 'relative';
      card.appendChild(badge);
    } catch (err) {
      console.error("❌ Failed to fetch score:", err);
    }
  }
})();
