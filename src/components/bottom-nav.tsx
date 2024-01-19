'use client';

import React from 'react';
import Link from 'next/link';
import useNavigation from '@hook/use-navigation';
import useScrollingEffect from '@hook/use-scroll';
import { Icon } from '@iconify/react';

const BottomNav = () => {
	const scrollDirection = useScrollingEffect(); // Use the custom hook
	/*const navClass = scrollDirection === 'up' ? '' : 'opacity-25 duration-500';*/
	const navClass = scrollDirection === 'up' ? 'opacity-100 duration-500' : 'opacity-70 duration-500';

	const {
		isHomeActive,
		isReadShareActive,
		isScanActive,
		isCreatePostActive,
	} = useNavigation();

	return (
		<div
			/*className={`fixed bottom-0 w-full py-4 z-10 bg-zinc-100 dark:bg-zinc-950 border-t dark:border-zinc-800 border-zinc-200 shadow-lg sm:hidden ${navClass}`}*/
			className={`fixed bottom-0 w-full py-4 z-10 bg-zinc-100 dark:bg-zinc-0 border-t dark:border-zinc-800 border-zinc-200 shadow-lg sm:hidden ${navClass}`}
		>
			<div className="flex flex-row justify-around items-center bg-transparent w-full">
				{/*Home Screen Icon*/}
				<Link href="/" className="flex items-center relative">
					{isHomeActive ? (
						<Icon icon="mingcute:home-5-fill" width="32" height="32" />
					) : (
						<Icon icon="mingcute:home-5-line" width="32" height="32" />
					)}
					{/* <span className="h-2 w-2 rounded-full bg-sky-500 absolute -top-0.5 right-[3px]"></span> */}
				</Link>

				{/*Share Screen Icon*/}
				<Link href="/read-share" className="flex items-center">
					{isReadShareActive ? (
						<Icon
							icon="uil:book-alt"
							width="32"
							height="32"
							className="stroke-current stroke-5"
						/>
					) : (
						<Icon icon="uil:book-alt" width="32" height="32" />
					)}
				</Link>

				{/*Scan Screen Icon*/}
				<Link href="/scan" className="flex items-center">
					{isScanActive ? (
						<Icon icon="ph:barcode-fill" width="32" height="32" />
					) : (
						<Icon icon="ph:barcode-bold" width="32" height="32" />
					)}
				</Link>

				<Link href="/create-post" className="flex items-center">
					{isCreatePostActive ? (
						<Icon icon="mingcute:pen-fill" width="32" height="32" />
					) : (
						<Icon icon="mingcute:pen-line" width="32" height="32" />
					)}
				</Link>
			</div>
		</div>
	);
};

export default BottomNav;

