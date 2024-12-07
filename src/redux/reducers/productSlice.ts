import { ProductState } from '@/types/interfaces';
import { createProductInput, Product } from '@/types/product';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const currentProduct = {
	id: 0,
	title: '',
	description: '',
	price: 0,
};

const initialState: ProductState = {
	products: [],
	currentProduct,
	loading: false,
	error: null,
};

const apiUrl = process.env.NEXT_PUBLIC_API;

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	const api = `${apiUrl}/api/products`;
	const response = await axios.get(api).catch((err) => console.log(err));
	return response && response.data ? response.data : [];
});

export const fetchProductsInStock = createAsyncThunk('products/fetchProductsInStock', async () => {
	const api = `${apiUrl}/api/products/available`;
	const response = await axios.get(api).catch((err) => console.log(err));
	return response && response.data ? response.data : currentProduct;
});

export const fetchProduct = createAsyncThunk('products/fetchProduct', async (id: string) => {
	const api = `${apiUrl}/api/products/${id}`;
	const response = await axios.get(api).catch((err) => console.log(err));
	return response && response.data ? response.data : currentProduct;
});

export const createProduct = createAsyncThunk('products/createProduct', async (data: createProductInput) => {
	const api = `${apiUrl}/api/products`;
	const response = await axios.post(api, data);
	return response.data;
});

export const editProduct = createAsyncThunk('products/editProduct', async (data: any) => {
	const api = `${apiUrl}/api/products/${data.id}`;
	const response = await axios.patch(api, { name: data.name });
	return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: string) => {
	const api = `${apiUrl}/api/products/${id}`;
	await axios.delete(api);
	return id;
});

const sliceOptions: any = {
	name: 'product',
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
					if (action.type.includes('fetchProducts')) {
						state.products = action.payload;
					} else if (action.type.includes('fetchProductsInStock')) {
						state.products = action.payload;
					} else if (action.type.includes('fetchProduct')) {
						state.currentProduct = action.payload;
					} else if (action.type.includes('createProduct')) {
						state.products.push(action.payload);
					} else if (action.type.includes('editProduct')) {
						const index = state.products.findIndex((product: Product) => product.id === action.payload.id);
						if (index !== -1) {
							state.products[index] = action.payload;
						}
					} else if (action.type.includes('deleteProduct')) {
						state.products = state.products.filter((product: Product) => {
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

const productSlice = createSlice(sliceOptions);

export default productSlice.reducer;
