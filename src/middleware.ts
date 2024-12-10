import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token: any = request.cookies.get('token');
	let username = null;

	if (token?.value) {
		const user: any = jwtDecode(token?.value);
		username = user?.username;
	}

	if (username && (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up'))) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	if (!username && pathname.startsWith('/admin')) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Apply middleware to all pages except:
		 * 1. /api/* (exclude all API routes)
		 * 2. /_next/* (exclude Next.js assets, e.g., /_next/static/*)
		 */
		'/((?!api|_next/static|_next/image).*)',
	],
}
