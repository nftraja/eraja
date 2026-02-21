/* =========================================
   ERaja FINAL ENGINE
   3 Modes | 30 Categories | 300 Platforms
   Data Driven | Flat JSON
========================================= */

const DATA_PATH = "data/platforms.json";

/* =========================================
   Drawer Control
========================================= */

function toggleDrawer() {
  document.getElementById("drawer").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");
}

function closeDrawer() {
  document.getElementById("drawer").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
}

/* =========================================
   Mode Handling
========================================= */

function setModeAndGo(mode) {
  localStorage.setItem("eraja_mode", mode);
  window.location.href = "category.html";
}

function getMode() {
  return localStorage.getItem("eraja_mode");
}

/* =========================================
   App Boot
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const page = window.location.pathname.split("/").pop();

  if (page === "category.html") {
    initializeCategoryPage();
  }

});

/* =========================================
   Initialize Category Page
========================================= */

async function initializeCategoryPage() {

  const mode = getMode();

  if (!mode) {
    window.location.href = "index.html";
    return;
  }

  try {

    const response = await fetch(DATA_PATH);
    const allPlatforms = await response.json();

    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get("cat");

    if (!selectedCategory) {
      renderCategories(allPlatforms, mode);
    } else {
      renderPlatforms(allPlatforms, mode, selectedCategory);
    }

  } catch (error) {
    console.error("Initialization Error:", error);
  }

}

/* =========================================
   Render Categories (Mode Based)
========================================= */

function renderCategories(platforms, mode) {

  const container = document.getElementById("categoryContainer");
  const platformContainer = document.getElementById("platformContainer");

  if (!container) return;

  container.innerHTML = "";
  if (platformContainer) platformContainer.innerHTML = "";

  const modePlatforms = platforms.filter(p => p.mode === mode);

  const categoryMap = {};

  modePlatforms.forEach(p => {
    if (!categoryMap[p.category]) {
      categoryMap[p.category] = {
        title: p.categoryTitle,
        count: 0
      };
    }
    categoryMap[p.category].count++;
  });

  Object.keys(categoryMap).forEach(categorySlug => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${categoryMap[categorySlug].title}</h3>
      <p>${categoryMap[categorySlug].count} curated platforms available.</p>
      <button class="btn" onclick="openCategory('${categorySlug}')">Explore</button>
    `;

    container.appendChild(card);

  });

}

/* =========================================
   Render Platforms (Mode + Category)
========================================= */

function renderPlatforms(platforms, mode, category) {

  const container = document.getElementById("platformContainer");
  const categoryContainer = document.getElementById("categoryContainer");

  if (!container) return;

  if (categoryContainer) categoryContainer.innerHTML = "";
  container.innerHTML = "";

  const filtered = platforms.filter(p =>
    p.mode === mode && p.category === category
  );

  filtered.forEach(p => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${p.name}</h3>
      <div class="meta-row">
        <div class="badge">${p.age}</div>
        <div class="badge">${p.type}</div>
      </div>
      <p>${p.description}</p>
      <a href="${p.url}" target="_blank" class="btn">Visit Platform</a>
    `;

    container.appendChild(card);

  });

}

/* =========================================
   Category Navigation
========================================= */

function openCategory(category) {
  window.location.href = `category.html?cat=${category}`;
}