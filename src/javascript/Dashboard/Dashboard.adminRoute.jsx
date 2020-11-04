import React from 'react';
import {registry} from '@jahia/ui-extender';
import Home from '@jahia/moonstone/dist/icons/Home';
import File from '@jahia/moonstone/dist/icons/File';
import SiteWeb from '@jahia/moonstone/dist/icons/SiteWeb';
import FileContent from '@jahia/moonstone/dist/icons/FileContent';
import Workflow from '@jahia/moonstone/dist/icons/Workflow';
import HomeScreen from './HomeScreen';
import AccessKeys from './AccessKeys';

export const registerAdminRoute = () => {
    registry.add('adminRoute', 'home', {
        targets: ['dashboard:10'],
        icon: <Home/>,
        label: 'jahia-dashboard:jahia-dashboard.workspace.home',
        isSelectable: true,
        route: '/dashboard',
        render: () => <HomeScreen/>
    });
    registry.add('adminRoute', 'files', {
        targets: ['dashboard:20'],
        icon: <File/>,
        label: 'jahia-dashboard:jahia-dashboard.workspace.files',
        isSelectable: true,
        iframeUrl: `${window.contextJsParameters.contextPath}/cms/dashboardframe/default/$ui-lang/${window.contextJsParameters.user.path}.files.html`
    });
    registry.add('adminRoute', 'projects', {
        targets: ['dashboard:30'],
        icon: <SiteWeb/>,
        label: 'jahia-dashboard:jahia-dashboard.workspace.projects',
        isSelectable: true,
        iframeUrl: `${window.contextJsParameters.contextPath}/cms/dashboardframe/default/$ui-lang/${window.contextJsParameters.user.path}.projects.html`
    });
    registry.add('adminRoute', 'pages', {
        targets: ['dashboard:40'],
        icon: <FileContent/>,
        label: 'jahia-dashboard:jahia-dashboard.workspace.pages',
        isSelectable: true,
        iframeUrl: `${window.contextJsParameters.contextPath}/cms/dashboardframe/default/$ui-lang/${window.contextJsParameters.user.path}.pages.html`
    });
    registry.add('adminRoute', 'tasks', {
        targets: ['dashboard:50'],
        icon: <Workflow/>,
        label: 'jahia-dashboard:jahia-dashboard.workspace.tasks',
        isSelectable: true,
        iframeUrl: `${window.contextJsParameters.contextPath}/cms/dashboardframe/default/$ui-lang/${window.contextJsParameters.user.path}.tasks.html`
    });
    registry.add('adminRoute', 'accessKeys', {
        targets: ['dashboard:60'],
        icon: null,
        label: 'jahia-dashboard:jahia-dashboard.accessKey.label',
        isSelectable: true,
        route: '/dashboard/access-keys',
        render: () => <AccessKeys/>
    });
};

