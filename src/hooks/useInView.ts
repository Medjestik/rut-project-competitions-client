import { useEffect, useRef, useState } from 'react';

export const useInView = (
	options: IntersectionObserverInit = { threshold: 0.2 }
) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsVisible(true);
				observer.disconnect();
			}
		}, options);

		observer.observe(node);

		return () => {
			observer.disconnect();
		};
	}, [options]);

	return { ref, isVisible };
};
