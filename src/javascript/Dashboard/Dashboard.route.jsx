import React, {Suspense} from 'react';
import {registry} from '@jahia/ui-extender';
import Constants from './Dashboard.constants';
import {DashBoard} from './Dashboard';

export const registerRoute = () => {
    registry.add('route', 'routeDashboard', {
        targets: ['main:1'],
        path: `${Constants.ROUTE}*`,
        defaultPath: Constants.ROUTE,
        render: v => <Suspense fallback="loading ..."><DashBoard match={v.match}/></Suspense>
    });
};

console.debug('%c Jahia Dashboard is activated', 'color: #3c8cba');
