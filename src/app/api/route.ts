import prisma from '@lib/prisma';

export async function POST(
	// requestは、title, isbn, essayを含む
	// request = { title: string, isbn: string, essay: string }
	request: Request,
) {
	if (process.env.POSTGRES_ENABLE === 'false') {
		const response = new Response(JSON.stringify({ err: 'Postgres is disabled' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response;
	}
	const readableStreamText = await new Response(request.body).text();
	const { title, author, isbn, essay } = JSON.parse(readableStreamText);
	try {
		const data = await prisma.shohyo.create({
			data: {
				title,
				author,
				isbn,
				essay
			},
			select: {
				id: true,
				title: true,
				author: true,
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
