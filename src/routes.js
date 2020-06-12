import React from 'react';

const Home = React.lazy(() => import('./views/home'));

const routes = [{ path: '/', name: 'home', component: Home }];

export default routes;
