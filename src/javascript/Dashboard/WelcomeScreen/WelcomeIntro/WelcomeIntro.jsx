import React, {Suspense} from 'react';
import {Typography} from '@jahia/moonstone';
import PropTypes from 'prop-types';
import SectionHeader from '../SectionHeader';

const WelcomeIntro = props => {
    const user = window.contextJsParameters.user;
    const {isDevelopment, t} = props;

    let displayName = user.username;
    if (user.firstName && user.firstName.length > 0) {
        displayName = user.firstName;
    }

    let message = t('jahia-dashboard:jahia-dashboard.intro.defaultMessage');
    if (isDevelopment) {
        message = t('jahia-dashboard:jahia-dashboard.intro.developmentMessage');
    }

    return (
        <Suspense fallback="loading ...">
            <SectionHeader title={t('jahia-dashboard:jahia-dashboard.intro.title', {displayName: displayName})}/>
            <Typography>{message}</Typography>
        </Suspense>
    );
};

WelcomeIntro.propTypes = {
    isDevelopment: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired
};

export default WelcomeIntro;
