import * as React from 'react';
import { useCart } from '@/contexts/CartContext';
import AppTheme from '@/components/shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '@/components/shared-theme/AppAppBar';
import Footer from '@/components/shared-theme/Footer';
import Divider from '@mui/material/Divider';
import { Button, List, ListItem } from '@mui/material';
import router from 'next/router';

export default function CartList({ userId }: any, props: { disableCustomTheme?: boolean }) {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();
  const onCheckout = () => {
    router.push({
      pathname: '/checkout',
      query: { source: 'cart' },
    });
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar userId={userId} />
      <div className="cart-area">
        <h2>Cart</h2>
        {
          cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <List>
                {
                  cart.map((item) => (
                    <ListItem key={`cart-item-${item.id}`}>
                      {item.name} - {item.quantity} x ${item.price}
                    </ListItem >
                  ))
                }
              </List>
              <p>Total price: ${totalPrice}</p>
              <Button onClick={onCheckout}>Checkout</Button>
              <Button onClick={clearCart}>Clear Cart</Button>
            </>
          )
        }
      </div>
      <Divider />
      <Footer />
    </AppTheme>
  )
}