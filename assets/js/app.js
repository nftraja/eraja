/* =====================================================
   ERaja – Directory Engine (FINAL)
   Single JSON Driven System
   ===================================================== */

const ERajaApp = (() => {

    /* -------------------------------
       STATE
    ---------------------------------*/
    let platforms = [];
    let activeCategory = "all";

    /* -------------------------------
       INIT
    ---------------------------------*/
    const init = async () => {
        try {
            await loadPlatforms();
            setupFilters();
            setupDrawer();
            setupBottomNav();
            renderPlatforms();
        } catch (err) {
            console.error("ERaja Init Error:", err);
        }
    };

    /* -------------------------------
       LOAD JSON
    ---------------------------------*/
    const loadPlatforms = async () => {
        const response = await fetch("data/platforms.json");
        if (!response.ok) throw new Error("JSON load failed");
        platforms = await response.json();
    };

    /* -------------------------------
       RENDER
    ---------------------------------*/
    const renderPlatforms = () => {

        const grid = document.querySelector(".platform-grid");
        if (!grid) return;

        grid.innerHTML = "";

        const filtered = activeCategory === "all"
            ? platforms
            : platforms.filter(p => p.category === activeCategory);

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    No platforms found for this category.
                </div>
            `;
            return;
        }

        filtered.forEach(platform => {
            const card = createCard(platform);
            grid.appendChild(card);
        });
    };

    /* -------------------------------
       CARD CREATOR
    ---------------------------------*/
    const createCard = (platform) => {

        const card = document.createElement("div");
        card.className = "platform-card";

        card.innerHTML = `
            <div class="platform-title">${platform.name}</div>
            <div class="platform-desc">${platform.description}</div>
            <div class="platform-meta">
                <span>Age: ${platform.age}</span>
                <span>${platform.type}</span>
            </div>
            <a href="${platform.url}" target="_blank" 
               rel="noopener noreferrer" 
               class="platform-btn">
               Visit Platform
            </a>
        `;

        return card;
    };

    /* -------------------------------
       FILTER SYSTEM
    ---------------------------------*/
    const setupFilters = () => {

        const filters = document.querySelectorAll(".platform-filter");

        filters.forEach(button => {
            button.addEventListener("click", () => {

                filters.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                activeCategory = button.dataset.category;
                renderPlatforms();
            });
        });
    };

    /* -------------------------------
       DRAWER SYSTEM
    ---------------------------------*/
    const setupDrawer = () => {

        const toggle = document.querySelector(".drawer-toggle");
        const drawer = document.querySelector(".app-drawer");

        if (!toggle || !drawer) return;

        toggle.addEventListener("click", () => {
            drawer.classList.toggle("open");
        });
    };

    /* -------------------------------
       BOTTOM NAV ACTIVE
    ---------------------------------*/
    const setupBottomNav = () => {

        const navItems = document.querySelectorAll(".bottom-nav a");

        navItems.forEach(item => {
            item.addEventListener("click", () => {
                navItems.forEach(i => i.classList.remove("active"));
                item.classList.add("active");
            });
        });
    };

    /* -------------------------------
       PUBLIC API
    ---------------------------------*/
    return {
        init
    };

})();

/* -------------------------------
   DOM READY
---------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    ERajaApp.init();
});