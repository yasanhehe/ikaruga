'use client';

import React from 'react';
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
	const [page, setPage] = useState<number>(1);
	const [keywordLength, setKeywordLength] = useState<number>(0);
	const [keyword, setKeyword] = useState<string>('');
	const maxKeywordLength = 100;

	const [reviewData, setReviewData] = useState<{ id: string; title: string; isbn: string; essay: string; }[]>([]);

	const handleOnChange = () => {
		if (process.env.NEXT_PUBLIC_POSTGRES_ENABLE === "false") {
			console.warn('postgres is disabled....')
			setReviewData(review_test as review_type[]);
			return ;
		}
		try {
			(async () => {
			const res = await fetch('/api/get_shohyo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					page,
					keyword,
				}),
			});
			//const reviewJson = await res.json().then((json) => json.data);
			//setReviewData(reviewJson);
			//console.log(reviewJson);
		})();
		} catch (err) {
			console.error('err occured in handleOnChange');
			console.error(err);
		};
	};

	const handleOnChangeKeyword = (
		ev: React.ChangeEvent<HTMLInputElement>
	) => {
		setKeyword(ev.target.value);
		setKeywordLength(ev.target.value.length);
	};

	useEffect(() => {
		handleOnChange();
	});

	return (
		/*<div className="flex flex-col pt-4 sm:ml-[120px] md:ml-[250px] sm:border-r sm:border-zinc-700 pb-20 min-h-screen">*/
		/*<label htmlFor="search" className="block text-2xl font-bold text-gray-700 mb-2">検索</label>*/
		<div className="flex flex-col pt-4 ml-4 sm:ml-[120px] md:ml-[280px] pb-0 min-h-screen">
			<span className="px-8 mt-10 font-bold text-3xl">ReadShare</span>
			<form onSubmit={handleOnChange} className="px-8 py-6 w-full">
				<div className="mb-6">
					<input
						type="text"
						id="search"
						value={keyword}
						maxLength={maxKeywordLength}
						onChange={handleOnChangeKeyword}
						className="w-full h-12 px-4 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
					/>
				</div>
				<button
					type="submit"
					disabled={keywordLength != 0}
					className={`w-full py-4 rounded-md text-white text-xl ${keywordLength != 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}
				>
					{keywordLength != 0 ? '本を検索' : '本を検索'}
				</button>
			</form>
			<div className="w-full">
				{reviewData.map((data, index) => (
					<BookReview key={index} shohyo={data} />
				))}
			</div>
		</div>
	)
}

export default ReadShare;
