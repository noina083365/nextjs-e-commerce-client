import { useState } from "react";
import Checkout from "@/components/checkout/Checkout";
import { checkTokenExist } from '@/utils/common';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cookies = context.req.headers.cookie;
	const customer = checkTokenExist(cookies);
	const query = context.query;
	return {
		props: {
			userId: customer.id,
			query
		},
	};
}

export default function Home({ userId, query }: any) {
	const [productId, setProductId] = useState(query.productId || 0);
	const [source, setSource] = useState(query.source || 'cart');
	return (
		<Checkout userId={userId} source={source} productId={productId} />
	);
}
