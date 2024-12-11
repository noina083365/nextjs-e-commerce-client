import React from 'react';
import { GetServerSidePropsContext } from 'next';
import DetailPage from '@/components/product/Detail';
import { checkTokenExist } from '@/utils/common';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { id } = context.query;
	const cookies = context.req.headers.cookie;
	const customer = checkTokenExist(cookies);
	return {
		props: { id, user: customer }
	};
}

const Detail = ({ id, user }: any) => {
	return (
		<DetailPage id={id} user={user} />
	);
};

export default Detail;
