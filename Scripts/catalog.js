// Datos de ejemplo — reemplaza por tu fuente real si corresponde
const products = [
  { id:1, title:"Camiseta personalizada - Sunset", price:18.99, rating:4.6, img:"https://picsum.photos/seed/1/600/400", desc:"100% algodón, sublimada a color."},
  { id:2, title:"Taza mágica 330ml", price:9.5, rating:4.3, img:"https://picsum.photos/seed/2/600/400", desc:"Revelado con calor, apta para lavavajillas."},
  { id:3, title:"Sudadera con capucha - InkBIX", price:32.0, rating:4.8, img:"https://picsum.photos/seed/3/600/400", desc:"Suave y cálida, ideal para estampados grandes."},
  { id:4, title:"Almohada decorativa", price:14.75, rating:4.1, img:"https://picsum.photos/seed/4/600/400", desc:"Funda removible, impresión en ambos lados."},
  { id:5, title:"Poster A3 mate", price:7.2, rating:4.0, img:"https://picsum.photos/seed/5/600/400", desc:"Papel de alta calidad, tinta resistente al desvanecimiento."}
];

const grid = document.getElementById("product-grid");
const search = document.getElementById("search");
const sort = document.getElementById("sort");
const modal = document.getElementById("product-modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");

function formatPrice(p){ return "S/ " + p.toFixed(2); }

// Renderiza tarjetas sencillas sin añadir estilos nuevos (usa el Style.css existente)
function render(list){
  grid.innerHTML = list.map(p => `
    <article class="producto" data-id="${p.id}">
      <div class="producto-img">
        <img src="${p.img}" alt="${p.title}">
      </div>
      <div class="producto-body">
        <h3 class="producto-titulo">${p.title}</h3>
        <div class="producto-meta">⭐ ${p.rating} · <span class="producto-precio">${formatPrice(p.price)}</span></div>
        <p class="producto-desc">${p.desc}</p>
        <div class="producto-acciones">
          <button class="btn ver" data-action="view" data-id="${p.id}">Ver</button>
          <button class="btn agregar" data-action="add" data-id="${p.id}">Agregar</button>
        </div>
      </div>
    </article>
  `).join("");
}

function openModal(product){
  modalBody.innerHTML = `
    <div class="modal-detalle">
      <img src="${product.img}" alt="${product.title}">
      <div>
        <h2>${product.title}</h2>
        <p>⭐ ${product.rating}</p>
        <p class="producto-precio">${formatPrice(product.price)}</p>
        <p>${product.desc}</p>
        <div style="margin-top:12px">
          <button class="btn">Comprar ahora</button>
          <button class="btn">Agregar al carrito</button>
        </div>
      </div>
    </div>
  `;
  // Mostrar modal; si tu Style.css usa otros selectores para modal, ajusta aquí a lo que tenga tu CSS
  modal.style.display = "block";
  modal.setAttribute("aria-hidden","false");
}

function closeModal(){ modal.style.display = "none"; modal.setAttribute("aria-hidden","true"); modalBody.innerHTML = ""; }

grid.addEventListener("click", (e)=>{
  const btn = e.target.closest("button");
  if(!btn) return;
  const id = Number(btn.dataset.id);
  const action = btn.dataset.action;
  const p = products.find(x=>x.id===id);
  if(!p) return;
  if(action === "view") openModal(p);
  if(action === "add") alert(`Producto agregado: ${p.title}`);
});

if(modalClose) modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });

function applyFilters(){
  const q = (search.value || "").trim().toLowerCase();
  let list = products.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  if(sort.value === "price-asc") list.sort((a,b)=>a.price-b.price);
  if(sort.value === "price-desc") list.sort((a,b)=>b.price-a.price);
  render(list);
}

search.addEventListener("input", debounce(applyFilters, 160));
sort.addEventListener("change", applyFilters);

function debounce(fn, wait){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), wait); }; }

// Inicial
render(products);