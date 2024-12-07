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
import { fetchProducts } from "@/redux/reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { ProductState } from "@/types/interfaces";
import Link from "next/link";
import { IdParams } from "@/types/common";

const products = [
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: 'Remy Sharp',
    occupation: 'Senior Engineer',
    testimonial:
      "I absolutely love how versatile this product is! Whether I'm tackling work projects or indulging in my favorite hobbies, it seamlessly adapts to my changing needs. Its intuitive design has truly enhanced my daily routine, making tasks more efficient and enjoyable.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
    name: 'Travis Howard',
    occupation: 'Lead Product Designer',
    testimonial:
      "One of the standout features of this product is the exceptional customer support. In my experience, the team behind this product has been quick to respond and incredibly helpful. It's reassuring to know that they stand firmly behind their product.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    name: 'Cindy Baker',
    occupation: 'CTO',
    testimonial:
      'The level of simplicity and user-friendliness in this product has significantly simplified my life. I appreciate the creators for delivering a solution that not only meets but exceeds user expectations.',
  },
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/4.jpg" />,
    name: 'Julia Stewart',
    occupation: 'Senior Engineer',
    testimonial:
      "I appreciate the attention to detail in the design of this product. The small touches make a big difference, and it's evident that the creators focused on delivering a premium experience.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/5.jpg" />,
    name: 'John Smith',
    occupation: 'Product Designer',
    testimonial:
      "I've tried other similar products, but this one stands out for its innovative features. It's clear that the makers put a lot of thought into creating a solution that truly addresses user needs.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/6.jpg" />,
    name: 'Daniel Wolf',
    occupation: 'CDO',
    testimonial:
      "The quality of this product exceeded my expectations. It's durable, well-designed, and built to last. Definitely worth the investment!",
  },
];

export default function ProductDetail({ id }: IdParams) {
  const dispatch = useDispatch();
  const product = useSelector((state: { product: ProductState }) => state.product.currentProduct);
  const theme = useTheme();

  // useEffect(() => {
  //   store.dispatch(fetchProducts());
  // }, [dispatch]);

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
      }}
    >
      <Box width={`100%`}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Product - {id}
        </Typography>
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
      </Box>
    </Container>
  );
}
