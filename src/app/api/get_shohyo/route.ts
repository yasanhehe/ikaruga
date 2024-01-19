import prisma from '@lib/prisma';

export async function POST(
	// requestは、ページ, 検索キーワードを含む
	// request = { page: int, keyword: string }
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
	const { pagestr, keyword } = JSON.parse(readableStreamText);
	const perPage = 10;
	//page is string
	const page = parseInt(pagestr);	
	const skip = perPage * page;
	try {
		const data = await prisma.post.findMany(
			{
				skip,
				take: perPage,
				where: {
					title: keyword === '' ? undefined : { contains: keyword },
				},
			}
		);
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
