import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from '../shared-theme/AppTheme';
import _ from 'lodash';
import AppAppBar from '../shared-theme/AppAppBar';
import MainCheckout from './components/Main';
import { Divider } from '@mui/material';
import Footer from '../shared-theme/Footer';

export default function Checkout({ userId, source, productId }: any, props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar userId={userId} />
      <div>
        <MainCheckout userId={userId} source={source} productId={productId} />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
