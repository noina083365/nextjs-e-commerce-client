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
import AddressForm from './components/AddressForm';
import Info from './components/Info';
import InfoMobile from './components/InfoMobile';
import PaymentForm from './components/PaymentForm';
import Review from './components/Review';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { ProductState } from '@/types/interfaces';
import { useRouter } from 'next/router';
import { store } from '@/redux/store';
import { fetchProduct } from '@/redux/reducers/productSlice';
import _ from 'lodash';
import { createOrder } from '@/redux/reducers/orderSlice';
import AppAppBar from '../shared-theme/AppAppBar';
import MainCheckout from './components/Main';
import { Divider } from '@mui/material';
import Footer from '../shared-theme/Footer';

export default function Checkout({ userId, productId }: any, props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar userId={userId} />
      <div>
        <MainCheckout />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
