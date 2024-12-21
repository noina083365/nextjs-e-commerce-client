import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem, ProductState } from '@/types/interfaces';
import { useRouter } from 'next/router';
import { store } from '@/redux/store';
import { fetchProduct } from '@/redux/reducers/productSlice';
import _ from 'lodash';
import AppTheme from '@/components/shared-theme/AppTheme';
import ColorModeIconDropdown from '@/components/shared-theme/ColorModeIconDropdown';
import InfoMobile from './InfoMobile';
import AddressForm from './AddressForm';
import Review from './Review';
import Info from './Info';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';

const steps = ['Shipping address', 'Review your order']; // 'Payment details' => change to Cash on delivery

export default function MainCheckout({ userId, source, productId }: any, props: { disableCustomTheme?: boolean }) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(null);
  const [products, setProducts] = useState<CartItem[]>([]);
  const { cart, removeFromCart, clearCart, totalPrice: tPrice } = useCart();
  const [totalPrice, setTotalPrice] = useState('0.00');
  const [shipPrice, setShipPrice] = useState(25);
  const dispatch = useDispatch();
  const product = useSelector((state: { product: ProductState }) => state.product.currentProduct);
  const router = useRouter();
  // const theme = useTheme();

  useEffect(() => {
    if (source === 'buy-now') {
      store.dispatch(fetchProduct(productId));
    }
  }, [dispatch]);

  useEffect(() => {
    setProducts([product]);
    setTotalPrice(`${product.price}`);
  }, [product]);

  useEffect(() => {
    if (source === 'cart') {
      setProducts(cart);
      setTotalPrice(`${tPrice}`);
    }
  }, [cart]);

  const handleNext = () => {
    const currentState = activeStep + 1;
    setActiveStep(currentState);
    processStep(currentState);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const processStep = (currentStep: number) => {
    if (currentStep === 1) {
      const formElement = document.getElementById('address_form') as HTMLFormElement;
      if (formElement) {
        formElement.requestSubmit();
      }
    } else if (currentStep === 2) {
      checkOut();
    }
  }

  const handleFormData = (data: any) => {
    setFormData(data);
  };

  const checkOut = async () => {
    console.log('Checkout...');
    console.log(userId, productId);
    let order = {};
    if (userId && products.length > 0) {
      if (products && products.length > 0) {
        const orderItems = [];
        for (const product of products) {
          orderItems.push({ ..._.pick(product, ['id', 'quantity', 'price']) });
        }
        order = {
          customerId: userId,
          items: orderItems,
          total_price: parseFloat(totalPrice),
          shipment: {
            address: formData,
            ship_price: shipPrice
          }
        }
      }
      console.log(order);
      try {
        // const result: any = await store.dispatch(createOrder(order));
        // console.log(result);

        // if (result && result.type && result.type.endsWith('/fulfilled')) {
        //   alert('Order create successfully.');
        //   router.push('/checkout');
        // } else {
        //   const message = result.message ? result.message : result.payload.message;
        //   alert(message || 'An error occurred.');
        // }
      } catch (error: any) {
        console.log(error);
        // const newErrors: any = {};
        // if (error.inner) {
        //   error.inner.forEach((err: any) => {
        //     newErrors[err.path] = err.message;
        //   });
        //   setErrors(newErrors);
        // }
      }
    } else {
      // router.push('/sign-in');
    }
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
        <ColorModeIconDropdown />
      </Box>

      <Grid
        container
        sx={{
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      ><Grid
        size={{ sm: 12, md: 7, lg: 8 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          width: '100%',
          backgroundColor: { xs: 'transparent', sm: 'background.default' },
          alignItems: 'start',
          pt: { xs: 0, sm: 16 },
          px: { xs: 2, sm: 10 },
          gap: { xs: 4, md: 8 },
        }}
      >
          <Box
            sx={{
              display: 'flex',
              justifyContent: { sm: 'space-between', md: 'flex-end' },
              alignItems: 'center',
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexGrow: 1,
              }}
            >
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{ width: '100%', height: 40 }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">
                  {product.price}
                </Typography>
              </div>
              <InfoMobile products={[product]} totalPrice={totalPrice} />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
              maxHeight: '720px',
              gap: { xs: 5, md: 'none' },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: 'flex', md: 'none' } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ':first-child': { pl: 0 },
                    ':last-child': { pr: 0 },
                    '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">Thank you for your order!</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Your order number is
                  <strong>&nbsp;#140396</strong>. We have emailed your order
                  confirmation and will update you once its shipped.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
                >
                  Go to my orders
                </Button>
              </Stack>
            ) : (
              <React.Fragment>
                {
                  (activeStep === 0) ? (
                    <AddressForm onFormSubmit={handleFormData} />
                  ) :
                    (activeStep === 1) && (
                      // <PaymentForm />
                      <Review products={products} totalPrice={totalPrice} shipPrice={shipPrice} formData={formData} />
                    )
                }
                <Box
                  sx={[
                    {
                      display: 'flex',
                      flexDirection: { xs: 'column-reverse', sm: 'row' },
                      alignItems: 'end',
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: '60px',
                    },
                    activeStep !== 0
                      ? { justifyContent: 'space-between' }
                      : { justifyContent: 'flex-end' },
                  ]}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{ display: { xs: 'flex', sm: 'none' } }}
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRight: { sm: 'none', md: '1px solid' },
            borderColor: { sm: 'none', md: 'divider' },
            alignItems: 'start',
            pt: 16,
            px: 10,
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: 500,
            }}
          >
            <Info products={products} totalPrice={totalPrice} />
          </Box>
        </Grid>
      </Grid>
    </AppTheme>
  );
}