import React, {Suspense} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {DocumentationNodesQuery} from './Documentation.gql-queries';
import {ProgressOverlay} from '@jahia/react-material';
import PropTypes from 'prop-types';
import DocCard from '../DocCard';
import classnames from 'clsx';
import SectionTitle from '../SectionTitle';
import {Typography} from '@jahia/moonstone';
import styles from '../WelcomeScreen.scss';
import ArrowRight from '@jahia/moonstone/dist/icons/ArrowRight';

const Documentation = props => {
    const {t, locale} = props;
    const {data, error, loading} = useQuery(DocumentationNodesQuery, {
        variables: {
            query: 'select * from [jnt:dashboardDoc] where isdescendantnode(\'/modules\') order by [lastEditDate]',
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
    console.log(docNodes);

    return (
        <Suspense fallback="loading ...">
            <div className={classnames(styles.sectionHeading)}>
                <SectionTitle>Documentation</SectionTitle>
                <a href="https://academy.jahia.com/documentation" className={classnames(styles.seeAllLink)} target="_blank" rel="noopener noreferrer">
                    <div className={classnames('flexRow')}>
                        <span className={classnames(styles.seeAllLinkText)}>{t('jahia-dashboard:jahia-dashboard.documentation.goToAcademy')}</span>
                        <ArrowRight/>
                    </div>
                </a>
            </div>
            <Typography>{t('jahia-dashboard:jahia-dashboard.documentation.intro')}</Typography>
            <div className={classnames('flexRow')}>
                {docNodes.map(docNode => {
                    return (
                        <DocCard
                            key={docNode.uuid}
                            headerText={docNode.title.value}
                            estimatedReadingTime={docNode.estimatedReadingTime ? docNode.estimatedReadingTime.longValue : null}
                            tags={docNode.tags ? docNode.tags.values : []}
                            infoText={docNode.description ? docNode.description.value : null}
                            academyUrl={docNode.academyUrl ? docNode.academyUrl.value : null}
                            trainingUrl={docNode.trainingUrl ? docNode.trainingUrl.value : null}
                        />
                    );
                })}
            </div>
        </Suspense>
    );
};

Documentation.propTypes = {
    locale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
};

export default Documentation;
