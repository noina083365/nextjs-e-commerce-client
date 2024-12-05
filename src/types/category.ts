export type Category = {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
};
export type EditCategoryInput = {
	id: string;
	name: string;
};

export type CreateCategoryInput = {
	name: string;
};

export const resetCategoryCreateForm = {
	name: '',
};
