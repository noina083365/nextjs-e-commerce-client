export type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
	createdAt: Date;
	updatedAt: Date;
};

export const resetProductCreateForm = {
	name: '',
	description: '',
	price: 0,
	stock: 0,
};

export type createProductInput = {
	name: string;
	description: string;
	price: number;
	stock: number;
};
