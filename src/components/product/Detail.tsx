import * as React from 'react';
import AppTheme from '../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '@/components/shared-theme/AppAppBar';
import Footer from '@/components/shared-theme/Footer';
import ProductDetail from './components/ProductDetail';
import Divider from '@mui/material/Divider';

export default function DetailPage({ id, user }: any, props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar user={user} />
      <div>
        <ProductDetail id={id} user={user} />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
