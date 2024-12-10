export type Cart = {
	id: string;
	name: string;
	description: string;
	price: number;
	createdAt: Date;
	updatedAt: Date;
};

export const resetCartCreateForm = {
	title: '',
	description: '',
	price: 0,
};

export type createCartInput = {
	title: string;
	description: string;
	price: number;
};