import { ReactNode } from 'react';

export default function MaxWidthWrapper({
	children,
}: {
	children: ReactNode;
}) {
	return (
		/*<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">*/
		<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
			{children}
		</div>
	);
}
