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
      // Ahora el producto es un enlace completo (clickable) que envía a personalizar con id
      const link = document.createElement('a');
      link.className = 'product-link';
      link.href = `../Pages/personalizar.html?id=${encodeURIComponent(p.id || '')}`;
      link.setAttribute('aria-label', p.name || 'Ver producto');

      const card = document.createElement('article');
      card.className = 'product-card';

      const img = document.createElement('img');
      img.className = 'product-image';
      img.alt = p.name || 'Producto';

      // Ruta fallback / placeholder (mantener tu lógica de intentos si quieres)
      const placeholder = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">' +
        '<rect fill="#f5f5f5" width="100%" height="100%"/>' +
        '<text x="50%" y="50%" font-size="18" text-anchor="middle" fill="#bbb" dy=".3em">Sin imagen</text>' +
        '</svg>'
      );
      img.src = p.image || placeholder;
      img.onerror = () => { img.onerror = null; img.src = placeholder; };

      const body = document.createElement('div');
      body.className = 'product-body';

      const name = document.createElement('h3');
      name.className = 'product-name';
      name.textContent = p.name || '';

      const price = document.createElement('p');
      price.className = 'product-price';
      price.textContent = (typeof p.price === 'number') ? `$${p.price.toFixed(2)}` : '';

      const desc = document.createElement('p');
      desc.className = 'product-desc';
      desc.textContent = p.description || '';

      const tags = document.createElement('p');
      tags.className = 'product-tags';
      if (Array.isArray(p.tags)) {
        tags.innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join(' ');
      }

      // botón visible dentro de la card para que el usuario identifique dónde pulsar (opcional)
      const cta = document.createElement('span');
      cta.className = 'product-cta';
      cta.textContent = 'Ver / Personalizar';

      body.appendChild(name);
      body.appendChild(price);
      body.appendChild(desc);
      body.appendChild(tags);
      body.appendChild(cta);

      card.appendChild(img);
      card.appendChild(body);

      link.appendChild(card);
      fragment.appendChild(link);
    });
    grid.appendChild(fragment);
  };

  function tryFetch(path) {
    return fetch(path).then(r => {
      if (!r.ok) throw new Error('No OK');
      return r.json();
    });
  }

  // intenta cargar desde ruta relativa (Pages -> ../data) y si falla intenta desde raíz (/data)
  tryFetch('../data/products.json')
    .catch(() => tryFetch('/data/products.json'))
    .then(data => {
      window.PRODUCTS = data;
      window.renderProducts(window.PRODUCTS);
    })
    .catch(err => {
      console.error('No se pudo cargar products.json', err);
      grid.innerHTML = '<p>Error cargando productos.</p>';
    });
});