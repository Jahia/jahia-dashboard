import React from 'react';
import {registry} from '@jahia/registry';
import {useHistory} from 'react-router-dom';
import {
    PrimaryNavItemsGroup,
    PrimaryNavItem
} from '@jahia/moonstone';
import Bars from '@jahia/moonstone/dist/icons/Bar';
import {registerRoute} from './Dashboard.route';

const DashboardGroup = () => {
    const history = useHistory();
    return (
        <PrimaryNavItemsGroup>
            <PrimaryNavItem isSelected={history.location.pathname.endsWith('/dashboard')}
                            label="Dashboard"
                            icon={<Bars/>}
                            onClick={() => history.push('/dashboard')}/>
        </PrimaryNavItemsGroup>
    );
};

export const registerDashboard = () => {
    registerRoute();
    registry.add('dashboardGroup', {
        type: 'topNavGroup',
        target: ['nav-root-top:1'],
        render: () => <DashboardGroup/>
    });
};

