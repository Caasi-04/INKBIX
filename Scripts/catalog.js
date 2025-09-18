// This file handles the loading and displaying of products from the products.json file into the catalog page. 
// It includes functions to fetch data and render products dynamically.

document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('products-grid');

    fetch('../data/products.json')
        .then(response => response.json())
        .then(data => {
            renderProducts(data);
        })
        .catch(error => console.error('Error fetching products:', error));

    function renderProducts(products) {
        productsGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Tipo: ${product.type}</p>
                <p>Etiquetas: ${product.tags.join(', ')}</p>
            `;
            productsGrid.appendChild(productCard);
        });
    }
});