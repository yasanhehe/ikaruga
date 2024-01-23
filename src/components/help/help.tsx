// components/BookReview.tsx

import React from 'react';
import Link from 'next/link';

interface HelpProps {
	help: {
		title: string;
		description: string;
		link: string;
	};
}

function Help({ help }: HelpProps) {
	return (
		<div className="w-full bg-white rounded-xl overflow-hidden shadow-md mt-3">
			<div className="p-8 w-full">
				<Link href={`${help.link}`} className="tracking-wide text-2xl text-black font-semibold">
					{help.title}
				</Link>
				<p className="mt-2 text-black text-xl whitespace-pre-line break-all">{help.description}</p>
			</div>
		</div>
	);
}

export default Help;

