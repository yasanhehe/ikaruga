import prisma from '@lib/prisma';

export async function POST(
	request: Request,
) {
	const readableStreamText = await new Response(request.body).text();
	const { title, isbn, essay } = JSON.parse(readableStreamText);
	try {
		const data = await prisma.post.create({
			data: {
				title,
				isbn,
				essay
			},
			select: {
				id: true,
				title: true,
				isbn: true,
				essay: true
			}
		});
		const response = new Response(JSON.stringify({ data }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	} catch (err) {
		console.warn(err);
		const response = new Response(JSON.stringify({ err }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	}
}

export async function GET(
	_request: Request,
) {
	try {
		const data = await prisma.post.findMany();
		console.log(data);
		const response = new Response(JSON.stringify({ data }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	} catch (err) {
		console.warn(err);
		const response = new Response(JSON.stringify({ err }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	}
}
