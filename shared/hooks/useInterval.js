import { useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {
	const savedCallback = useRef();

	// Remember the latest function.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		let id = null;
		const tick = () => {
			savedCallback.current();
		};
		if (delay !== null) {
			id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
		return () => clearInterval(id);
	}, [delay]);
};
