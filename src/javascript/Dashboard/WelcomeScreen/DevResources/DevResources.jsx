import React, {Suspense} from 'react';
import {useTranslation} from 'react-i18next';
import Card from '../Card';
import classnames from 'clsx';
import SectionTitle from '../SectionTitle';
import Studio from '@jahia/moonstone/dist/icons/Studio';

const DevResources = () => {
    const {t} = useTranslation('jahia-dashboard');

    const devCards = [
        {
            id: 'studio',
            name: t('jahia-dashboard:jahia-dashboard.studio.title'),
            link: '/cms/studio/default/en/settings.manageModules.html',
            icon: <Studio/>,
            description: t('jahia-dashboard:jahia-dashboard.studio.description')
        },
        {
            id: 'graphiql',
            name: t('jahia-dashboard:jahia-dashboard.graphiql.title'),
            link: '/modules/graphql-dxm-provider/tools/graphiql.jsp',
            description: t('jahia-dashboard:jahia-dashboard.graphiql.description'),
            requireInstallationMode: 'production'
        },
        {
            id: 'sdlgenerator',
            name: t('jahia-dashboard:jahia-dashboard.sdlgenerator.title'),
            link: '/modules/sdl-generator-tools/tools/sdlGeneratorTools.jsp',
            description: t('jahia-dashboard:jahia-dashboard.sdlgenerator.description'),
            requireInstallationMode: 'production'
        },
        {
            id: 'sdlreport',
            name: t('jahia-dashboard:jahia-dashboard.sdlreport.title'),
            link: '/modules/graphql-dxm-provider/tools/sdlreporttool.jsp',
            description: t('jahia-dashboard:jahia-dashboard.sdlreport.description'),
            requireInstallationMode: 'production'
        },
        {
            id: 'jwt',
            name: t('jahia-dashboard:jahia-dashboard.jwt.title'),
            link: '/modules/security-filter-tools/tools/jwtConfiguration.jsp',
            description: t('jahia-dashboard:jahia-dashboard.jwt.description'),
            requireInstallationMode: 'production'
        }
    ];

    return (
        <Suspense fallback="loading ...">
            <SectionTitle>Developer resources</SectionTitle>
            <div className={classnames('flexRow')}>
                {devCards.map(devCard => {
                    return (
                        <Card key={devCard.id} headerText={devCard.name} icon={devCard.icon} infoText={devCard.description}/>
                    );
                })}
            </div>
        </Suspense>
    );
};

export default DevResources;
