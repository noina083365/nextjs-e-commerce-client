import { CreateLoginInput, CreateRegisterInput } from '@/types/auth';
import { AuthState } from '@/types/interfaces';
import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

const currentAuth = {
  username: '',
  password: '',
};

const initialState: AuthState = {
  currentAuth,
  loading: false,
  error: null,
  result: {},
};

const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

export const createRegister = createAsyncThunk('auth/createRegister', async (data: CreateRegisterInput) => {
  const api = `${origin}/api/auth/customer-register`;
  try {
    const response = await axios.post(api, data);
    return response && response.data ? { ...response.data, success: true } : {};
  } catch (error: any) {
    const data = error.response?.data;
    if (data.message && typeof data.message !== 'string') {
      data.message = data.message.join(',');
    }
    return { ...data, success: false };
  }
});

export const createLogin = createAsyncThunk('auth/createLogin', async (data: CreateLoginInput) => {
  const api = `${origin}/api/auth/customer-login`;
  try {
    const response = await axios.post(api, data);
    return response && response.data ? { ...response.data, success: true } : {};
  } catch (error: any) {
    const data = error.response?.data;
    if (data.message && typeof data.message !== 'string') {
      data.message = data.message.join(',');
    }
    return { ...data, success: false };
  }
});

export const createLogout = createAsyncThunk('auth/createLogout', async () => {
  const api = `${origin}/api/auth/logout`;
  try {
    const response = await axios.get(api);
    return response && response.data ? { ...response.data, success: true } : {};
  } catch (error: any) {
    const data = error.response?.data;
    return { ...data, success: false };
  }
});

export const fetchToken = createAsyncThunk('auth/fetchToken', async () => {
  const api = `${origin}/api/auth/token`;
  try {
    const response = await axios.get(api);
    return response && response.data ? { ...response.data, success: true } : {};
  } catch (error: any) {
    const data = error.response?.data;
    return { ...data, success: false };
  }
});

const sliceOptions: any = {
  name: 'auth',
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
          if (action.type.includes('createRegister')) {
            state.result = action.payload;
          } else if (action.type.includes('createLogin')) {
            state.result = action.payload;
          } else if (action.type.includes('createLogout')) {
            state.result = action.payload;
          } else if (action.type.includes('fetchToken')) {
            state.currentAuth = action.payload.user;
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

const authSlice = createSlice(sliceOptions);

export default authSlice.reducer;