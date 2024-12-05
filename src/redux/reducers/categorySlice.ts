import { Category, CreateCategoryInput, EditCategoryInput } from '@/types/category';
import { CategoryState } from '@/types/interfaces';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const currentCategory = {
	id: 0,
	name: '',
};

const initialState: CategoryState = {
	categories: [],
	currentCategory,
	loading: false,
	error: null,
};

// const apiUrl = process.env.NEXT_PUBLIC_API;

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
	const api = `/api/categories`;
	const response = await axios.get(api).catch((err) => console.log(err));
	return response && response.data ? response.data : [];
});

export const fetchCategory = createAsyncThunk('categories/fetchCategory', async (id: string) => {
	const api = `/api/categories/${id}`;
	const response = await axios.get(api);
	return response.data;
});

export const createCategory = createAsyncThunk(
	'categories/createCategory',
	async (data: CreateCategoryInput) => {
		const api = `/api/categories`;
		const response = await axios.post(api, data);
		return response.data;
	},
);

export const editCategory = createAsyncThunk('categories/editCategory', async (data: EditCategoryInput) => {
	const api = `/api/categories/${data.id}`;
	const response = await axios.patch(api, { name: data.name });
	return response.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id: string) => {
	const api = `/api/categories/${id}`;
	await axios.delete(api);
	return id;
});

const sliceOptions: any = {
	name: 'category',
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
					if (action.type.includes('fetchCategories')) {
						state.categories = action.payload;
					} else if (action.type.includes('fetchCategory')) {
						state.currentCategory = action.payload;
					} else if (action.type.includes('createCategory')) {
						state.categories.push(action.payload);
					} else if (action.type.includes('editCategory')) {
						const index = state.categories.findIndex(
							(category: Category) => category.id === action.payload.id,
						);
						if (index !== -1) {
							state.categories[index] = action.payload;
						}
					} else if (action.type.includes('deleteCategory')) {
						state.categories = state.categories.filter((category: Category) => {
							// console.log(`${category.id}` !== action.payload, `${category.id}`, action.payload);
							return `${category.id}` !== action.payload;
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

const categorySlice = createSlice(sliceOptions);

export default categorySlice.reducer;
