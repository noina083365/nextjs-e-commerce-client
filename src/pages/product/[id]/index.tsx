import React from 'react';
import { GetServerSidePropsContext } from 'next';
import DetailPage from '@/components/product/Detail';
import { checkTokenExist } from '@/utils/common';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { id } = context.query;
	const cookies = context.req.headers.cookie;
	const customer = checkTokenExist(cookies);
	return {
		props: { id, userId: customer?.id || 0 }
	};
}

const Detail = ({ id, userId }: any) => {
	return (
		<DetailPage id={id} userId={userId} />
	);
};

export default Detail;
