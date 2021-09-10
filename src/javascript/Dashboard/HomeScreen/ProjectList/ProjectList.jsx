import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import {useQuery} from '@apollo/react-hooks';
import {getSiteNodesQuery} from './ProjectList.gql-queries';
import {Loader} from '@jahia/moonstone';
import Card from '../Card';
import SectionHeader from '../SectionHeader';
import {useHistory} from 'react-router-dom';
import ArrowRightIcon from '@jahia/moonstone/dist/icons/ArrowRight';
import AddIcon from '@jahia/moonstone/dist/icons/Add';
import Constants from '../../Dashboard.constants';

const hasData = data => data && data.jcr && data.jcr.result &&
    data.jcr.result.siteNodes.filter(node => node.hasPermission && node.name !== 'systemsite').length > 0;

const ProjectList = props => {
    const {t, isAdmin, locale} = props;
    const history = useHistory();
    const variables = {
        query: 'select * from [jnt:virtualsite] where ischildnode(\'/sites\')',
        displayLanguage: locale
    };
    const fetchPolicy = 'network-only';
    const useQueryOptions = {variables, fetchPolicy};
    const {data: pageComposerData, error: pageComposerError, loading: pageComposerLoading} = useQuery(getSiteNodesQuery('pageComposerAccess'), useQueryOptions);
    const {data: jContentData, error: jContentError, loading: jContentLoading} = useQuery(getSiteNodesQuery('jContentAccess'), useQueryOptions);

    let data = hasData(pageComposerData) ? pageComposerData : jContentData;
    let error = hasData(pageComposerData) ? pageComposerError : jContentError;
    let loading = hasData(pageComposerData) ? pageComposerLoading : jContentLoading;
    let siteType = hasData(pageComposerData) ? Constants.SITE_TYPE.PAGE_COMPOSER : Constants.SITE_TYPE.JCONTENT;

    if (error) {
        const message = t(
            'jahia-dashboard:jahia-dashboard.error.queryingContent',
            {details: error.message ? error.message : ''}
        );
        return <>{message}</>;
    }

    if (loading) {
        return <div className="flexCol_center alignCenter flexFluid"><Loader size="big"/></div>;
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
                        if (siteNode.uuid === 'create-site') {
                            let siteUrl = '/administration/webProjectSettings';
                            history.push(siteUrl);
                        } else {
                            let siteLanguage = siteNode.languages.values.indexOf(locale) >= 0 ? locale : siteNode.defaultLanguage.value;
                            let siteUrl = '';
                            switch (siteType) {
                                case Constants.SITE_TYPE.PAGE_COMPOSER:
                                    siteUrl = '/page-composer/default/' + siteLanguage + '/sites/' + siteNode.name + '/' + siteNode.homePageName + '.html';
                                    break;
                                case Constants.SITE_TYPE.JCONTENT:
                                    siteUrl = '/jcontent/' + siteNode.name + '/' + siteLanguage + '/pages/' + siteNode.homePageName;
                                    break;
                                default:
                                    break;
                            }

                            history.push(siteUrl);
                        }
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
