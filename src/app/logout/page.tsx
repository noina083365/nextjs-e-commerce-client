'use client';

import React, { useEffect } from 'react';
import { createLogout } from '@/redux/reducers/authSlice';
import { store } from '@/redux/store';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function Logout() {
	const dispatch = useDispatch();

	useEffect(() => {
		store.dispatch(createLogout());
		redirect('/');
	}, [dispatch]);

	return <></>;
}
