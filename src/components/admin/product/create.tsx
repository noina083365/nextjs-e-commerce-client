'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { store } from '@/redux/store';
import { createProduct } from '@/redux/reducers/productSlice';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '@/redux/reducers/categorySlice';
import { resetProductCreateForm } from '@/types/product';
import Link from 'next/link';

const CreateProduct = () => {
	const dispatch = useDispatch();
	const [productData, setProductData] = useState<any>(resetProductCreateForm);
	const router = useRouter();

	useEffect(() => {
		store.dispatch(fetchCategories());
	}, [dispatch]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { title, description, price } = productData;

		const product = {
			title,
			description,
			price,
		};
		const result: any = await store.dispatch(createProduct(product));

		if (result.payload.success) {
			alert('User saved successfully.');
			router.push('/admin/product');
		} else {
			const message = result.message ? result.message : result.payload.message;
			alert(message || 'An error occurred.');
		}
	};

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		const v = name === 'categoryId' ? +value : value;
		setProductData({ ...productData, [e.target.name]: v });
	};

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-6">
				<h4 className="font-sm font-semibold mb-6">Create a New Product</h4>
				<Link href="/admin/product">Back to list</Link>
			</div>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label htmlFor="title" className="block text-sm font-medium text-gray-700">
						Title
					</label>
					<input
						type="text"
						name="title"
						id="title"
						required
						value={productData.title}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
					/>
				</div>
				<div>
					<label htmlFor="content" className="block text-sm font-medium text-gray-700">
						Details
					</label>
					<textarea
						name="details"
						id="details"
						required
						rows={7}
						value={productData.details}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-0 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm"></textarea>
				</div>
				<div>
					<button
						type="submit"
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateProduct;
