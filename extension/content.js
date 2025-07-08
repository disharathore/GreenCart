(async function () {
  console.log("🟢 EcoPrint Extension Loaded!");

  const API_URL = "http://localhost:5050/api/analyze";
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

      // 🏷️ Badge Element
      const badge = document.createElement('div');
      badge.innerText = `🌿 ${result.greenScore}/100`;
      badge.title = result.reason || "Eco Score";
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

      // 🧠 Suggestion on click
      badge.addEventListener('click', () => {
        alert(`🧠 Tip:\n${result.suggestion || 'Try switching to more sustainable alternatives.'}`);
      });

      // 🧩 Inject badge
      card.style.position = 'relative';
      card.appendChild(badge);
    } catch (err) {
      console.error("❌ Failed to fetch score:", err);
    }
  }
})();
