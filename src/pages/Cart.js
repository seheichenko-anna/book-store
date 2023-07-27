import React, { useEffect, useState } from "react";

import emptyCart from "../assets/images/empty-shopping-cart.png";

const CART_STORAGE_KEY = "cart";

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    setCart(storedCart ? JSON.parse(storedCart) : []);
  }, []);

  useEffect(() => {
    if (cart !== null) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  if (cart === null) {
    return <div className="cart">Loading...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <img src={emptyCart} alt="Empty shopping cart" />
      </div>
    );
  }

  const totalAmount = cart.reduce(
    (total, selectedBook) =>
      total + (selectedBook ? selectedBook.totalPrice : 0),
    0
  );

  return (
    <main className="cart-container">
      <div className="cart">
        <button className="btn" onClick={handleClearCart}>
          Purchase
        </button>
        {cart.map((selectedBook) => {
          if (!selectedBook) {
            return null;
          }
          return (
            <div key={selectedBook.id} className="cart-item">
              <h3>{selectedBook.title}</h3>
              <p>Quantity: {selectedBook.selectedCount}</p>
              <p className="cart-total-price">
                Total Price: ${selectedBook.totalPrice}
              </p>
            </div>
          );
        })}
        <div className="total-amount">
          <h4>Total Price: ${totalAmount}</h4>
        </div>
      </div>
    </main>
  );
};

export default Cart;
