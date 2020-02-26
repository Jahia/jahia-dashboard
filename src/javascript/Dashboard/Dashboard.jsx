import React from 'react';
import {registry} from '@jahia/registry';
import {useHistory} from 'react-router-dom';
import {PrimaryNavItem} from '@jahia/moonstone';
import {registerRoute} from './Dashboard.route';
import {useTranslation} from 'react-i18next';
import Bars from '@jahia/moonstone/dist/icons/Bar';
import Iframe from 'react-iframe';

let endPath = `/${window.contextJsParameters.locale}${window.contextJsParameters.user.path}.projects.html?redirect=false`;
const ROUTE = `/cms/dashboard/default${endPath}`;
const FRAMESRC = `/cms/dashboardframe/default${endPath}`;
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

const DashBoard = () => {
    return <Iframe url={window.contextJsParameters.contextPath + FRAMESRC} width="100%" height="100%"/>;
};

export const registerDashboard = () => {
    registerRoute(<DashBoard/>);
    registry.add('dashboardGroupItem', {
        type: 'primary-nav-item',
        target: ['nav-root-top:1'],
        render: () => <DashboardGroup/>
    });
};

