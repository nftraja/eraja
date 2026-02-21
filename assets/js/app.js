/* ===============================
   ERaja FINAL App Logic
   =============================== */

const DATA_PATH = "data/platforms.json";

/* ===============================
   Drawer Control
   =============================== */

function toggleDrawer() {
  document.getElementById("drawer").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");
}

function closeDrawer() {
  document.getElementById("drawer").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");
}

/* ===============================
   Mode Handling
   =============================== */

function setModeAndGo(mode) {
  localStorage.setItem("eraja_mode", mode);
  window.location.href = "category.html";
}

function getMode() {
  return localStorage.getItem("eraja_mode");
}

/* ===============================
   Page Detection
   =============================== */

document.addEventListener("DOMContentLoaded", () => {

  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "category.html") {
    loadCategories();
  }

});

/* ===============================
   Load Categories
   =============================== */

async function loadCategories() {

  const mode = getMode();

  if (!mode) {
    window.location.href = "index.html";
    return;
  }

  try {

    const response = await fetch(DATA_PATH);
    const platforms = await response.json();

    const container = document.getElementById("categoryContainer");

    if (!container) return;

    const categories = extractCategories(platforms);

    container.innerHTML = "";

    categories.forEach(cat => {

      const count = platforms.filter(p => p.category === cat).length;

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${formatCategory(cat)}</h3>
        <p>${count} curated platforms available.</p>
        <button class="btn" onclick="openCategory('${cat}')">Explore</button>
      `;

      container.appendChild(card);

    });

  } catch (error) {
    console.error("Category Load Error:", error);
  }

}

/* ===============================
   Extract Unique Categories
   =============================== */

function extractCategories(platforms) {

  const unique = [...new Set(platforms.map(p => p.category))];

  return unique.sort();

}

/* ===============================
   Format Category Name
   =============================== */

function formatCategory(slug) {

  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());

}

/* ===============================
   Open Category Page
   =============================== */

function openCategory(category) {
  window.location.href = `category.html?cat=${category}`;
}

/* ===============================
   Load Platforms by Category
   =============================== */

async function loadPlatformsByCategory() {

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("cat");

  if (!category) return;

  try {

    const response = await fetch(DATA_PATH);
    const platforms = await response.json();

    const filtered = platforms.filter(p => p.category === category);

    const container = document.getElementById("platformContainer");

    if (!container) return;

    container.innerHTML = "";

    filtered.forEach(p => {

      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <a href="${p.url}" target="_blank" class="btn">Visit</a>
      `;

      container.appendChild(card);

    });

  } catch (error) {
    console.error("Platform Load Error:", error);
  }

}

/* ===============================
   Auto Detect Platform Section
   =============================== */

document.addEventListener("DOMContentLoaded", () => {

  if (document.getElementById("platformContainer")) {
    loadPlatformsByCategory();
  }

});