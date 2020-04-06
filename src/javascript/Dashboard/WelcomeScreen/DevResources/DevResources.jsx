import React, {Suspense} from 'react';
import Card from '../Card';
import classnames from 'clsx';
import PropTypes from 'prop-types';
import StudioIcon from '@jahia/moonstone/dist/icons/Studio';
import GraphQlIcon from '@jahia/moonstone/dist/icons/GraphQl';
import SDLGeneratorIcon from '@jahia/moonstone/dist/icons/SdLgenerator';
import SDLReportIcon from '@jahia/moonstone/dist/icons/SdLreport';
import JwtIcon from '@jahia/moonstone/dist/icons/Jwt';
import SectionHeader from '../SectionHeader';

const DevResources = props => {
    const {t, hasToolsAccess} = props;

    const devCards = [
        {
            id: 'studio',
            name: t('jahia-dashboard:jahia-dashboard.devResources.studio.title'),
            icon: <StudioIcon/>,
            link: '/cms/studio/default/en/settings.manageModules.html',
            description: t('jahia-dashboard:jahia-dashboard.devResources.studio.description')
        },
        {
            id: 'graphiql',
            name: t('jahia-dashboard:jahia-dashboard.devResources.graphiql.title'),
            icon: <GraphQlIcon/>,
            link: '/modules/graphql-dxm-provider/tools/graphiql.jsp',
            description: t('jahia-dashboard:jahia-dashboard.devResources.graphiql.description'),
            requiresToolsAccess: true
        },
        {
            id: 'sdlgenerator',
            name: t('jahia-dashboard:jahia-dashboard.devResources.sdlgenerator.title'),
            icon: <SDLGeneratorIcon/>,
            link: '/modules/sdl-generator-tools/tools/sdlGeneratorTools.jsp',
            description: t('jahia-dashboard:jahia-dashboard.devResources.sdlgenerator.description'),
            requiresToolsAccess: true
        },
        {
            id: 'sdlreport',
            name: t('jahia-dashboard:jahia-dashboard.devResources.sdlreport.title'),
            icon: <SDLReportIcon/>,
            link: '/modules/graphql-dxm-provider/tools/sdlreporttool.jsp',
            description: t('jahia-dashboard:jahia-dashboard.devResources.sdlreport.description'),
            requiresToolsAccess: true
        },
        {
            id: 'jwt',
            name: t('jahia-dashboard:jahia-dashboard.devResources.jwt.title'),
            icon: <JwtIcon/>,
            link: '/modules/security-filter-tools/tools/jwtConfiguration.jsp',
            description: t('jahia-dashboard:jahia-dashboard.devResources.jwt.description'),
            requiresToolsAccess: true
        }
    ];

    return (
        <Suspense fallback="loading ...">
            <SectionHeader title="Developer resources"/>
            <div className={classnames('flexRow')}>
                {devCards.filter(devCard => devCard.requiresToolsAccess ? hasToolsAccess : true).map(devCard => {
                    const devCardUrl = window.contextJsParameters.contextPath + devCard.link;

                    const onClick = () => {
                        window.open(devCardUrl, '_blank');
                    };

                    return (
                        <Card key={devCard.id} headerText={devCard.name} icon={devCard.icon} infoText={devCard.description} onClick={() => onClick()}/>
                    );
                })}
            </div>
        </Suspense>
    );
};

DevResources.propTypes = {
    hasToolsAccess: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
};

export default DevResources;
