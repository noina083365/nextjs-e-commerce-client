'use client'

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { store } from '@/redux/store';
import { updateCart } from '@/redux/reducers/cartSlice';
import _ from 'lodash';
import { CartContextType, CartItem } from '@/types/interfaces';
import { customerOpenCart, fillInCart } from '@/utils/common';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const loadCustomerOpenCart = async () => {
    const productsInCart: CartItem[] = await customerOpenCart();
    if (productsInCart && productsInCart.length > 0) {
      productsInCart.map((product: CartItem) => {
        setCart((prevCart) => [...prevCart, { ...product }]);
      });
    }
  }

  useEffect(() => {
    loadCustomerOpenCart();
  }, []);

  const updateCustomerCart = (cartItem: CartItem[]) => {
    const cartItems = cartItem.map((cItem: any) => {
      return { ..._.pick(cItem, ['id', 'quantity', 'price']) };
    });
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const custId = localStorage.getItem('customerId');
    const customerId = custId ? +custId : 0;
    const customerCart = {
      customerId,
      cartItems,
      total_price: totalPrice
    }
    store.dispatch(updateCart(customerCart));
  }

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const cartItem: CartItem[] = fillInCart(prevCart, product);
      updateCustomerCart(cartItem);
      return cartItem;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  const clearCart = () => {
    setCart([]);
    // TODO: update DB
  }

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}