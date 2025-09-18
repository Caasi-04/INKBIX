import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './CartPreview.css';

function CartPreview() {
  const { cartItems, totalAmount } = useContext(CartContext);

  return (
    <div className="cart-preview">
      <h2>Cart Preview</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${totalAmount}</h3>
    </div>
  );
}

export default CartPreview;