import { SET_SHOW_SIDEBAR } from './actionTypes';

export const setShowSidebar = payload => dispatch =>
	dispatch({
		type: SET_SHOW_SIDEBAR,
		payload,
	});
