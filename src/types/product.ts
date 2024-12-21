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
	id: '0',
	name: '',
	description: '',
	price: 0,
	stock: 0,
	createdAt: new Date(),
	updatedAt: new Date(),
};

export type createProductInput = {
	name: string;
	description: string;
	price: number;
	stock: number;
};
