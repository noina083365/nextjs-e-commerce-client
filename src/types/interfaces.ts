import { Category } from './category';
import { Product } from './product';

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
