'use client';

import { useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/system';
import { store } from "@/redux/store";
import { fetchProductsInStock } from "@/redux/reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { ProductState } from "@/types/interfaces";
import Link from "next/link";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state: { product: ProductState }) => state.product.products);
  const theme = useTheme();

  useEffect(() => {
    store.dispatch(fetchProductsInStock());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box sx={{ display: 'flex' }} width={'100%'}>
        <Box sx={{ width: { md: '25%', xl: '20%' } }} className="category-sidebar">
          <Typography
            component="h2"
            variant="h4"
            gutterBottom
            sx={{ color: 'text.primary' }}
          >
            Categories
          </Typography>
        </Box>
        <Box sx={{ width: { sm: '100%', md: '75%', xl: '80%' } }} className="product-list-shop">
          <Typography
            component="h2"
            variant="h4"
            gutterBottom
            sx={{ color: 'text.primary' }}
          >
            Products
          </Typography>
          <Grid container spacing={2}>
            {
              products && products.length > 0 &&
              products.map((product, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
                  <Card
                    variant="outlined"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flexGrow: 1,
                    }}
                  >
                    <Link href={`/product/${product.id}`}>
                      <CardContent>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <CardHeader
                            title={product.name}
                          />
                        </Box>
                        <Typography
                          gutterBottom
                          sx={{ color: 'text.secondary' }}
                        >
                          {product.description}
                        </Typography>
                        <Typography
                          gutterBottom
                          sx={{ color: 'text.primary' }}
                        >
                          {product.price}
                        </Typography>
                      </CardContent>
                    </Link>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
