export const isEmpty = obj =>
	Object.keys(obj).length === 0 && obj.constructor === Object;

export const truncate = (str, num = 5) => {
	const arrStr = str.split(' ');
	if (str.length > num) {
		return `${arrStr.slice(0, num).join(' ')} ...`;
	}

	return str;
};

export const toPersianNum = input => {
	const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
	return `${input}`.replace(/[0-9]/g, w => {
		return id[+w];
	});
};

export const arrayToObject = (list, keyField = 'id') => {
	return Object.assign(
		{},
		...list.map((item, index) => ({
			[item[keyField]]: { ...item, index },
		})),
	);
};

export const objectToArray = objectList => {
	const list = [];

	Object.keys(objectList).forEach(key => {
		const item = objectList[key];
		list[item.index] = item;
	});

	return list;
};

export const currency = (value, showUnit = true) => {
	if (!value) {
		return showUnit ? '0 ریال' : '0';
	}

	value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	if (showUnit) {
		value += ' ریال';
	}
	return value;
};

export const debounced = (delay, fn) => {
	let timerId;
	return (...args) => {
		if (timerId) {
			clearTimeout(timerId);
		}
		timerId = setTimeout(() => {
			fn(...args);
			timerId = null;
		}, delay);
	};
};

export const throttled = (delay, fn) => {
	let lastCall = 0;
	return (...args) => {
		const now = new Date().getTime();
		if (now - lastCall < delay) {
			return null;
		}
		lastCall = now;
		return fn(...args);
	};
};

export const isWebPlatform = typeof document !== 'undefined';

export const multiSort = (list, keys = [], desc = true) => {
	if (keys.length === 0 || list === null || list?.length === 0) return list;

	return list.sort((a, b) => {
		/* eslint-disable no-restricted-syntax, guard-for-in */
		for (const i in keys) {
			if (a[keys[i]] > b[keys[i]]) return desc ? -1 : 1;
			if (a[keys[i]] < b[keys[i]]) return desc ? 1 : -1;
		}
		/* eslint-enable no-restricted-syntax, guard-for-in */
		return 0;
	});
};

export const retry = (fn, retriesLeft = 5, interval = 2000) => {
	return new Promise((resolve, reject) => {
		fn()
			.then(resolve)
			.catch(error => {
				setTimeout(() => {
					if (retriesLeft === 1) {
						// reject('maximum retries exceeded');
						reject(error);
						return;
					}

					// Passing on "reject" is the important part
					retry(fn, retriesLeft - 1, interval).then(resolve, reject);
				}, interval);
			});
	});
};

export const roundPrice = (number, round) => {
	let result = number;
	if (round > 0) {
		const remain = number % round;
		if (remain > round / 2) {
			result = number - remain + round;
		} else if (remain < round / 2) {
			result = number - remain;
		}
	}
	return result;
};

export const normalizeError = error => {
	const err = {};
	error.inner.forEach(ei => {
		err[ei.path] = ei.message;
	});
	return err;
};

export const toEnglishDigit = str => {
	const persianNumbers = [
		/۰/g,
		/۱/g,
		/۲/g,
		/۳/g,
		/۴/g,
		/۵/g,
		/۶/g,
		/۷/g,
		/۸/g,
		/۹/g,
	];
	const arabicNumbers = [
		/٠/g,
		/١/g,
		/٢/g,
		/٣/g,
		/٤/g,
		/٥/g,
		/٦/g,
		/٧/g,
		/٨/g,
		/٩/g,
	];

	if (typeof str === 'string') {
		for (let i = 0; i < 10; i++) {
			str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
		}
	}
	return str;
};

export const injectMessageData = (text, dataObj) => {
	if (dataObj) {
		Object.keys(dataObj).forEach(key => {
			const val = dataObj[key];
			text = text.replace(`{{${key}}}`, val);
		});
	}

	return text;
};

export const mustTwoDigits = value => {
	return `0${value}`.slice(-2);
};
