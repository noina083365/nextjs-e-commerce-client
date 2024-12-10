// 'use server';

import { cookies } from 'next/headers';

export async function GET(): Promise<any> {
	try {
		const cookieStore = await cookies();
		cookieStore.delete({ name: 'token' });

		return Response.json({ message: 'Cookie deleted successfully.' }, {
			status: 200,
		});
	} catch (error: any) {
		const message = error.message ? error.message : 'Internal Server Error.';
		return Response.json({ message }, { status: 500 });
	}
}
