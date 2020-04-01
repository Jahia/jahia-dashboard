import React, {Suspense} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {DocumentationNodesQuery} from './Documentation.gql-queries';
import {ProgressOverlay} from '@jahia/react-material';
import PropTypes from 'prop-types';
import {Typography} from '@jahia/moonstone';

const Documentation = props => {
    const {t} = props;
    const {data, error, loading} = useQuery(DocumentationNodesQuery, {
        variables: {
            query: 'select * from [jnt:dashboardDoc] where isdescendantnode(\'/modules\') order by [lastEditDate]',
            displayLanguage: props.locale
        }
    });

    if (error) {
        const message = t(
            'jahia-dashboard:label.jahiaDashBoard.error.queryingContent',
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
            <Typography variant="title">Documentation</Typography>
            <ul>
                {docNodes.map(docNode => {
                    return (
                        <li
                            key={docNode.uuid}
                        >
                            {docNode.title.value} : {docNode.description.value}
                            {docNode.tags ? docNode.tags.values.map(tag => {
                                return (
                                    <span key={tag}>{tag}</span>
                                );
                            }) : ''}
                            <a href={docNode.academyUrl ? docNode.academyUrl.value : ''}>Academy</a>
                            <a href={docNode.trainingUrl ? docNode.trainingUrl.value : ''}>Training</a>
                        </li>
                    );
                })}
            </ul>
        </Suspense>
    );
};

Documentation.propTypes = {
    locale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
};

export default Documentation;
