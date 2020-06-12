import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import appReducer from '../reducers';

const initialState = {};

const devtools =
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
	process.env.NODE_ENV === 'development' &&
	window.__REDUX_DEVTOOLS_EXTENSION__();

const middlewares = compose(applyMiddleware(thunk), devtools || (a => a));

const store = createStore(appReducer, initialState, middlewares);

export default store;
