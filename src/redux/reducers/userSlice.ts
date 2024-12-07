// import { UserState } from '@/user';
import { UserState } from '@/types/interfaces';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const currentUser = {
	id: 0,
	username: '',
	email: '',
	firstName: '',
	lastName: '',
};

const initialState: UserState = {
	users: [],
	currentUser,
	loading: false,
	error: null,
};

const apiUrl = process.env.NEXT_PUBLIC_API;

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const api = `${apiUrl}/api/users`;
	const response = await axios.get(api).catch((err) => console.log(err));
	return response && response.data ? response.data : [];
});

export const fetchUser = createAsyncThunk('users/fetchUser', async (id: string) => {
	const api = `${apiUrl}/api/users/${id}`;
	const response = await axios.get(api);
	return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (data: any) => {
	const api = `${apiUrl}/api/users`;
	const response = await axios.post(api, data);
	return response.data;
});

export const editUser = createAsyncThunk('users/editUser', async (data: any) => {
	const { title, details } = data;
	const api = `${apiUrl}/api/users/${data.id}`;
	const response = await axios.patch(api, { title, details });
	return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
	const api = `${apiUrl}/api/users/${id}`;
	await axios.delete(api);
	return id;
});

const sliceOptions: any = {
	name: 'user',
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
					if (action.type.includes('fetchUsers')) {
						const { data = [] } = action.payload;
						state.users = data;
					} else if (action.type.includes('fetchUser')) {
						state.currentUser = action.payload;
					} else if (action.type.includes('createUser')) {
						state.users.push(action.payload);
					} else if (action.type.includes('editUser')) {
						const index = state.users.findIndex((user: any) => user.id === action.payload.id);
						if (index !== -1) {
							state.users[index] = action.payload;
						}
					} else if (action.type.includes('deleteUser')) {
						state.users = state.users.filter((user: any) => user.id !== action.payload);
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

const userSlice = createSlice(sliceOptions);

export default userSlice.reducer;
