// components/BookReview.tsx

import React from 'react';

interface BookReviewProps {
	shohyo: {
		id: string;
		title: string;
		author: string;
		isbn: string;
		essay: string;
	};
}

function searchUrl(title: string, isbn: string) {
	if (isbn.length == 0) {
		return `https://opac.std.cloud.iliswave.jp/iwjs0020opc/ctlsrh.do?srhclm1=title&valclm1=${title}`;
	} else {
		return `https://opac.std.cloud.iliswave.jp/iwjs0020opc/ctlsrh.do?srhclm1=isbn&valclm1=${isbn}`;
	}
}

function BookReview({ shohyo }: BookReviewProps) {
	return (
		<div className="w-full bg-white rounded-xl overflow-hidden shadow-md mt-8">
			<div className="p-8 w-full">
				<a className="tracking-wide text-2xl text-indigo-500 font-semibold" href={searchUrl(shohyo.title, shohyo.isbn)}>
					{shohyo.title}
				</a>
				<p className="mt-2 text-gray-500 text-xl">{shohyo.author}著</p>
				<p className="mt-2 text-gray-500 text-xl whitespace-pre-line break-all">{shohyo.essay}</p>
			</div>
		</div>
	);
}

export default BookReview;

