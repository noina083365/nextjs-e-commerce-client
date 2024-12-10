'use client';

import React, { useEffect } from 'react';
import { createLogout } from '@/redux/reducers/authSlice';
import { store } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function Logout() {
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		store.dispatch(createLogout());
		router.push('/');
	}, [dispatch]);

	return <></>;
}
