import React from 'react';
import Iframe from 'react-iframe';
import PropTypes from 'prop-types';

let path = (contextPath, pathChunk, user, locale) => {
    return `${contextPath}/cms/dashboardframe/default/${locale}${user}.${pathChunk}.html?redirect=false`;
};

export const DashboardIframe = ({contextPath, pathChunk, user, locale}) => (
    <Iframe url={path(contextPath, pathChunk, user, locale)} width="100%" height="100%"/>
);

DashboardIframe.propTypes = {
    contextPath: PropTypes.string.isRequired,
    pathChunk: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired
};

export default DashboardIframe;
