// components/BookReview.tsx

import React from 'react';

interface BookReviewProps {
	shohyo: {
		id: string;
		title: string;
		isbn: string;
		essay: string;
	};
}

function searchUrl(searchQuery: string) {
	return `https://lib.aiit.ac.jp/index.php?action=pages_view_main&active_action=v3search_view_main_init&block_id=296&tab_num=0&op_param=words%3D${searchQuery}%26srhRevTagFlg%3D#v3search_view_main_init`;
}

function BookReview({ shohyo }: BookReviewProps) {
	return (
		<div className="w-full max-w-screen-xl mx-auto bg-white rounded-xl overflow-hidden shadow-md mt-8">
			<div className="p-8 w-full">
				<a className="tracking-wide text-2xl text-indigo-500 font-semibold" href={searchUrl(shohyo.isbn.length == 0 ? shohyo.title : shohyo.isbn)}>
					{shohyo.title}
				</a>
				<p className="mt-2 text-gray-500 text-xl whitespace-pre-line break-all">{shohyo.essay}</p>
			</div>
		</div>
	);
}

export default BookReview;

