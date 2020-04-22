import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import {useQuery} from '@apollo/react-hooks';
import {SiteNodesQuery} from './ProjectList.gql-queries';
import {ProgressOverlay} from '@jahia/react-material';
import Card from '../Card';
import SectionHeader from '../SectionHeader';
import {useHistory} from 'react-router-dom';
import ArrowRightIcon from '@jahia/moonstone/dist/icons/ArrowRight';
import AddIcon from '@jahia/moonstone/dist/icons/Add';

const ProjectList = props => {
    const {t, isAdmin, locale} = props;
    const history = useHistory();
    const {data, error, loading} = useQuery(SiteNodesQuery, {
        variables: {
            query: 'select * from [jnt:virtualsite] where ischildnode(\'/sites\')',
            displayLanguage: locale
        },
        fetchPolicy: 'network-only'
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
            if (elem1.lastModified && elem1.lastModified.longValue && elem2.lastModified && elem2.lastModified.longValue) {
                if (elem1.lastModified.longValue < elem2.lastModified.longValue) {
                    return 1;
                }

                if (elem1.lastModified.longValue > elem2.lastModified.longValue) {
                    return -1;
                }
            }

            if (elem1.displayName < elem2.displayName) {
                return -1;
            }

            if (elem1.displayName > elem2.displayName) {
                return 1;
            }

            return 0;
        }).map(siteNode => {
            const homePageNode = siteNode.children.nodes.find(childPage => {
                return childPage.isHomePage && childPage.isHomePage.value && childPage.isHomePage.value === 'true';
            });
            siteNode.homePageName = homePageNode.name;
            siteNode.homePagePath = homePageNode.path;
            return siteNode;
        }) : [];

    if (isAdmin) {
        siteNodes.length = Math.min(siteNodes.length, 7);
        siteNodes.push({
            uuid: 'create-site',
            displayName: t('jahia-dashboard:jahia-dashboard.projects.createNew.title'),
            description: t('jahia-dashboard:jahia-dashboard.projects.createNew.description')
        });
    } else {
        siteNodes.length = Math.min(siteNodes.length, 8);
    }

    return (
        <Suspense fallback="loading ...">
            <SectionHeader
                isRouterLink
                title={t('jahia-dashboard:jahia-dashboard.projects.title')}
                moreUrl="/dashboard/projects"
                moreLabel={t('jahia-dashboard:jahia-dashboard.seeAll')}
            />
            <div className={classnames('flexRow')}>
                {siteNodes.map(siteNode => {
                    const onClick = () => {
                        let siteUrl = '/page-composer/default/' + locale + '/sites/' + siteNode.name + '/' + siteNode.homePageName + '.html';
                        if (siteNode.uuid === 'create-site') {
                            siteUrl = '/administration/webProjectSettings';
                        }

                        history.push(siteUrl);
                    };

                return (
                    <Card
                        key={siteNode.uuid}
                        isCreateNewCard={siteNode.uuid === 'create-site'}
                        headerText={siteNode.displayName}
                        hoverIcon={siteNode.uuid === 'create-site' ? <AddIcon/> : <ArrowRightIcon/>}
                        infoText={siteNode.site && siteNode.site.description ? siteNode.site.description : t('jahia-dashboard:jahia-dashboard.projects.noDescription')}
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
