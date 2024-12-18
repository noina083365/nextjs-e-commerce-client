'use server';

import { NextRequest } from 'next/server';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
	try {
		const { username, password } = await req.json();

		const api = `${process.env.NEXT_PUBLIC_API}/api/auth/customer-login`;
		const response = await axios.post(api, { username, password }).catch(() => {});
		const token = response?.data?.accessToken;

		if (!token) {
			return Response.json({ message: 'Authenticate failed' }, { status: 401 });
		}
		const user: any = jwtDecode(token);

		const cookieStore = await cookies();

		cookieStore.set({
			name: 'token',
			value: token,
			httpOnly: true,
			secure: true,
			maxAge: 3600 * 24, // 24 hrs. (3600 = 1 hour)
			sameSite: 'strict',
			path: '/',
		});
		return Response.json({ message: 'Authenticate successful', user }, { status: 200 });
	} catch (error: any) {
		const message = error.message ? error.message : 'Internal Server Error.';
		return Response.json({ message }, { status: 500 });
	}
}
