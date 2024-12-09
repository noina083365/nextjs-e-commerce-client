import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token: any = request.cookies.get('token');
	const accessToken = token?.value;
	const user: any = jwtDecode(accessToken); // { id: 1, username: 'user001', iat: 1733715857, exp: 1733802257 }
	const username = user?.username;

	if (username && (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up'))) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	if (
		!username &&
		(pathname.startsWith('/vip') || pathname.startsWith('/admin'))
	) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.next();
}
