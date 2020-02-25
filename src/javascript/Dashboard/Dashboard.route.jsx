import React, {Suspense} from 'react';
import {registry} from '@jahia/ui-extender';

export const registerRoute = (componentToRender = 'Jahia Dashboard') => {
    registry.add('route', 'routeDashboard', {
        targets: ['nav-root-top:1'],
        path: '/cms/dashboard/default*',
        defaultPath: '/cms/dashboard/default*',
        render: () => <Suspense fallback="loading ...">{componentToRender}</Suspense>
    });
};

console.debug('%c Jahia Dashboard is activated', 'color: #3c8cba');
