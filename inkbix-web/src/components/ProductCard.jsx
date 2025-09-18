import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h2 className="product-title">{product.title}</h2>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
};

export default ProductCard;