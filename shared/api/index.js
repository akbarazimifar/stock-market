import axios from 'axios';

import { apiUrl } from 'config';

import store from '../services/store';
import { setInRetry } from '../services/app/actions';

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

const retries = 10;
const delay = 1500;

export const retryApi = axios.create(requestConfig);
retryApi.interceptors.response.use(
	res => {
		store.dispatch(setInRetry(false, ''));
		return Promise.resolve(res);
	},
	error => {
		const config = error.config;

		if (!config) {
			return Promise.reject(error);
		}

		const currentState = getCurrentState(config);

		if (isNetworkError(error) && currentState.retryCount < retries) {
			currentState.retryCount += 1;

			store.dispatch(
				setInRetry(
					true,
					'خطا در دریافت اطلاعات از سایت tsetmc، در حال تلاش مجدد ...',
				),
			);

			return new Promise(resolve =>
				setTimeout(() => resolve(retryApi(config)), delay),
			);
		}

		store.dispatch(
			setInRetry(
				false,
				'پس از چندین بار تلاش، اطلاعات از سایت tsetmc دریافت نشد',
			),
		);

		return Promise.reject(error);
	},
);

export const isNetworkError = error => {
	return (
		!error.response ||
		error.code === 'ECONNABORTED' || // Prevents retrying timed out requests
		!!error.isAxiosError ||
		(error.response &&
			error.response.status >= 500 &&
			error.response.status <= 599)
	);
};

const getCurrentState = config => {
	const currentState = config['axios-retry'] || {};
	currentState.retryCount = currentState.retryCount || 0;
	config['axios-retry'] = currentState;
	return currentState;
};
