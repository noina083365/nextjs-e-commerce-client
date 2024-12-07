import * as React from 'react';
import AppTheme from '../shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from './components/AppAppBar';
import ProductDetail from './components/ProductDetail';
import Divider from '@mui/material/Divider';
import Footer from './components/Footer';
import { IdParams } from '@/types/common';

export default function DetailPage({ id }: IdParams, props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <div>
        <ProductDetail id={id} />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
