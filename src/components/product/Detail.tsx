import * as React from 'react';
import AppTheme from '../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from '@/components/shared-theme/AppAppBar';
import Footer from '@/components/shared-theme/Footer';
import ProductDetail from './components/ProductDetail';
import Divider from '@mui/material/Divider';
import { IdParams } from '@/types/common';

export default function DetailPage({ id, token }: any, props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar token={token} />
      <div>
        <ProductDetail id={id} token={token} />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
