import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@lib/prisma";

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	const { page } = JSON.parse(request.body);
	try {
		//pagination を実装する
		const data = await prisma.post.findMany();
		return response.status(200).json({ data });
	} catch (err) {
		return response.status(500).json({ err });
	}
}
