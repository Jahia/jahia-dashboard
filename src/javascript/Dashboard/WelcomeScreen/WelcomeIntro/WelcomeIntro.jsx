import React, {Suspense} from 'react';
import {Typography} from '@jahia/moonstone';

const WelcomeIntro = () => {
    const user = window.contextJsParameters.user;

    let displayName = user.username;
    if (user.fullname) {
        displayName = user.fullname;
    }

    return (
        <Suspense fallback="loading ...">
            <Typography variant="title">Welcome {displayName} to Jahia 8</Typography>
            <Typography>Find links and resources we think will be useful for you in this page: quick access to the projects and modules you contribute to, as well as links to developer tools, documentation and tutorials</Typography>
        </Suspense>
    );
};

export default WelcomeIntro;
