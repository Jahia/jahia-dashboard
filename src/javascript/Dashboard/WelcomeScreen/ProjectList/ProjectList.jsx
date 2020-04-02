import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import {SiteNodesQuery} from './ProjectList.gql-queries';
import {ProgressOverlay} from '@jahia/react-material';
import Card from '../Card';
import classnames from 'clsx';
import SectionTitle from '../SectionTitle';

const ProjectList = props => {
    const {t, isAdmin, locale} = props;
    const {data, error, loading} = useQuery(SiteNodesQuery, {
        variables: {
            query: 'select * from [jnt:virtualsite] where ischildnode(\'/sites\')',
            displayLanguage: locale
        }
    });

    if (error) {
        const message = t(
            'jahia-dashboard:jahia-dashboard.error.queryingContent',
            {details: error.message ? error.message : ''}
        );
        return <>{message}</>;
    }

    if (loading) {
        return <ProgressOverlay/>;
    }

    const siteNodes = data && data.jcr && data.jcr.result ? data.jcr.result.siteNodes
        .filter(node => node.hasPermission && node.name !== 'systemsite')
        .sort((elem1, elem2) => {
            if (elem1.displayName < elem2.displayName) {
                return -1;
            }

            if (elem1.displayName > elem2.displayName) {
                return 1;
            }

            return 0;
        }) : [];

    if (isAdmin) {
        siteNodes.push({
            uuid: 'create-site',
            displayName: t('jahia-dashboard:jahia-dashboard.projects.createNew.title'),
            description: t('jahia-dashboard:jahia-dashboard.projects.createNew.description')
        });
    }

    return (
        <Suspense fallback="loading ...">
            <SectionTitle>{t('jahia-dashboard:jahia-dashboard.projects.title')}</SectionTitle>
            <a href={window.contextJsParameters.contextPath + '/jahia/dashboard/projects'}>{t('jahia-dashboard:jahia-dashboard.seeAll')}</a>
            <div className={classnames('flexRow')}>
                {siteNodes.map(siteNode => {
                    const onClick = () => {
                        let siteUrl = window.contextJsParameters.contextPath + '/jahia/page-composer/default/en/sites/' + siteNode.name + '/home.html';
                        if (siteNode.uuid === 'create-site') {
                            siteUrl = window.contextJsParameters.contextPath + '/jahia/administration/webProjectSettings';
                        }

                        window.location.assign(siteUrl);
                    };

                return (
                    <Card
                        key={siteNode.uuid}
                        headerText={siteNode.displayName}
                        infoText={siteNode.description ? siteNode.description : t('jahia-dashboard:jahia-dashboard.projects.noDescription')}
                        onClick={() => onClick()}
                    />
                );
            })}
            </div>
        </Suspense>
    );
};

ProjectList.propTypes = {
    locale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default ProjectList;
