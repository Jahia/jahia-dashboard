import {dashboardRedux} from './Dashboard.redux';
import {registerRoute} from './Dashboard.route';
import {registerAdminRoute} from './Dashboard.adminRoute';
import {registry} from '@jahia/ui-extender';
import {DashboardItem} from './DashboardItem';
import React from 'react';

export default () => {
    dashboardRedux();
    registerRoute();
    registerAdminRoute();
    registry.add('primary-nav-item', 'dashboard', {
        targets: ['nav-root-tasks:1'],
        render: () => <DashboardItem/>
    });
};
