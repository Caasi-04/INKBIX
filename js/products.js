document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('products-grid');
  const select = document.getElementById('category-filter');

  const renderProducts = (items) => {
    if (!grid) return;
    grid.innerHTML = items.map(p => `
      <article class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="category">${p.category}</p>
        <p class="price">₡${p.price}</p>
        <a class="btn" href="/src/pages/personaliza.html?product=${encodeURIComponent(p.id)}">Personalizar</a>
      </article>
    `).join('');
    // animar tarjetas recién añadidas
    document.querySelectorAll('.product-card').forEach(el => el.classList.add('in-view'));
  };

  const loadAndInit = async () => {
    try {
      const res = await fetch('/data/products.json');
      if (!res.ok) throw new Error('No se pudo cargar products.json');
      const products = await res.json();
      renderProducts(products);

      if (select) {
        select.addEventListener('change', () => {
          const v = select.value;
          const filtered = v === 'all' ? products : products.filter(p => p.category === v);
          renderProducts(filtered);
        });
      }
    } catch (err) {
      console.error(err);
      if (grid) grid.innerHTML = '<p>No se pudieron cargar los productos.</p>';
    }
  };

  loadAndInit();
});