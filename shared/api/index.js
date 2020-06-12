import axios from 'axios';

import { apiUrl } from 'config';

export const requestConfig = {
	baseURL: apiUrl,
	json: true,
	timeout: 20000, // 20 sec
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		'cache-control': 'no-cache',
	},
};

export const api = axios.create(requestConfig);

api.interceptors.response.use(undefined, async error => {
	if (isNetworkError(error)) {
		return new Promise(resolve => {
			const originalRequest = error.config;
			setTimeout(() => {
				resolve(api(originalRequest));
			}, 1500);
		});
	}
	return Promise.reject(error);
});

export const isNetworkError = err => {
	return !!err.isAxiosError && !err.response;
};
