/* =========================================
   ERaja – Complete App Controller
   Drawer + Category Engine + Filters
========================================= */

/* ========= DRAWER CONTROL ========= */
function toggleDrawer(){
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");

  if(drawer && overlay){
    drawer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

function closeDrawer(){
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");

  if(drawer && overlay){
    drawer.classList.remove("active");
    overlay.classList.remove("active");
  }
}

/* ========= URL PARAM HELPER ========= */
function getQueryParam(param){
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/* ========= CATEGORY LOADER ========= */
async function loadCategory(){
  const type = getQueryParam("type");
  if(!type) return;

  const container = document.getElementById("category-container");
  const title = document.getElementById("category-title");
  const filterSelect = document.getElementById("filter-select");

  if(!container) return;

  title.innerText = type.charAt(0).toUpperCase() + type.slice(1);

  try{
    const response = await fetch(`data/${type}.json`);
    const data = await response.json();

    renderCards(data);

    if(filterSelect){
      filterSelect.addEventListener("change", function(){
        const value = this.value;
        if(value === "All"){
          renderCards(data);
        }else{
          const filtered = data.filter(item => item.type === value);
          renderCards(filtered);
        }
      });
    }

  }catch(error){
    container.innerHTML = "<p>Data not available.</p>";
  }
}

/* ========= CARD RENDER ========= */
function renderCards(data){
  const container = document.getElementById("category-container");
  if(!container) return;

  container.innerHTML = "";

  if(data.length === 0){
    container.innerHTML = "<p>No platforms found.</p>";
    return;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p style="font-size:12px;color:#94a3b8;margin-bottom:10px;">
        Age: ${item.age} | Type: ${item.type}
      </p>
      <a href="${item.url}" target="_blank" class="btn">Visit Platform</a>
    `;

    container.appendChild(card);
  });
}

/* ========= AUTO INIT ========= */
document.addEventListener("DOMContentLoaded", function(){
  loadCategory();
});