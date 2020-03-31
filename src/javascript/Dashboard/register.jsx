import React from 'react';
import {registerRoute} from './Dashboard.route';
import {registerAdminRoute} from './Dashboard.adminRoute';
import {registry} from '@jahia/ui-extender';
import {DashboardGroup} from './DashboardGroup';

export const registerDashboard = () => {
    registerRoute();
    registerAdminRoute();
    registry.add('primary-nav-item', 'dashboardGroupItem', {
        targets: ['nav-root-tasks:1'],
        render: () => <DashboardGroup/>
    });
};

