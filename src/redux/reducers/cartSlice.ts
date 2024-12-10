import { createCartInput } from '@/types/cart';
import { CartState } from '@/types/interfaces';
import { createProductInput, Product } from '@/types/product';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const currentCart = {
  id: 0,
  title: '',
  description: '',
  price: 0,
};

const initialState: CartState = {
  carts: [],
  currentCart,
  loading: false,
  error: null,
};

const apiUrl = process.env.NEXT_PUBLIC_API;

export const updateCart = createAsyncThunk('carts/updateCart', async () => {
  const api = `${apiUrl}/api/carts`;
  const response = await axios.get(api).catch((err) => console.log(err));
  return response && response.data ? response.data : null;
});

export const deleteCart = createAsyncThunk('carts/deleteCart', async (id: string) => {
  const api = `${apiUrl}/api/carts/clear`;
  await axios.delete(api);
  return id;
});

const sliceOptions: any = {
  name: 'cart',
  initialState,
  extraReducers: (builder: any) => {
    builder
      .addMatcher(
        (action: any) => action.type.endsWith('/pending'),
        (state: any) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action: any) => action.type.endsWith('/fulfilled'),
        (state: any, action: any) => {
          state.loading = false;
          if (action.type.includes('updateCart')) {
            state.carts = action.payload;
          } else if (action.type.includes('deleteCart')) {
            state.carts = state.carts.filter((product: Product) => {
              // console.log(`${product.id}` !== action.payload, `${product.id}`, action.payload);
              return `${product.id}` !== action.payload;
            });
          }
        },
      )
      .addMatcher(
        (action: any) => action.type.endsWith('/rejected'),
        (state: any, action: any) => {
          state.loading = false;
          state.error = action.error.message;
        },
      );
  },
};

const cartSlice = createSlice(sliceOptions);

export default cartSlice.reducer;
