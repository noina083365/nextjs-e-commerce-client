'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { store } from '@/redux/store';
import { editProduct, fetchProduct } from '@/redux/reducers/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ProductState } from '@/types/interfaces';
import { resetProductCreateForm } from '@/types/product';

const EditProduct = ({ id }: { id: string }) => {
	const dispatch = useDispatch();
	const currentProduct = useSelector((state: { product: ProductState }) => state.product.currentProduct);
	const [productData, setProductData] = useState<any>(resetProductCreateForm);
	const router = useRouter();

	useEffect(() => {
		store.dispatch(fetchProduct(id));
	}, [id, dispatch]);

	useEffect(() => {
		setProductData(currentProduct);
	}, [currentProduct]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { title, details, categoryId } = productData;
		let result: any = {};

		const user = {
			id,
			title,
			details,
			categoryId,
		};
		result = await store.dispatch(editProduct(user));

		if (result.success || result.type?.endsWith('/fulfilled')) {
			alert('User saved successfully.');
			router.push('/admin/product');
		} else {
			alert(result.message || 'An error occurred.');
		}
	};

	const handleChange = (e: any) => {
		setProductData({ ...productData, [e.target.name]: e.target.value });
	};

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-6">
				<h4 className="font-sm font-semibold mb-6">Edit Product</h4>
				<button
					onClick={() => router.push('/admin/product')}
					className="bg-blue-500 text-xs text-white px-3 py-1 rounded">
					Back to list
				</button>
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
						className="mt-1 block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
					/>
				</div>
				<div>
					<label htmlFor="details" className="block text-sm font-medium text-gray-700">
						Details
					</label>
					<input
						type="text"
						name="details"
						id="details"
						required
						value={productData.details}
						onChange={handleChange}
						className="mt-1 block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
					/>
				</div>
				<div>
					<button
						type="submit"
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						Update
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditProduct;
