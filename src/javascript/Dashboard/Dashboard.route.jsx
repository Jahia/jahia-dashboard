import React, {Suspense} from 'react';
import {registry} from '@jahia/registry';

export const registerRoute = (componentToRender = 'Jahia Dashboard') => {
    registry.add('route-dashboard', {
        type: 'route',
        target: ['nav-root-top:1'],
        path: '/dashboard',
        defaultPath: '/dashboard',
        render: () => <Suspense fallback="loading ...">{componentToRender}</Suspense>
    });
};

window.contextJsParameters.namespaceResolvers['jahia-dashboard'] = lang => require('../../main/resources/javascript/locales/' + lang + '.json');

console.log('%c Jahia Dashboard is activated', 'color: #3c8cba');
