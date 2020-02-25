import React from 'react';
import {registry} from '@jahia/ui-extender';
import {useHistory} from 'react-router-dom';
import {PrimaryNavItem} from '@jahia/moonstone';
import {registerRoute} from './Dashboard.route';
import {useTranslation} from 'react-i18next';
import Bars from '@jahia/moonstone/dist/icons/Bar';
import Iframe from 'react-iframe';

let endPath = `/${window.contextJsParameters.locale}${window.contextJsParameters.user.path}.projects.html?redirect=false`;
const ROUTE = '/cms/dashboard/default';
const FRAMESRC = `/cms/dashboardframe/default${endPath}`;

const DashboardGroup = () => {
    const history = useHistory();
    const {t} = useTranslation('jahia-dashboard');
    return (
        <PrimaryNavItem key={ROUTE}
                        isSelected={history.location.pathname.startsWith(ROUTE)}
                        label={t('jahia-dashboard.label')}
                        icon={<Bars/>}
                        onClick={() => {
                            history.push(`${ROUTE}${endPath}`);
                        }}/>
    );
};

const DashBoard = () => {
    return <Iframe url={window.contextJsParameters.contextPath + FRAMESRC} width="100%" height="100%"/>;
};

export const registerDashboard = () => {
    registerRoute(<DashBoard/>);
    registry.add('primary-nav-item', 'dashboardGroupItem', {
        targets: ['nav-root-top:1'],
        render: () => <DashboardGroup/>
    });
};

