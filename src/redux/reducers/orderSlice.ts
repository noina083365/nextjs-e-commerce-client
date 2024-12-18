import { OrderState } from '@/types/interfaces';
import { Product } from '@/types/product';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const currentOrder = {
  id: 0,
  title: '',
  description: '',
  price: 0,
};

const initialState: OrderState = {
  orders: [],
  currentOrder,
  loading: false,
  error: null,
};

const apiUrl = process.env.NEXT_PUBLIC_API;

export const createOrder = createAsyncThunk('orders/createOrder', async (orderData: any) => {
  const api = `${apiUrl}/api/orders`;
  const response = await axios.get(api).catch((err) => console.log(err));
  return response && response.data ? response.data : null;
});

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (id: string) => {
  const api = `${apiUrl}/api/orders/${id}`;
  await axios.delete(api);
  return id;
});

const sliceOptions: any = {
  name: 'order',
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
          if (action.type.includes('create')) {
            state.orders = action.payload;
          } else if (action.type.includes('createOrder')) {
            state.orders = action.payload;
          } else if (action.type.includes('deleteOrder')) {
            state.orders = state.orders.filter((product: Product) => {
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

const orderSlice = createSlice(sliceOptions);

export default orderSlice.reducer;
