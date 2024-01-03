import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prisma';

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const { title, isbn, essay } = JSON.parse(request.body);
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
		return response.status(200).json({ data });
	} catch (err) {
		console.warn(err);
		return response.status(500).json({ err });
	}
}

