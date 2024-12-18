import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/reducers/authSlice';
import categoryReducer from '@/redux/reducers/categorySlice';
import productReducer from '@/redux/reducers/productSlice';
import userReducer from '@/redux/reducers/userSlice';
import orderReducer from '@/redux/reducers/orderSlice';
import cartReducer from '@/redux/reducers/cartSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		category: categoryReducer,
		product: productReducer,
		user: userReducer,
		cart: cartReducer,
		order: orderReducer,
	},
});
