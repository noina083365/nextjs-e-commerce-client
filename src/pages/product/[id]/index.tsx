import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { IdParams } from '@/types/common';
import DetailPage from '@/components/product/Detail';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { id } = context.query;
	return { props: { id } };
}

const Detail = ({ id }: IdParams) => {
	return (
		<DetailPage id={id} />
	);
};

export default Detail;
