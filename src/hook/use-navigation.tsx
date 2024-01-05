'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const useNavigation = () => {
	const pathname = usePathname();
	const [isHomeActive, setIsHomeActive] = useState(false);
	const [isReadShareActive, setIsReadShareActive] = useState(false);
	const [isScanActive, setIsScanActive] = useState(false);
	const [isCreatePostActive, setIsCreatePostActive] = useState(false);

	useEffect(() => {
		setIsHomeActive(false);
		setIsReadShareActive(false);
		setIsScanActive(false);
		setIsCreatePostActive(false);

		switch (pathname) {
			case '/':
				setIsHomeActive(true);
				break;
			case '/read-share':
				setIsReadShareActive(true);
				break;
			case '/scan':
				setIsScanActive(true);
				break;
			case '/create-post':
				setIsCreatePostActive(true);
				break;
			default:
				break;
		}
	}, [pathname]);

	return {
		isHomeActive,
		isReadShareActive,
		isScanActive,
		isCreatePostActive,
	};
};

export default useNavigation;
