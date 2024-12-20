import * as React from 'react';
import AppTheme from '../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '@/components/shared-theme/AppAppBar';
import Footer from '@/components/shared-theme/Footer';
import ProductDetail from './components/ProductDetail';
import Divider from '@mui/material/Divider';

export default function DetailPage({ id, userId }: any, props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar userId={userId} />
      <div>
        <ProductDetail id={id} userId={userId} />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
