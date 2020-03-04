import React, {Suspense} from 'react';
import {IframeRenderer} from '@jahia/ui-extender';
import PropTypes from 'prop-types';

const RenderDashboardRoute = props => {
    // If render fcn is defined use it as it implies that the user has something custom in mind
    if (props.render) {
        return props.render();
    }

    if (!props.pathChunk || !props.user || !props.locale) {
        return null;
    }

    const url = `${props.contextPath}/cms/dashboardframe/default/${props.locale}${props.user}.${props.pathChunk}.html?redirect=false`;

    return (
        <Suspense fallback="loading ...">
            <IframeRenderer url={url}/>
        </Suspense>
    );
};

RenderDashboardRoute.propTypes = {
    pathChunk: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
    contextPath: PropTypes.string.isRequired,
    render: PropTypes.func
};

export default RenderDashboardRoute;
