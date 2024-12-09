// 'use server';

import { NextRequest } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
	try {
		const { username, password } = await req.json();
		const api = `${process.env.NEXT_PUBLIC_API}/api/auth/customer-register`;
		const response = await axios.post(api, { username, password });
		return Response.json({ message: 'Register successful' }, { status: 200 });
	} catch (error: any) {
		const message = error.message ? error.message : 'Internal Server Error.';
		return Response.json({ message }, { status: 500 });
	}
}
