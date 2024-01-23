'use client';

import React from 'react';
import { useState, useEffect } from "react";
import BookReview from "@components/read-share/book-review";
import review_test from "@data/review_test.json";

	return (
		<div className="flex flex-col pt-4 ml-4 md:ml-[280px] pb-0 min-h-screen">
			<span className="px-8 mt-10 font-bold text-3xl">ReadShare</span>
			<div className="md:ml-[20px] justify-center w-full px-4">
					<BookReview shohyo={{id: '', title: 'ReadShare', author: '', isbn: '', essay: '投稿された書評が読めます。'}} />
					<BookReview shohyo={{id: '', title: 'Shohyo', author: '', isbn: '', essay: '書評を投稿できます。'}} />
			</div>
		</div>
	)
}

export default ReadShare;
