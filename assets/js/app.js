// ===============================
// ERaja App Init Script (Final)
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("category-grid");

  // अगर index page नहीं है तो exit
  if (!grid) return;

  fetch("data/categories.json")
    .then(res => res.json())
    .then(categories => {
      renderCategories(categories);
    })
    .catch(() => {
      grid.innerHTML = "<p>Unable to load categories.</p>";
    });
});

function renderCategories(categories) {
  const grid = document.getElementById("category-grid");
  grid.innerHTML = "";

  categories.forEach(cat => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${cat.name}</h3>
      <p>${cat.description}</p>
      <a class="button" href="category.html?cat=${cat.id}">
        Explore →
      </a>
    `;

    grid.appendChild(card);
  });
}