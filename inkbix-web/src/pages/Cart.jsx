import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartPreview from '../components/CartPreview';

function Cart() {
  const { cartItems, totalAmount } = useContext(CartContext);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <CartPreview items={cartItems} />
          <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
          <button className="checkout-button">Proceed to Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;