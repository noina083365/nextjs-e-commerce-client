'use client';

import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { ProductState } from '@/types/interfaces';
import { store } from '@/redux/store';
import { deleteProduct, fetchProducts } from '@/redux/reducers/productSlice';
import { Product } from '@/types/product';

const ProductList = () => {
	const dispatch = useDispatch();
	const products = useSelector((state: { product: ProductState }) => state.product.products);

	useEffect(() => {
		store.dispatch(fetchProducts());
	}, [dispatch]);

	const deleteAction = (id: string) => {
		if (id) {
			if (window.confirm('Delete this product?')) {
				store.dispatch(deleteProduct(`${id}`));
			}
		}
	};

	const handleDelete = useCallback(deleteAction, []);

	return (
		<div className="max-w-6xl mx-auto px-4 py-8">
			<h1 className="text-2xl font-semibold mb-6">Products</h1>
			<div className="flex flex-wrap justify-between items-center mb-6">
				<h4>Product list</h4>
				<Link className="bg-blue-500 text-xs text-white rounded px-3 py-1" href="/admin/product/create">
					Add new product
				</Link>
			</div>
			<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
				<table className='w-full'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
							<th>Stock</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white text-xs divide-y divide-gray-200">
						{
							products.map((product: Product) => (
								<tr key={product.id}>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td className="px-6 py-4 whitespace-wrap">
										<div className="font-medium text-gray-900">{product.stock}</div>
									</td>
									<td>
										<div className="flex justify-around px-6 py-4 whitespace-wrap">
											<Link className="text-indigo-600 mr-2" href={`/admin/product/edit/${product.id}`}>
												Edit
											</Link>
											<button
												onClick={() => handleDelete(product.id)}
												className="text-red-600 hover:text-red-900">
												Delete
											</button>
										</div>
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductList;
