import React, {Suspense} from 'react';
import {Typography} from '@jahia/moonstone';

const DevResources = () => {
    return (
        <Suspense fallback="loading ...">
            <Typography variant="title">Developer resources</Typography>
        </Suspense>
    );
};

export default DevResources;
