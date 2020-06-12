import { SET_SHOW_SIDEBAR } from './actionTypes';

const initialState = {
	sidebarShow: 'responsive',
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_SHOW_SIDEBAR:
			return {
				...state,
				sidebarShow: payload,
			};
		default:
			return state;
	}
};
