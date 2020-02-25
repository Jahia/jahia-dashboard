import React, {Suspense} from 'react';
import DashboardIframe from '../DashboardIframe';

const RenderIframe = props => {
    // If render fcn is defined use it as it implies that the user has something custom in mind
    if (props.render) {
        return props.render();
    }

    if (!props.pathChunk || !props.user || !props.locale) {
        return null;
    }

    return (
        <Suspense fallback="loading ...">
            <DashboardIframe pathChunk={props.pathChunk} user={props.user} locale={props.locale}/>
        </Suspense>
    );
};

export default RenderIframe;
