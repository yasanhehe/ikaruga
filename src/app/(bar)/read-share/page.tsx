'use client';

import React from 'react';
import { useState, useEffect } from "react";
import BookReview from "@components/read-share/book-review";
import review_test from "@data/review_test.json";

interface review_type {
	id: string;
	title: string;
	author: string;
	isbn: string;
	essay: string;
}

const ReadShare = () => {
	const [page, setPage] = useState<number>(1);
	const [maxPage, setMaxPage] = useState<number>(1);
	const maxKeywordLength = 100;
	const [keywordLength, setKeywordLength] = useState<number>(0);
	const [searchAble, setSearchAble] = useState<boolean>(false);
	const [keyword, setKeyword] = useState<string>('');
	const [reviewData, setReviewData] = useState<{ id: string; title: string; author: string; isbn: string; essay: string; }[]>([]);
	const [loading, setLoading] = useState<boolean>(true);


	const loadData = async (pageCnt: number, searchStr: string) => {
		if (process.env.NEXT_PUBLIC_POSTGRES_ENABLE === "false") {
			console.warn('postgres is disabled....')
				setReviewData(review_test as review_type[]);
			return ;
		}
		setLoading(true);
		try {
			(async () => {
			const res = await fetch('/api/get_shohyo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					page: pageCnt,
					keyword: searchStr,
				}),
			});
			const reviewJson = await res.json().then((json) => {
				console.error(json.maxPage);
				setMaxPage(json.maxPage);
				return json.data;
			});
			setReviewData(reviewJson);
			console.log(reviewJson);
			})();
		} catch (err) {
			console.error(err);
		};
		setLoading(false);
	};

	const handleOnSearch = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		setPage(1);
		// Reactではstateがレンダリング後更新されるため、引数で渡す。スマートな方法を検討中。
		loadData(1, keyword);
		setSearchAble(false);
	};

	const handleOnClear = async (ev: any) => {
		ev.preventDefault();
		setKeyword('');
		setKeywordLength(0);
		loadData(1, '');
		setSearchAble(false);
	}

	const handleOnChangeKeyword = (
		ev: React.ChangeEvent<HTMLInputElement>
		) => {
		setKeyword(ev.target.value);
		setKeywordLength(ev.target.value.length);
		setSearchAble(true);
	};

	const handleOnClickPrevious = () => {
		console.warn("previous");
		setPage(page - 1);
		loadData(page - 1, keyword);
	}

	const handleOnClickNext = () => {
		console.warn("next");
		setPage(page + 1);
		loadData(page + 1, keyword);
	}

	const handleOnChangePage = async (ev: any) => {
		ev.preventDefault();
		let val = ev.currentTarget.value;
		if (val > maxPage) {
			val = maxPage;
		} else if (val == '') {
			val = '';
			return ;
		} else if (val < 1) {
			val = 2;
		}
		setPage(parseInt(val));
		loadData(parseInt(val), keyword);
	}

	useEffect(() => {
			loadData(1, '');
	}, []);

	return (
		/*<div className="flex flex-col pt-4 sm:ml-[120px] md:ml-[250px] sm:border-r sm:border-zinc-700 pb-20 min-h-screen">*/
		/*<label htmlFor="search" className="block text-2xl font-bold text-gray-700 mb-2">検索</label>*/
		<div className="flex flex-col pt-4 ml-4 md:ml-[280px] pb-0 min-h-screen">
			<span className="px-8 mt-10 font-bold text-3xl">ReadShare</span>
			<form onSubmit={handleOnSearch} className="md:px-8 py-6 w-full">
				<div className="flex flex-row mb-6 md:my-4">
					<input
					type="text"
					id="search"
					value={keyword}
					maxLength={maxKeywordLength}
					onChange={handleOnChangeKeyword}
					className="w-2/3 px-4 md:mx-4 mx-1 rounded-md shadow-xl focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-gray-300"
					/>
					<button
					type="submit"
					disabled={!searchAble}
					className={`w-1/3 py-4 md:mx-4 mx-1 rounded-md text-white text-xl ${ searchAble ? 'bg-indigo-500 hover:bg-indigo-600 hover:shadow-xl' : 'bg-gray-300 cursor-not-allowed'}`}
					>
					検索
					</button>
					<button
					type="button"
					disabled={keywordLength == 0}
					onClick={handleOnClear}
					className={`w-1/3 py-4 md:mx-4 mx-1 rounded-md text-white text-xl ${ !(keywordLength == 0) ? 'bg-indigo-500 hover:bg-indigo-600 hover:shadow-xl' : 'bg-gray-300 cursor-not-allowed'}`}
					>
					クリア
					</button>
				</div>
			</form>
			<div className="md:ml-[20px] justify-center w-full px-4">
				{ loading ? (
					<div className="flex justify-center">
						<div className="animate-spin mb-10 h-10 w-10 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
					</div>
				) : null }
				{ maxPage == 0 ? (
					<BookReview shohyo={{id: '', title: '', author: '', isbn: '', essay: '該当する本がありませんでした。'}} />
				): null}
				{reviewData.map((data, index) => (
						<BookReview key={index} shohyo={data} />
				))}
			</div>
			<div className="flex justify-center my-6 md:ml-[20px]">
				<button onClick={handleOnClickPrevious} disabled={page <= 1} className={`w-full py-4 my-4 mx-4 rounded-md text-white text-xl ${ page <= 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 hover:shadow-xl'}`}>
					前のページ
				</button>
				<button onClick={handleOnClickNext} disabled={page >= maxPage} className={`w-full py-4 my-4 mx-4 rounded-md text-white text-xl ${ page >= maxPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 hover:shadow-xl'}`}>
					次のページ
				</button>
			</div>
			<div className="flex flex-row justify-center mb-20">
				<input
				type="text"
				maxLength={maxPage.toString().length}
				onKeyPress={(e) => {if(e.key.match(/[^0-9]/)) e.preventDefault();}}
				onChange={handleOnChangePage}
				className="rounded-md shadow-xl placeholder-gray-600 text-xl text-center w-20 h-12 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border"
				placeholder={page.toString()}>
				</input>
				<span className="text-xl text-center h-12 w-12 pt-3">/</span>
				<span className="text-xl text-center h-12 w-12 pt-3">{maxPage}</span>
			</div>
		</div>
	)
}

export default ReadShare;
