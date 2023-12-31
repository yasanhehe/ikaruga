import { NextRequest, NextResponse } from 'next/server'

const WHITE_IP = ['39.111.69.183'];

export async function middleware(req: NextRequest) {
	console.warn('jikkousaretayo!')
	const path = req.nextUrl.pathname;
	const res = NextResponse.next();

	//too many redirect防止
	if (path === '/access-denied') {
		return res;
	}

	let ip: string = req.ip ?? req.headers.get('x-real-ip') ?? '';
	const forwardedFor = req.headers.get('x-forwarded-for');

	if (!ip && forwardedFor) {
		ip = forwardedFor.split(',')[0] ?? 'unknown_ip';
	}

	if (!WHITE_IP.includes(ip)) {
		//redirect先はFULL PATHで
		const redirectUrl = new URL('/access-denied', req.url);
		console.warn(redirectUrl.href);
		return NextResponse.redirect(redirectUrl.href);
	}

	return res;
}
