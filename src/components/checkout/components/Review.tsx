import React, { useState } from 'react';

import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CartItem } from '@/types/interfaces';

// const payments = [
//   { name: 'Card type:', detail: 'Visa' },
//   { name: 'Card holder:', detail: 'Mr. John Smith' },
//   { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
//   { name: 'Expiry date:', detail: '04/2024' },
// ];

export default function Review({ products, totalPrice, shipPrice, formData }: any) {
  return (
    <Stack spacing={2}>
      {
        products && products.length && (
          <List disablePadding>
            {
              products.map((product: CartItem) => (
                <ListItem key={`${product.id}-${product.name}`} sx={{ py: 1, px: 0, display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary="Products" secondary={`${product.quantity} selected`} />
                  <Typography variant="body2">฿{product.quantity * product.price}</Typography>
                </ListItem>
              ))
            }
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Shipping" secondary="Plus taxes" />
              <Typography variant="body2">฿{shipPrice}</Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                ฿{parseFloat(`${totalPrice}`) + shipPrice}
              </Typography>
            </ListItem>
          </List>
        )
      }
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>{formData.firstName} {formData.lastName}</Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            {formData.address1} {formData.address2}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details: <strong>Cash on delivery</strong>
          </Typography>
          {/* <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: '100%', mb: 1 }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {payment.name}
                  </Typography>
                  <Typography variant="body2">{payment.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid> */}
        </div>
      </Stack>
    </Stack>
  );
}
