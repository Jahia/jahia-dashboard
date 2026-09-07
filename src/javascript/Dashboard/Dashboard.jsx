import React from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import HomeScreen from './HomeScreen';
import Constants from './Dashboard.constants';

/**
 * Where the entries that used to live under /dashboard went, so anyone holding an old link lands
 * on the same page at its new address rather than on an empty screen.
 *
 * "files" and "pages" are absent on purpose: those pages no longer exist anywhere, so there is
 * nothing to send them to and the home screen is the honest answer.
 */
const MOVED_TO_PROFILE = ['projects', 'tasks', 'personal-api-tokens'];

/**
 * The dashboard is the home screen, full width.
 *
 * It used to be a LayoutModule wrapping a secondary navigation whose only group was a single-item
 * accordion labelled "My workspace" -- a fold that never had anything to hide, around a list of
 * pages that were about the reader rather than about this screen. Those moved to the profile icon
 * (see Dashboard.adminRoute.jsx), which leaves this screen nothing to navigate between.
 */
export const DashBoard = ({match}) => {
    // Whatever followed /dashboard, its leading slash included.
    const sub = match.params[0] ? match.params[0].substr(1) : '';

    if (MOVED_TO_PROFILE.includes(sub)) {
        return <Redirect to={`/profile/${sub}`}/>;
    }

    if (sub !== '') {
        return <Redirect to={Constants.ROUTE}/>;
    }

    return <HomeScreen/>;
};

DashBoard.propTypes = {
    match: PropTypes.object.isRequired
};
