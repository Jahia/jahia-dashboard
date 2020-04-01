import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import {SiteNodesQuery} from './ProjectList.gql-queries';
import {ProgressOverlay} from '@jahia/react-material';
import {Typography} from '@jahia/moonstone';
import Card from '../Card';
import classnames from 'clsx';

const ProjectList = props => {
    const {t} = props;
    const {data, error, loading} = useQuery(SiteNodesQuery, {
        variables: {
            query: 'select * from [jnt:virtualsite] where ischildnode(\'/sites\')',
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

    return (
        <Suspense fallback="loading ...">
            <Typography variant="title">My web projects</Typography>
            <div className={classnames('flexRow')}>
                {siteNodes.map(siteNode => {
                return (
                    <Card
                        key={siteNode.uuid}
                        headerText={siteNode.displayName}
                        infoText={siteNode.description ? siteNode.description : ''}
                    />
                );
            })}
            </div>
        </Suspense>
    );
};

ProjectList.propTypes = {
    locale: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired
};

export default ProjectList;
