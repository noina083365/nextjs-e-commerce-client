import CartList from "@/components/CartList";
import { extractCookie } from '@/utils/common';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const cookies = context.req.headers.cookie;
	const accessToken = extractCookie(cookies);

	return {
		props: {
			token: accessToken || null,
		},
	};
}

export default function Home({ token }: any) {
  return (
    <CartList token={token} />
  );
}
