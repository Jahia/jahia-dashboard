import React from 'react';
import {useHistory} from 'react-router';
import {useTranslation} from 'react-i18next';
import {PrimaryNavItem} from '@jahia/moonstone';
import Constants from './Dashboard.constants';
import Bars from '@jahia/moonstone/dist/icons/BarSquare';

export const DashboardGroup = () => {
    const history = useHistory();
    const {t} = useTranslation('jahia-dashboard');
    return (
        <PrimaryNavItem key={Constants.ROUTE}
                        role="dashboard-menu-item"
                        isSelected={history.location.pathname.startsWith(Constants.ROUTE)}
                        label={t('jahia-dashboard.label')}
                        icon={<Bars/>}
                        onClick={() => {
                            history.push(`${Constants.ROUTE}${Constants.ROUTE_DEFAULT_PATH}`);
                        }}/>
    );
};

