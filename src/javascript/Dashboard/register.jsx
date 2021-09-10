import {dashboardRedux} from './Dashboard.redux';
import {registerRoute} from './Dashboard.route';
import {registerAdminRoute} from './Dashboard.adminRoute';
import {registry} from '@jahia/ui-extender';
import {DashboardGroup} from './DashboardGroup';
import React from 'react';

export default () => {
    dashboardRedux();
    registerRoute();
    registerAdminRoute();
    registry.add('primary-nav-item', 'dashboardGroupItem', {
        targets: ['nav-root-tasks:1'],
        render: () => <DashboardGroup/>
    });
};
