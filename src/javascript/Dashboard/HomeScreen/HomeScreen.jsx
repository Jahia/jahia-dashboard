import React, {Suspense} from 'react';
import {Separator} from '@jahia/moonstone';
import HomeIntro from './HomeIntro';
import ProjectList from './ProjectList';
import ModuleList from './ModuleList';
import Documentation from './Documentation';
import classnames from 'clsx';
import styles from './HomeScreen.scss';
import {useQuery} from '@apollo/react-hooks';
import {WelcomeScreenWithPermissions} from './HomeScreen.gql-queries';
import {Loader} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import Spacing from './Spacing';

const HomeScreen = () => {
    const {t} = useTranslation('jahia-dashboard');
    const locale = useSelector(state => state.uilang);
    const {error, data, loading} = useQuery(WelcomeScreenWithPermissions, {fetchPolicy: 'network-only'});

    if (error) {
        const message = t(
            'jahia-dashboard:jahia-dashboard.error.queryingContent',
            {details: error.message ? error.message : ''}
        );
        return <p>{message}</p>;
    }

    if (loading) {
        return <div className="flexCol_center alignCenter flexFluid"><Loader size="big"/></div>;
    }

    const modules = data.dashboard.modules;
    const myModules = modules.filter(module => module.inDevelopment === true);

    const availableModules = modules.map(module => module.id);
    const operatingMode = window.contextJsParameters.config.operatingMode;

    const hasStudioAccessPermission = data.jcr.rootNode.studioModeAccess;
    const hasAdminVirtualSitesPermission = data.jcr.rootNode.adminVirtualSites;

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
                </>}
                <Documentation locale={locale} t={t} operatingMode={operatingMode} availableModules={availableModules}/>
                <Spacing height="big"/>
            </div>
        </Suspense>
    );
};

export default HomeScreen;
