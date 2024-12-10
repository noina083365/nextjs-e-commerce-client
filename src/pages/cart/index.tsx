import CartList from "@/components/CartList";
import { extractCookie } from '@/utils/common';
import { GetServerSidePropsContext } from 'next';
import { jwtDecode } from 'jwt-decode';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cookies = context.req.headers.cookie;
	const accessToken = extractCookie(cookies);
	const user: any = jwtDecode(accessToken) || null;

	return {
		props: {
			user,
		},
	};
}

export default function Home({ user }: any) {
	return (
		<CartList token={user} />
	);
}
