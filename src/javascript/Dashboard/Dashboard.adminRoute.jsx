import React from 'react';
import {registry} from '@jahia/ui-extender';
import SiteWeb from '@jahia/moonstone/dist/icons/SiteWeb';
import Workflow from '@jahia/moonstone/dist/icons/Workflow';

/**
 * What used to be the dashboard's "My workspace" tree.
 *
 * Home is no longer one of these: it IS /dashboard now, rendered full width with no second level
 * at all (see Dashboard.jsx). A navigation that only ever holds one item is not navigation.
 *
 * The rest are about the person signed in rather than about a dashboard, so they hang off the
 * profile icon instead. The `profile` target belongs to jahia-user-entries, which renders them
 * beside the profile page itself. Their addresses moved with them, /dashboard/x -> /profile/x, and
 * Dashboard.jsx redirects the old ones.
 *
 * "My files" and "My pages" are gone outright: both were iframes onto a dashboard template that
 * repeats what jContent already does better, and neither earned a place in the list.
 */
export const registerAdminRoute = () => {
    registry.add('adminRoute', 'projects', {
        targets: ['profile:20'],
        icon: <SiteWeb/>,
        label: 'jahia-dashboard:jahia-dashboard.workspace.projects',
        isSelectable: true,
        iframeUrl: `${window.contextJsParameters.contextPath}/cms/dashboardframe/default/$ui-lang/${window.contextJsParameters.user.path}.projects.html`
    });
    registry.add('adminRoute', 'tasks', {
        targets: ['profile:30'],
        icon: <Workflow/>,
        label: 'jahia-dashboard:jahia-dashboard.workspace.tasks',
        isSelectable: true,
        iframeUrl: `${window.contextJsParameters.contextPath}/cms/dashboardframe/default/$ui-lang/${window.contextJsParameters.user.path}.tasks.html`
    });
};
