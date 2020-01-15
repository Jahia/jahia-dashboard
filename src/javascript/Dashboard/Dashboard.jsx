import React from 'react';
import {registry} from '@jahia/registry';
import {useHistory} from 'react-router-dom';
import {PrimaryNavItem} from '@jahia/moonstone';
import {registerRoute} from './Dashboard.route';
import {useTranslation} from 'react-i18next';
import Bars from '@jahia/moonstone/dist/icons/Bar';

const ROUTE = `/cms/dashboardframe/default/${window.contextJsParameters.locale}${window.contextJsParameters.user.path}.projects.html`;
const DashboardGroup = () => {
    const history = useHistory();
    const {t} = useTranslation('jahia-dashboard');
    return (
        <PrimaryNavItem key={ROUTE}
                        isSelected={history.location.pathname.endsWith(ROUTE)}
                        label={t('jahia-dashboard.label')}
                        icon={<Bars/>}
                        onClick={() => {
                            history.push(ROUTE);
                        }}/>
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

