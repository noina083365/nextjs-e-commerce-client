import * as React from 'react';
import AppTheme from '../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '@/components/shared-theme/AppAppBar';
import Footer from '@/components/shared-theme/Footer';
import Products from './components/Products';
import Divider from '@mui/material/Divider';

export default function ProductPage({ user }: any, props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar user={user} />
      <div>
        <Products />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
