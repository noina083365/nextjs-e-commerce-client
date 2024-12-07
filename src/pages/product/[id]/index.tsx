import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { IdParams } from '@/types/common';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { id } = context.query;
	return { props: { id } };
}

const DetailPage = ({ id }: IdParams) => {
	return (
		<div>
			<h1>Product ID: {id}</h1>
		</div>
	);
};

export default DetailPage;
