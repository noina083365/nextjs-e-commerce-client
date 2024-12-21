import React, { useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { CartItem } from '@/types/interfaces';

interface InfoProps {
  products: CartItem[];
  totalPrice: string;
}

export default function Info({ products, totalPrice }: InfoProps) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={`${product.id}-${product.name}`} sx={{
            py: 1, px: 0,
            display: { xs: 'none', sm: 'flex' },
            justifyContent: 'space-between',
            gap: 2,
          }}>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              <ListItemText
                sx={{ mr: 2 }}
                primary={product.name}
              />
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              {product.quantity || 1} x {product.price}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'medium', textAlign: 'right' }}>
              {(product.quantity || 1) * product.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
