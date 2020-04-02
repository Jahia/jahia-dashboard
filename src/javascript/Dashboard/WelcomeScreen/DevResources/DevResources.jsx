import React, {Suspense} from 'react';
import Card from '../Card';
import classnames from 'clsx';
import SectionTitle from '../SectionTitle';
import PropTypes from 'prop-types';
import Studio from '@jahia/moonstone/dist/icons/Studio';
import GraphQl from '@jahia/moonstone/dist/icons/GraphQl';
import SDLGenerator from '@jahia/moonstone/dist/icons/SdLgenerator';
import SDLReport from '@jahia/moonstone/dist/icons/SdLreport';
import Jwt from '@jahia/moonstone/dist/icons/Jwt';

const DevResources = props => {
    const {t, isTrial} = props;

    const devCards = [
        {
            id: 'studio',
            name: t('jahia-dashboard:jahia-dashboard.devResources.studio.title'),
            icon: <Studio/>,
            link: '/cms/studio/default/en/settings.manageModules.html',
            description: t('jahia-dashboard:jahia-dashboard.devResources.studio.description')
        },
        {
            id: 'graphiql',
            name: t('jahia-dashboard:jahia-dashboard.devResources.graphiql.title'),
            icon: <GraphQl/>,
            link: '/modules/graphql-dxm-provider/tools/graphiql.jsp',
            description: t('jahia-dashboard:jahia-dashboard.devResources.graphiql.description'),
            hideInTrial: true
        },
        {
            id: 'sdlgenerator',
            name: t('jahia-dashboard:jahia-dashboard.devResources.sdlgenerator.title'),
            icon: <SDLGenerator/>,
            link: '/modules/sdl-generator-tools/tools/sdlGeneratorTools.jsp',
            description: t('jahia-dashboard:jahia-dashboard.devResources.sdlgenerator.description'),
            hideInTrial: true
        },
        {
            id: 'sdlreport',
            name: t('jahia-dashboard:jahia-dashboard.devResources.sdlreport.title'),
            icon: <SDLReport/>,
            link: '/modules/graphql-dxm-provider/tools/sdlreporttool.jsp',
            description: t('jahia-dashboard:jahia-dashboard.devResources.sdlreport.description'),
            hideInTrial: true
        },
        {
            id: 'jwt',
            name: t('jahia-dashboard:jahia-dashboard.devResources.jwt.title'),
            icon: <Jwt/>,
            link: '/modules/security-filter-tools/tools/jwtConfiguration.jsp',
            description: t('jahia-dashboard:jahia-dashboard.devResources.jwt.description'),
            hideInTrial: true
        }
    ];

    return (
        <Suspense fallback="loading ...">
            <SectionTitle>Developer resources</SectionTitle>
            <div className={classnames('flexRow')}>
                {devCards.filter(devCard => devCard.hideInTrial && isTrial).map(devCard => {
                    return (
                        <Card key={devCard.id} headerText={devCard.name} icon={devCard.icon} infoText={devCard.description}/>
                    );
                })}
            </div>
        </Suspense>
    );
};

DevResources.propTypes = {
    isTrial: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
};

export default DevResources;
