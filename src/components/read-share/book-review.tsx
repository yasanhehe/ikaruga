// components/BookReview.tsx

import React from 'react';

interface BookReviewProps {
	book: {
		name: string;
		review: string;
	};
}

function BookReview({ book }: BookReviewProps) {
	return (
		<div className="w-full max-w-screen-xl mx-auto bg-white rounded-xl overflow-hidden shadow-md mt-8">
			<div className="p-8 w-full">
				<div className="tracking-wide text-2xl text-indigo-500 font-semibold">
					{book.name}
				</div>
				<p className="mt-2 text-gray-500 text-xl whitespace-pre-line break-all">{book.review}</p>
			</div>
		</div>
	);
}

export default BookReview;

