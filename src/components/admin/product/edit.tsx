'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { store } from '@/redux/store';
import { editProduct, fetchProduct } from '@/redux/reducers/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ProductState } from '@/types/interfaces';
import { Product, resetProductCreateForm } from '@/types/product';
import Link from 'next/link';

const EditProduct = ({ id, userId }: any) => {
	const dispatch = useDispatch();
	const currentProduct = useSelector((state: { product: ProductState }) => state.product.currentProduct);
	const [productData, setProductData] = useState<Product>(resetProductCreateForm);
	const router = useRouter();

	useEffect(() => {
		store.dispatch(fetchProduct(id));
	}, [id, dispatch]);

	useEffect(() => {
		setProductData(currentProduct);
	}, [currentProduct]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { name, description, price, stock } = productData;
		let result: any = {};

		const product = {
			id,
			name,
			description,
			price: parseFloat(`${price}`),
			stock: parseFloat(`${stock}`),
		};
		result = await store.dispatch(editProduct(product));

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
				<Link href="/admin/product">Back to list</Link>
			</div>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-700">
						Name
					</label>
					<input
						type="text"
						name="name"
						id="name"
						required
						value={productData.name}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
					/>
				</div>
				<div>
					<label htmlFor="price" className="block text-sm font-medium text-gray-700">
						Price
					</label>
					<input
						type="text"
						name="price"
						id="price"
						required
						value={productData.price}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
					/>
				</div>
				<div>
					<label htmlFor="stock" className="block text-sm font-medium text-gray-700">
						Stock
					</label>
					<input
						type="text"
						name="stock"
						id="stock"
						required
						value={productData.stock}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
