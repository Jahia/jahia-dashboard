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

const Documentation = props => {
    const {t, locale, operatingMode, availableModules} = props;
    const {data, error, loading} = useQuery(DocumentationNodesQuery, {
        variables: {
            query: 'select * from [jnt:dashboardDoc] where isdescendantnode(\'/modules\') or isdescendantnode(\'/sites\') order by [lastEditDate]',
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

    const docNodes = data && data.jcr && data.jcr.result ? data.jcr.result.docNodes : [];

    let allRequiredPermissions = [];
    for (const docNode of docNodes) {
        if (docNode.requiredPermissions && docNode.requiredPermissions.values) {
            allRequiredPermissions = allRequiredPermissions.concat(docNode.requiredPermissions.values);
        }
    }

    console.log('allRequiredPermissions', allRequiredPermissions);

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
                {docNodes.filter(docNode => {
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
                })
                    .map(docNode => {
                    return (
                        <DocCard
                            key={docNode.uuid}
                            headerText={docNode.title.value}
                            estimatedReadingTime={docNode.estimatedReadingTime ? t('jahia-dashboard:jahia-dashboard.documentation.estimatedReadingTime', {estimatedReadingTime: docNode.estimatedReadingTime.longValue}) : null}
                            tags={docNode.tags ? docNode.tags.values : []}
                            infoText={docNode.description ? docNode.description.value : null}
                            academyUrl={docNode.academyUrl ? docNode.academyUrl.value : null}
                            academyLabel={t('jahia-dashboard:jahia-dashboard.documentation.academy')}
                            trainingUrl={docNode.trainingUrl ? docNode.trainingUrl.value : null}
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
