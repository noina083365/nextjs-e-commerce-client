import { ReactNode } from 'react';
import { Category } from './category';
import { Product } from './product';

export interface AuthState {
	currentAuth: any;
	loading: boolean;
	error: any;
	result: any;
}
export interface ProductState {
	products: Product[];
	currentProduct: any;
	loading: boolean;
	error: any;
}

export interface CategoryState {
	categories: Category[];
	currentCategory: any;
	loading: boolean;
	error: any;
}

export interface UserState {
	users: any[];
	currentUser: any;
	loading: boolean;
	error: any;
}

export interface CartState {
	carts: any[];
	currentCart: any;
	loading: boolean;
	error: any;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number; // Product type does not has quantity
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

export interface LayoutItemProviderProps {
	children: ReactNode;
}

export interface AdminLayoutProps {
	children: ReactNode;
}

export interface SidebarContextType {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}
