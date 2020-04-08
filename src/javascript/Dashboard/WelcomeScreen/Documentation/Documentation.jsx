import React, {Suspense} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {DocumentationNodesQuery} from './Documentation.gql-queries';
import {ProgressOverlay} from '@jahia/react-material';
import PropTypes from 'prop-types';
import DocCard from '../DocCard';
import classnames from 'clsx';
import {Typography} from '@jahia/moonstone';
import Spacing from '../Spacing';
import SectionHeader from '../SectionHeader';
import {useNodeInfo} from '@jahia/data-helper';

const Documentation = props => {
    const {t, locale, operatingMode, availableModules} = props;
    const docNodesResult = useQuery(DocumentationNodesQuery, {
        variables: {
            query: 'select * from [jnt:dashboardDoc] where isdescendantnode(\'/modules\') or isdescendantnode(\'/sites\') order by [lastEditDate]',
            displayLanguage: locale
        }
    });

    let docNodes = docNodesResult.data && docNodesResult.data.jcr && docNodesResult.data.jcr.result ? docNodesResult.data.jcr.result.docNodes : [];

    // We now filter the nodes to only allow the ones that are in a specific path.
    docNodes = docNodes.filter(docNode => {
        const moduleRegex = /\/modules\/.*\/.*\/templates\/contents\/jahia-dashboard\/.*/g;
        if (docNode.path.match(moduleRegex)) {
            return true;
        }

        const siteRegex = /\/sites\/.*\/contents\/jahia-dashboard\/.*/g;
        if (docNode.path.match(siteRegex)) {
            return true;
        }

        return false;
    });

    // Now let's check which permissions we need to validate
    let allRequiredPermissions = [];
    for (const docNode of docNodes) {
        if (docNode.requiredPermissions && docNode.requiredPermissions.values) {
            allRequiredPermissions = allRequiredPermissions.concat(docNode.requiredPermissions.values);
        }
    }

    // Let's ask the server to check the permissions for the current user
    const nodeChecksResult = useNodeInfo({path: '/', language: locale}, {getPermissions: allRequiredPermissions}, {skip: allRequiredPermissions.length === 0});

    if (docNodesResult.error) {
        const message = t(
            'jahia-dashboard:jahia-dashboard.error.queryingContent',
            {details: docNodesResult.error.message ? docNodesResult.error.message : ''}
        );
        return <>{message}</>;
    }

    if (nodeChecksResult.error) {
        const message = t(
            'jahia-dashboard:jahia-dashboard.error.queryingContent',
            {details: nodeChecksResult.error.message ? nodeChecksResult.error.message : ''}
        );
        return <>{message}</>;
    }

    if (docNodesResult.loading || nodeChecksResult.loading) {
        return <ProgressOverlay/>;
    }

    const userPermissions = {};
    for (const requiredPermissionName of allRequiredPermissions) {
        userPermissions[requiredPermissionName] = nodeChecksResult.node[requiredPermissionName];
    }

    // Now let's filter the nodes that don't match the users permissions, required modules and operating mode
    docNodes = docNodes.filter(docNode => {
        if (docNode.requiredPermissions !== null && docNode.requiredPermissions.values !== null) {
            for (const requiredPermission of docNode.requiredPermissions.values) {
                if (!userPermissions[requiredPermission]) {
                    console.log('User does not have permission ' + requiredPermission + ' for card');
                    return false;
                }
            }
        }

        if (docNode.requiredModules !== null && docNode.requiredModules.values !== null) {
            for (const requiredModule of docNode.requiredModules.values) {
                if (!availableModules.includes(requiredModule)) {
                    return false;
                }
            }

            return true;
        }

        if (docNode.operatingModes !== null && docNode.operatingModes.values !== null) {
            return docNode.operatingModes.values.includes(operatingMode);
        }

        return true;
    });

    return (
        <Suspense fallback="loading ...">
            <SectionHeader
                title="Documentation"
                moreUrl="https://academy.jahia.com/documentation"
                moreLabel={t('jahia-dashboard:jahia-dashboard.documentation.goToAcademy')}
            />
            <Typography>{t('jahia-dashboard:jahia-dashboard.documentation.intro')}</Typography>
            <Spacing height="small"/>
            <div className={classnames('flexRow')}>
                {docNodes.map(docNode => {
                    const trainingUrl = docNode.trainingPage && docNode.trainingPage.refNode && docNode.trainingPage.refNode.path ?
                        '/page-composer/default/' + locale + docNode.trainingPage.refNode.path + '.html' :
                        null;
                    return (
                        <DocCard
                            key={docNode.uuid}
                            headerText={docNode.title ? docNode.title.value : null}
                            estimatedReadingTime={docNode.estimatedReadingTime ? t('jahia-dashboard:jahia-dashboard.documentation.estimatedReadingTime', {estimatedReadingTime: docNode.estimatedReadingTime.longValue}) : null}
                            tags={docNode.tags ? docNode.tags.values : []}
                            infoText={docNode.description ? docNode.description.value : null}
                            academyUrl={docNode.academyUrl ? docNode.academyUrl.value : null}
                            academyLabel={t('jahia-dashboard:jahia-dashboard.documentation.academy')}
                            trainingUrl={trainingUrl}
                            trainingLabel={t('jahia-dashboard:jahia-dashboard.documentation.training')}
                        />
                    );
                })}
            </div>
        </Suspense>
    );
};

Documentation.propTypes = {
    locale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    operatingMode: PropTypes.string.isRequired,
    availableModules: PropTypes.array.isRequired
};

export default Documentation;
