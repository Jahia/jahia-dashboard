import React, {Suspense} from 'react';
import {Separator} from '@jahia/moonstone';
import HomeIntro from './HomeIntro';
import ProjectList from './ProjectList';
import ModuleList from './ModuleList';
import DevResources from './DevResources';
import Documentation from './Documentation';
import classnames from 'clsx';
import styles from './HomeScreen.scss';
import {useQuery} from '@apollo/react-hooks';
import {DashboardQuery, PermissionsQuery} from './HomeScreen.gql-queries';
import {ProgressOverlay} from '@jahia/react-material';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import Spacing from './Spacing';

const HomeScreen = () => {
    const {t} = useTranslation('jahia-dashboard');
    const locale = useSelector(state => state.uilang);
    const dashboardData = useQuery(DashboardQuery, {
        variables: {
        },
        fetchPolicy: 'network-only'
    });

    const permissionsData = useQuery(PermissionsQuery, {
        variables: {
        },
        fetchPolicy: 'network-only'
    });

    if (dashboardData.error) {
        const message = t(
            'jahia-dashboard:jahia-dashboard.error.queryingContent',
            {details: dashboardData.error.message ? dashboardData.error.message : ''}
        );
        return <>{message}</>;
    }

    if (dashboardData.loading) {
        return <ProgressOverlay/>;
    }

    if (permissionsData.error) {
        const message = t(
            'jahia-dashboard:jahia-dashboard.error.queryingContent',
            {details: permissionsData.error.message ? permissionsData.error.message : ''}
        );
        return <>{message}</>;
    }

    if (permissionsData.loading) {
        return <ProgressOverlay/>;
    }

    const modules = dashboardData.data.dashboard.modules;
    const myModules = modules.filter(module => module.inDevelopment === true);

    const availableModules = modules.map(module => module.id);
    const operatingMode = window.contextJsParameters.config.operatingMode;
    const hasToolsAccess = dashboardData.data.dashboard.toolsAccess;

    const hasStudioAccessPermission = permissionsData.data.jcr.rootNode.studioModeAccess;
    const hasAdminVirtualSitesPermission = permissionsData.data.jcr.rootNode.adminVirtualSites;

    const developmentMode = operatingMode === 'development' && hasStudioAccessPermission;

    return (
        <Suspense fallback="loading ...">
            <div className={classnames(styles.root)}>
                <HomeIntro locale={locale} t={t} isDevelopment={developmentMode}/>
                <Spacing height="big"/>
                <Separator spacing="medium"/>
                <ProjectList locale={locale} t={t} isAdmin={hasAdminVirtualSitesPermission}/>
                <Spacing height="big"/>
                <Separator spacing="medium"/>
                { developmentMode &&
                <>
                    <ModuleList locale={locale} modules={myModules} t={t}/>
                    <Spacing height="big"/>
                    <Separator spacing="medium"/>
                    <DevResources locale={locale} hasToolsAccess={hasToolsAccess} t={t}/>
                    <Spacing height="big"/>
                    <Separator spacing="medium"/>
                </>}
                <Documentation locale={locale} t={t} operatingMode={operatingMode} availableModules={availableModules}/>
                <Spacing height="big"/>
            </div>
        </Suspense>
    );
};

export default HomeScreen;
