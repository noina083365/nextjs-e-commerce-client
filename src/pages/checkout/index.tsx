import { useState } from "react";
import Checkout from "@/components/checkout/Checkout";
import { checkTokenExist } from '@/utils/common';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/navigation';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cookies = context.req.headers.cookie;
	const customer = checkTokenExist(cookies);
	const query = context.query;
	return {
		props: {
			userId: customer?.id || 0,
			query
		},
	};
}

export default function Home({ userId, query }: any) {
	const [productId, setProductId] = useState(query.productId || 0);
	const [source, setSource] = useState(query.source || 'cart');
	const router = useRouter();

	if (userId === 0) {
		router.push('/');
	}

	return (
		<Checkout userId={userId} source={source} productId={productId} />
	);
}
