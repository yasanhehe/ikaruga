import '@styles/globals.css'

import type { Metadata } from 'next';
import BottomNav from '@components/bottom-nav';
import MaxWidthWrapper from '@components/max-width-wrapper';
import SideNav from '@components/side-nav';
import Favicon from '@public/favicon.ico';

export const metadata: Metadata = {
	title: 'Ikaruga',
	description: '"The only thing that you absolutely have to know, is the location of the library," - Albert Einstein.',
};

/*
RootLayoutは、Side/BottomNavとコンテンツを含むページの基本的なレイアウトを定義します。childrenはそのコンテンツを指します。
*/


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<MaxWidthWrapper>
					<div className="flex">
						<SideNav />
						<main className="flex-1">{children}</main>
					</div>
				</MaxWidthWrapper>
				<BottomNav />
			</body>
		</html>
	);
}

