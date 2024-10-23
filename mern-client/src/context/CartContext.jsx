import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (note) => {
    // Add to the cart in the frontend state
    setCart((prevCart) => [...prevCart, note]);

    // Log the updated cart in the console
    console.log('Cart after adding:', [...cart, note]);

    // Send the cart item to the backend (replace with your actual endpoint)
    fetch('http://localhost:5000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Added to backend cart:', data); // Log backend response
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
      });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
