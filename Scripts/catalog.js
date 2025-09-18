// This file handles the loading and displaying of products from the products.json file into the catalog page. 
// It includes functions to fetch data and render products dynamically.

// Carga products.json y renderiza. Expone renderProducts y PRODUCTS al scope global.
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('products-grid');

  window.PRODUCTS = [];

  window.renderProducts = function(products) {
    grid.innerHTML = '';
    if (!products || products.length === 0) {
      grid.innerHTML = '<p>No se encontraron productos.</p>';
      return;
    }
    const fragment = document.createDocumentFragment();
    products.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="product-image" />
        <h3 class="product-name">${p.name}</h3>
        <p class="product-price">$${p.price.toFixed(2)}</p>
        <p class="product-desc">${p.description}</p>
        <p class="product-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join(' ')}</p>
      `;
      fragment.appendChild(card);
    });
    grid.appendChild(fragment);
  };

  // Ruta relativa desde Pages/catalogo.html a data/products.json
  fetch('../data/products.json')
    .then(r => r.json())
    .then(data => {
      window.PRODUCTS = data;
      window.renderProducts(window.PRODUCTS);
    })
    .catch(err => {
      console.error('No se pudo cargar products.json', err);
      grid.innerHTML = '<p>Error cargando productos.</p>';
    });
});