import React from 'react';
import {registry} from '@jahia/registry';
import {useHistory} from 'react-router-dom';
import {PrimaryNavItem} from '@jahia/moonstone';
import Bars from '@jahia/moonstone/dist/icons/Bar';
import {registerRoute} from './Dashboard.route';

const ROUTE = '/dashboard';

const DashboardGroup = () => {
    const history = useHistory();
    return (
        <PrimaryNavItem key={ROUTE}
                        isSelected={history.location.pathname.endsWith(ROUTE)}
                        label="Dashboard"
                        icon={<Bars/>}
                        onClick={() => history.push(ROUTE)}/>
    );
};

const DashBoard = () => 'Jahia Dashboard Component';

export const registerDashboard = () => {
    registerRoute(<DashBoard/>);
    registry.add('dashboardGroupItem', {
        type: 'topNavGroup',
        target: ['nav-root-top:1'],
        render: () => <DashboardGroup/>
    });
};

