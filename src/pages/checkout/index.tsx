import Checkout from "@/components/checkout/Checkout";
import { checkTokenExist } from '@/utils/common';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cookies = context.req.headers.cookie;
	const customer = checkTokenExist(cookies);
	// const { cusId, productId } = context.query;
	return {
		props: {
			user: customer,
			...context.query
		},
	};
}

export default function Home({ user, productId }: any) {
	console.log(user, productId);
	return (
		<Checkout token={user} productId={productId} />
	);
}
