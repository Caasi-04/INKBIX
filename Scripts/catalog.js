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

function render(list){
  grid.innerHTML = list.map(p => `
    <article class="card" role="article" data-id="${p.id}">
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <div class="meta">⭐ ${p.rating} · <span class="price">${formatPrice(p.price)}</span></div>
      <p class="desc" style="color:var(--muted);font-size:13px">${p.desc}</p>
      <div class="actions">
        <button class="btn ghost" data-action="view" data-id="${p.id}">Ver</button>
        <button class="btn primary" data-action="add" data-id="${p.id}">Agregar</button>
      </div>
    </article>
  `).join("");
}

function openModal(product){
  modalBody.innerHTML = `
    <img src="${product.img}" alt="${product.title}">
    <div>
      <h2>${product.title}</h2>
      <p style="color:var(--muted)">⭐ ${product.rating}</p>
      <p style="font-weight:600">${formatPrice(product.price)}</p>
      <p style="margin-top:12px">${product.desc}</p>
      <div style="margin-top:14px">
        <button class="btn primary">Comprar ahora</button>
        <button class="btn ghost" id="modal-add">Agregar al carrito</button>
      </div>
    </div>
  `;
  modal.setAttribute("aria-hidden","false");
}

function closeModal(){ modal.setAttribute("aria-hidden","true"); modalBody.innerHTML=""; }

grid.addEventListener("click", (e)=>{
  const btn = e.target.closest("button");
  if(!btn) return;
  const id = Number(btn.dataset.id);
  const action = btn.dataset.action;
  const p = products.find(x=>x.id===id);
  if(action === "view") openModal(p);
  if(action === "add") alert(`Producto agregado: ${p.title}`);
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });

function applyFilters(){
  let q = search.value.trim().toLowerCase();
  let list = products.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  if(sort.value === "price-asc") list.sort((a,b)=>a.price-b.price);
  if(sort.value === "price-desc") list.sort((a,b)=>b.price-a.price);
  render(list);
}

search.addEventListener("input", debounce(applyFilters, 180));
sort.addEventListener("change", applyFilters);

function debounce(fn, wait){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a), wait); }; }

// inicial
render(products);