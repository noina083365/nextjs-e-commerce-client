export type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	createdAt: Date;
	updatedAt: Date;
};

export const resetProductCreateForm = {
	title: '',
	description: '',
	price: 0,
};

export type createProductInput = {
	title: string;
	description: string;
	price: number;
};
