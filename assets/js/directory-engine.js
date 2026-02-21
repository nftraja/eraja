document.addEventListener("DOMContentLoaded", init);

function init() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("cat");

  if (!category) {
    document.getElementById("directory-container").innerHTML =
      "<p>No category selected.</p>";
    return;
  }

  loadCategory(category);
}

function loadCategory(category) {
  fetch(`data/${category}.json`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("category-title").innerText =
        category.charAt(0).toUpperCase() + category.slice(1);

      createFilters(data);
      renderCards(data);
    })
    .catch(() => {
      document.getElementById("directory-container").innerHTML =
        "<p>Category not found.</p>";
    });
}

function createFilters(data) {
  const filterContainer = document.getElementById("filters");
  filterContainer.innerHTML = "";

  const types = ["All", ...new Set(data.map(item => item.type))];

  types.forEach(type => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.innerText = type;
    btn.onclick = () => {
      if (type === "All") {
        renderCards(data);
      } else {
        renderCards(data.filter(item => item.type === type));
      }
    };
    filterContainer.appendChild(btn);
  });
}

function renderCards(data) {
  const container = document.getElementById("directory-container");
  container.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "directory-card";
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="meta">
        <span>Age: ${item.ageGroup}</span>
        <span>${item.type}</span>
      </div>
      <a href="${item.link}" target="_blank" rel="noopener">Visit Platform →</a>
    `;
    container.appendChild(card);
  });
}