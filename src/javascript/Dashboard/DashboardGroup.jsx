import React from 'react';
import {useHistory} from 'react-router';
import {useTranslation} from 'react-i18next';
import {PrimaryNavItem} from '@jahia/moonstone';
import Constants from './Dashboard.constants';
import Bars from '@jahia/moonstone/dist/icons/BarSquare';
import {useSelector} from 'react-redux';

export const DashboardGroup = () => {
    const history = useHistory();
    const {t} = useTranslation('jahia-dashboard');
    const current = useSelector(state => ({lastVisitedPath: state.dashboard.path}));
    let route = `${Constants.ROUTE}${Constants.ROUTE_DEFAULT_PATH}`;
    if (current.lastVisitedPath !== '') {
        route = current.lastVisitedPath;
    }

    return (
        <PrimaryNavItem key={Constants.ROUTE}
                        role="dashboard-menu-item"
                        isSelected={history.location.pathname.startsWith(Constants.ROUTE)}
                        label={t('jahia-dashboard.label')}
                        icon={<Bars/>}
                        onClick={() => {
                            history.push(route);
                        }}/>
    );
};

