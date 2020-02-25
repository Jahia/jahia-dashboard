import React, {Suspense} from 'react';
import {registry} from '@jahia/ui-extender';

export const registerRoute = (componentToRender = 'Jahia Dashboard') => {
    registry.add('route', 'route-dashboard', {
        targets: ['nav-root-top:1'],
        path: '/cms/dashboard/default/*',
        defaultPath: '/cms/dashboard/default/*',
        render: () => <Suspense fallback="loading ...">{componentToRender}</Suspense>
    });
};

window.contextJsParameters.namespaceResolvers['jahia-dashboard'] = lang => require('../../main/resources/javascript/locales/' + lang + '.json');

console.log('%c Jahia Dashboard is activated', 'color: #3c8cba');
