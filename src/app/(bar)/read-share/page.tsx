'use client';

import { useState, useEffect } from "react";
import BookReview from "@components/read-share/book-review";
import review_test from "@data/review_test.json";

interface review_type {
	id: string;
	title: string;
	isbn: string;
	essay: string;
}

const ReadShare = () => {
	const [reviewData, setReviewData] = useState<{ id: string; title: string; isbn: string; essay: string; }[]>([]);

	useEffect(() => {
		if (process.env.NEXT_PUBLIC_POSTGRES_ENABLE === "false") {
			console.warn('postgres is disabled....')
			setReviewData(review_test as review_type[]);
			return ;
		}
		try {
			(async () => {
			const res = await fetch('/api', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			});
			const reviewJson = await res.json().then((json) => json.data);
			setReviewData(reviewJson);
			console.log(reviewJson);
		})();
		} catch (err) {
			console.error(err);
		};
	}, []);

	return (
		/*<div className="flex flex-col pt-4 sm:ml-[120px] md:ml-[250px] sm:border-r sm:border-zinc-700 pb-20 min-h-screen">*/
		<div className="flex flex-col pt-4 ml-4 sm:ml-[120px] md:ml-[280px] border-r pb-0 min-h-screen">
			<span className="px-8 mt-10 font-bold text-3xl">ReadShare</span>
			<div className="w-full">
				{reviewData.map((data, index) => (
					<BookReview key={index} shohyo={data} />
				))}
			</div>
		</div>
	)
}

export default ReadShare;
