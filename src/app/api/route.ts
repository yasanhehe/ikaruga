import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prisma';

export async function POST(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const chunks = [];
    for await (const chunk of request.body) {
        chunks.push(chunk);
    }
    const body = Buffer.concat(chunks).toString();
    const { title, isbn, essay } = JSON.parse(body);
	return response.status(200).json({ title, isbn, essay });
	//try {
	//	const data = await prisma.post.create({
	//		data: {
	//			title,
	//			isbn,
	//			essay
	//		},
	//		select: {
	//			id: true,
	//			title: true,
	//			isbn: true,
	//			essay: true
	//		}
	//	});
	//	return response.status(200).json({ data });
	//} catch (err) {
	//	console.warn(err);
	//	return response.status(500).json({ err });
	//}
}

