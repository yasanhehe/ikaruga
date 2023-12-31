import { NextRequest, NextResponse } from 'next/server'

const WHITE_IP = ['39.111.69.183'];

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();

	let ip: string = req.ip ?? req.headers.get('x-real-ip') ?? '';

	const forwardedFor = req.headers.get('x-forwarded-for');
	if (!ip && forwardedFor) {
		ip = forwardedFor.split(',')[0] ?? 'unknown_ip';
	}

	if (!WHITE_IP.includes(ip)) {
		return NextResponse.redirect('/restrict');
	}

	return res;
}
