import ProductPage from '@/components/product/List';
import { checkTokenExist } from '@/utils/common';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cookies = context.req.headers.cookie;
	const customer = checkTokenExist(cookies);
	return {
		props: {
			user: customer,
		},
	};
}

export default function Home({ user }: any) {
	return (
		<ProductPage user={user} />
	);
}
