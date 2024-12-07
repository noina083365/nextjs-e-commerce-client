import * as React from 'react';
import AppTheme from '../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from './components/AppAppBar';
import Products from './components/Products';
import Divider from '@mui/material/Divider';
import Footer from './components/Footer';

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <div>
        <Products />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
