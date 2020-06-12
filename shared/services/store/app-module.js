import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reactotron from 'ReactotronConfig';

import appReducer from '../reducers';

const initialState = {};

/* eslint-disable no-undef */
const devtools = __DEV__ && Reactotron.createEnhancer();
/* eslint-enable no-undef */

const middlewares = compose(applyMiddleware(thunk), devtools || (a => a));

const store = createStore(appReducer, initialState, middlewares);

export default store;
