// ERaja Directory Engine
// Loads category JSON dynamically and renders cards with filters

document.addEventListener("DOMContentLoaded", () => {
  initDirectory();
});

async function initDirectory() {
  const container = document.getElementById("directory-container");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!container) return;

  const category = container.dataset.category;
  if (!category) return;

  try {
    const response = await fetch(`data/${category}.json`);
    const data = await response.json();

    renderDirectory(data, container);

    // Attach filter events
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.dataset.type;
        const filtered = type === "All"
          ? data
          : data.filter(item => item.type === type);

        renderDirectory(filtered, container);
      });
    });

  } catch (error) {
    container.innerHTML = "<p>Unable to load data.</p>";
    console.error(error);
  }
}

function renderDirectory(data, container) {
  container.innerHTML = "";

  if (!data.length) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "directory-card";

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <div class="meta">
        <span>Age: ${item.ageGroup}</span>
        <span>Type: ${item.type}</span>
      </div>
      <a href="${item.link}" target="_blank" rel="noopener noreferrer">
        Visit Platform →
      </a>
    `;

    container.appendChild(card);
  });
}