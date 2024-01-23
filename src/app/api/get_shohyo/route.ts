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
	const { page, keyword } = JSON.parse(readableStreamText);
	const perPage = 10;
	const skip = perPage * (page - 1);
	const where = keyword === '' ? undefined : { title: { contains: keyword } };
	try {
		const data = await prisma.shohyo.findMany(
			{
				skip: skip,
				take: perPage,
				where: where,
				orderBy: {
					id: 'desc',
				},
			}
		);
		const maxPage = Math.ceil(await prisma.shohyo.count({ where: where }) / perPage);
		const response = new Response(JSON.stringify({ data, maxPage }), {
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
