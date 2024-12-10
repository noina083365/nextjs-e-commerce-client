import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { IdParams } from '@/types/common';
import DetailPage from '@/components/product/Detail';
import { extractCookie } from '@/utils/common';
import { jwtDecode } from 'jwt-decode';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { id } = context.query;
	const cookies = context.req.headers.cookie;
	const accessToken = extractCookie(cookies);
	const user: any = jwtDecode(accessToken) || null;
	return {
		props: { id, user }
	};
}

const Detail = ({ id, user }: any) => {
	return (
		<DetailPage id={id} user={user} />
	);
};

export default Detail;
