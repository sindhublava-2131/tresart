import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setCart([]);
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get('/api/cart');
        setCart(response.data);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) return { success: false, error: 'Please login to add to cart' };
    try {
      const response = await axios.post('/api/cart/add', { productId, quantity });
      setCart(response.data);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to add to cart' };
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await axios.put('/api/cart/update', { productId, quantity });
      setCart(response.data);
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`/api/cart/remove/${productId}`);
      setCart(response.data);
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.post('/api/cart/clear');
      setCart([]);
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  const cartTotal = cart.reduce((total, item) => {
    if (!item.productId) return total;
    return total + (item.productId.price || 450) * item.quantity;
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading, 
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
