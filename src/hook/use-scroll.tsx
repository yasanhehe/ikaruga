'use client';

import { useEffect, useState } from 'react';

const useScrollEffect = () => {
	const [scrollDirection, setScrollDirection] = useState('down');

	useEffect(() => {
		let prevScroll = window.scrollY;

		const handlescroll = () => {
			const currentScroll = window.scrollY;

			if (currentScroll > prevScroll) {
				setScrollDirection('down');
			} else {
				setScrollDirection('up');
			}

			prevScroll = currentScroll;
		};

		window.addEventListener('scroll', handlescroll);

		return () => window.removeEventListener('scroll', handlescroll);
	}, []);

	return scrollDirection;
}

export default useScrollEffect;
