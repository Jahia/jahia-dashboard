import React, {Suspense} from 'react';
import {Typography} from '@jahia/moonstone';
import SectionTitle from '../SectionTitle';
import PropTypes from 'prop-types';

const WelcomeIntro = props => {
    const user = window.contextJsParameters.user;
    const {isDevelopment, t} = props;

    let displayName = user.username;
    if (user.fullname) {
        displayName = user.fullname;
    }

    let message = t('jahia-dashboard:jahia-dashboard.intro.defaultMessage');
    if (isDevelopment) {
        message = t('jahia-dashboard:jahia-dashboard.intro.developmentMessage');
    }

    return (
        <Suspense fallback="loading ...">
            <SectionTitle>{t('jahia-dashboard:jahia-dashboard.intro.title', {displayName: displayName})}</SectionTitle>
            <Typography>{message}</Typography>
        </Suspense>
    );
};

WelcomeIntro.propTypes = {
    isDevelopment: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
};

export default WelcomeIntro;
