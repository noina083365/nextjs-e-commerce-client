import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { IdParams } from '@/types/common';
import DetailPage from '@/components/product/Detail';
import { extractCookie } from '@/utils/common';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { id } = context.query;
	const cookies = context.req.headers.cookie;
	const accessToken = extractCookie(cookies);
	return {
		props: {
			id,
			token: accessToken || null,
		}
	};
}

const Detail = ({ id, token }: any) => {
	return (
		<DetailPage id={id} token={token} />
	);
};

export default Detail;
