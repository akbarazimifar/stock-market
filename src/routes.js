import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard'));

const routes = [{ path: '/', name: 'Dashboard', component: Dashboard }];

export default routes;
