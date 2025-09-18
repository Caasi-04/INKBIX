import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cartItems, totalAmount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Implement checkout logic here
    alert('Checkout successful!');
    navigate('/');
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <h2>Your Items:</h2>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <h3>Total Amount: ${totalAmount}</h3>
          <button onClick={handleCheckout}>Complete Purchase</button>
        </>
      )}
    </div>
  );
}

export default Checkout;