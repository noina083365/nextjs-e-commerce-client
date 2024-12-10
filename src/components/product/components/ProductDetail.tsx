'use client';

import { useEffect } from "react";
import Card from '@mui/material/Card';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/system';
import { store } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ProductState } from "@/types/interfaces";
import Link from "next/link";
import { IdParams } from "@/types/common";
import { fetchProduct } from "@/redux/reducers/productSlice";
import { Button, Divider, List, ListItem } from "@mui/material";
import NextImage from 'next/image';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useCart } from "@/contexts/CartContext";
import { updateCart } from "@/redux/reducers/cartSlice";
import _ from 'lodash';

export default function ProductDetail({ id, user }: any) {
  const dispatch = useDispatch();
  const product = useSelector((state: { product: ProductState }) => state.product.currentProduct);
  const { addToCart, cart, totalPrice } = useCart();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    store.dispatch(fetchProduct(id));
  }, [dispatch]);

  const checkAddToCart = async () => {
    if (user) {
      addToCart({ ...product, quantity: 1 });
    } else {
      router.push('/sign-in');
    }
  }

  // useEffect(() => {
  //   console.log(product);
  // }, [product]);

  useEffect(() => {
    const cartItems = cart.map(cItem => {
      return { ..._.pick(cItem, ['id', 'quantity', 'price']) };
    });
    const customerCart = {
      customerId: user.id,
      cartItems,
      total_price: totalPrice
    }
    console.log(customerCart);
    // const result: any = store.dispatch(updateCart(cartItem));
  }, [cart]);

  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Link href={`/`}><ArrowBackIosIcon />Back to Products</Link>
      <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }} width={'100%'}>
        <Box sx={{ width: { xs: '50%', sm: '60%', md: '65%', xl: '70%' } }}>
          <div className="preview-image">
            <NextImage
              src="/images/product-placeholder.jpg"
              fill
              style={{
                objectFit: 'cover',
              }}
              alt=""
            />
          </div>
        </Box>
        <Box sx={{ width: { xs: '50%', sm: '40', md: '35%', xl: '30%' } }}>
          <Card>
            <Typography>
              <Link href={`/cart`} className="flex"><ShoppingCartRoundedIcon />Cart</Link>
            </Typography>
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
          </Card>
          <Divider />
          <Typography
            component="h2"
            variant="h4"
            gutterBottom
            sx={{ color: 'text.primary' }}
          >
            {product.name}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: 'text.secondary' }}
          >
            {product.description}
          </Typography>
          <Typography
            gutterBottom
            sx={{ color: 'text.success' }}
          >
            {product.price}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }} gap={1}>
            <Button variant="contained" color="primary" sx={{ flex: 1 }} startIcon={<AttachMoneyIcon />}>Buy Now</Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ flex: 1 }}
              startIcon={<AddShoppingCartIcon />}
              onClick={checkAddToCart}
            >
              Add to cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
