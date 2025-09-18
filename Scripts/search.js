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