import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '@/redux/reducers/categorySlice';
import productReducer from '@/redux/reducers/productSlice';
import userReducer from '@/redux/reducers/userSlice';

export const store = configureStore({
	reducer: {
		category: categoryReducer,
		product: productReducer,
		user: userReducer,
	},
});
