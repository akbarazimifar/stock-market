import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
	<div className='pt-3 text-center'>
		<div className='sk-spinner sk-spinner-pulse' />
	</div>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Page404 = React.lazy(() => import('./views/page404'));
const Page500 = React.lazy(() => import('./views/page500'));

const App = () => (
	<HashRouter>
		<React.Suspense fallback={loading}>
			<Switch>
				<Route
					exact
					path='/404'
					name='Page 404'
					render={props => <Page404 {...props} />}
				/>
				<Route
					exact
					path='/500'
					name='Page 500'
					render={props => <Page500 {...props} />}
				/>
				<Route
					path='/'
					name='Home'
					render={props => <TheLayout {...props} />}
				/>
			</Switch>
		</React.Suspense>
	</HashRouter>
);

export default App;
