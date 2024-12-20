import ProductPage from '@/components/product/List';
import { checkTokenExist } from '@/utils/common';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cookies = context.req.headers.cookie;
	const customer = checkTokenExist(cookies);
	return {
		props: {
			userId: customer?.id || 0,
		},
	};
}

export default function Home({ userId }: any) {
	return (
		<ProductPage userId={userId} />
	);
}
