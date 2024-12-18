import Checkout from "@/components/checkout/Checkout";
import { checkTokenExist } from '@/utils/common';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cookies = context.req.headers.cookie;
	const customer = checkTokenExist(cookies);
	return {
		props: {
			user: customer,
			...context.query
		},
	};
}

export default function Home({ user, productId }: any) {
	return (
		<Checkout token={user} productId={productId} />
	);
}
