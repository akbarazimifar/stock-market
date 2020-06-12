import {
	SET_SHOW_SIDEBAR,
	SET_IN_RETRY,
	SET_RECEIVE_DATA_TIME,
} from './actionTypes';

export const setShowSidebar = payload => ({
	type: SET_SHOW_SIDEBAR,
	payload,
});

export const setInRetry = (status, text) => ({
	type: SET_IN_RETRY,
	payload: {
		status,
		text,
	},
});

export const setReceiveDataTime = time => ({
	type: SET_RECEIVE_DATA_TIME,
	payload: time,
});
