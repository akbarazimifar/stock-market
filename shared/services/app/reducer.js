import {
	SET_SHOW_SIDEBAR,
	SET_IN_RETRY,
	SET_RECEIVE_DATA_TIME,
} from './actionTypes';

const initialState = {
	sidebarShow: 'responsive',
	inRetry: false,
	retryText: '',
	receiveDataTime: null,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_SHOW_SIDEBAR:
			return {
				...state,
				sidebarShow: payload,
			};
		case SET_IN_RETRY:
			return {
				...state,
				inRetry: payload.status,
				retryText: payload.text,
			};
		case SET_RECEIVE_DATA_TIME:
			return {
				...state,
				receiveDataTime: payload,
			};

		default:
			return state;
	}
};
