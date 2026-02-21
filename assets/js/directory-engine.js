// ===============================
// ERaja Directory Engine (Final)
// ===============================

// Get category from URL
const params = new URLSearchParams(window.location.search);
const categoryId = params.get("cat");

// DOM Elements
const titleEl = document.getElementById("category-title");
const descEl = document.getElementById("category-desc");
const gridEl = document.getElementById("platform-grid");
const filtersEl = document.getElementById("filters");

// Safety check
if (!categoryId) {
  titleEl.textContent = "Category Not Found";
} else {
  loadCategoryMeta();
  loadPlatforms();
}

// Load category title & description
function loadCategoryMeta() {
  fetch("data/categories.json")
    .then(res => res.json())
    .then(categories => {
      const category = categories.find(c => c.id === categoryId);
      if (!category) {
        titleEl.textContent = "Invalid Category";
        return;
      }
      titleEl.textContent = category.name;
      descEl.textContent = category.description;
    });
}

// Load platform JSON dynamically
function loadPlatforms() {
  fetch(`data/${categoryId}.json`)
    .then(res => res.json())
    .then(platforms => {
      renderFilters(platforms);
      renderPlatforms(platforms);
    })
    .catch(() => {
      gridEl.innerHTML = "<p>No data available.</p>";
    });
}

// Render platform cards
function renderPlatforms(platforms) {
  gridEl.innerHTML = "";

  platforms.forEach(platform => {
    const card = document.createElement("div");
    card.className = "platform-card";

    card.innerHTML = `
      <h4>${platform.name}</h4>
      <p>${platform.description}</p>
      <p><strong>Age:</strong> ${platform.age}</p>
      <p><strong>Type:</strong> ${platform.type}</p>
      <a href="${platform.url}" target="_blank">Visit Platform →</a>
    `;

    gridEl.appendChild(card);
  });
}

// Render filter buttons (by type only)
function renderFilters(platforms) {
  const types = [...new Set(platforms.map(p => p.type))];

  filtersEl.innerHTML = "";

  // All button
  const allBtn = createFilterButton("All", platforms);
  allBtn.classList.add("active");
  filtersEl.appendChild(allBtn);

  // Type buttons
  types.forEach(type => {
    const filtered = platforms.filter(p => p.type === type);
    const btn = createFilterButton(type, filtered);
    filtersEl.appendChild(btn);
  });
}

function createFilterButton(label, filteredData) {
  const btn = document.createElement("button");
  btn.className = "filter-btn";
  btn.textContent = label;

  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn")
      .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderPlatforms(filteredData);
  });

  return btn;
}