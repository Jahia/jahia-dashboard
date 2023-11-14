import React from 'react';
import {useHistory} from 'react-router';
import {useTranslation} from 'react-i18next';
import {PrimaryNavItem} from '@jahia/moonstone';
import Constants from './Dashboard.constants';
import Home from '@jahia/moonstone/dist/icons/Home';
import {useSelector} from 'react-redux';

export const DashboardItem = props => {
    const history = useHistory();
    const {t} = useTranslation('jahia-dashboard');
    const current = useSelector(state => state.dashboard.path);
    let route = `${Constants.ROUTE}${Constants.ROUTE_DEFAULT_PATH}`;
    if (current !== '') {
        route = current;
    }

    return (
        <PrimaryNavItem key={Constants.ROUTE}
                        {...props}
                        isSelected={history.location.pathname.startsWith(Constants.ROUTE)}
                        label={t('jahia-dashboard.label')}
                        icon={<Home/>}
                        onClick={() => {
                            history.push(route);
                        }}/>
    );
};

