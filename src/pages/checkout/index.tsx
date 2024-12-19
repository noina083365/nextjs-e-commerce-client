import Checkout from "@/components/checkout/Checkout";
import { checkTokenExist } from '@/utils/common';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cookies = context.req.headers.cookie;
	const customer = checkTokenExist(cookies);
	return {
		props: {
			userId: customer.id,
			...context.query
		},
	};
}

export default function Home({ userId, productId }: any) {
	return (
		<Checkout userId={userId} productId={productId} />
	);
}
