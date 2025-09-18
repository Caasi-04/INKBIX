const searchInput = document.getElementById('search-input');
const productsGrid = document.getElementById('products-grid');

searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase();
    const products = Array.from(productsGrid.children);

    products.forEach(product => {
        const productName = product.querySelector('.product-name').textContent.toLowerCase();
        const productTags = product.dataset.tags.toLowerCase();

        if (productName.includes(query) || productTags.includes(query)) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
});

// Busca por nombre o por etiquetas (coincidencia parcial, case-insensitive)
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('search-bar');
  if (!input) return;

  let timeout = null;
  function doSearch() {
    const q = input.value.trim().toLowerCase();
    const all = window.PRODUCTS || [];
    if (!q) {
      window.renderProducts(all);
      return;
    }
    const results = all.filter(p => {
      if (p.name && p.name.toLowerCase().includes(q)) return true;
      if (Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(q))) return true;
      return false;
    });
    window.renderProducts(results);
  }

  input.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(doSearch, 150); // debounce pequeño
  });

  // búsqueda al presionar Enter
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      clearTimeout(timeout);
      doSearch();
    }
  });
});