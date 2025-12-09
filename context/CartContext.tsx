import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../constants';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSelection: (productId: string) => void;
  selectAll: (selected: boolean) => void;
  removeSelected: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with the mock data used in the original Cart page (indices 6, 7, 8)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const initialProducts = [PRODUCTS[6], PRODUCTS[7], PRODUCTS[8]];
    return initialProducts.map(p => ({
      ...p,
      quantity: 1,
      selected: true
    }));
  });

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev;
      return [...prev, { ...product, quantity: 1, selected: true }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const toggleCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, { ...product, quantity: 1, selected: true }];
      }
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const toggleSelection = (productId: string) => {
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, selected: !item.selected } : item
    ));
  };

  const selectAll = (selected: boolean) => {
    setCartItems(prev => prev.map(item => ({ ...item, selected })));
  };

  const removeSelected = () => {
    setCartItems(prev => prev.filter(item => !item.selected));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, toggleCart, updateQuantity, toggleSelection, selectAll, removeSelected }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};