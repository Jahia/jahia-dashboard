import {createActions, handleActions} from 'redux-actions';
import {registry} from '@jahia/ui-extender';
import {combineReducers} from 'redux';

export const {dashSetPath} = createActions('DASH_SET_PATH');

const extractParamsFromUrl = pathname => {
    if (pathname.startsWith('/dashboard')) {

        let path = decodeURIComponent(pathname);
        return {path};
    }

    return {path: ''};
};

export const dashboardRedux = () => {
    const jahiaCtx = window.contextJsParameters;
    const pathName = window.location.pathname.substring((jahiaCtx.contextPath + jahiaCtx.urlbase).length);
    const currentValueFromUrl = extractParamsFromUrl(pathName);
    const pathReducer = handleActions({
        [dashSetPath]: (state, action) => action.payload,
        '@@router/LOCATION_CHANGE': (state, action) => action.payload.location.pathname.startsWith('/dashboard') ? extractParamsFromUrl(action.payload.location.pathname).path : state
    }, currentValueFromUrl.path);

    registry.add('redux-reducer', 'dashboard', {
        targets: ['root'],
        reducer: combineReducers({path: pathReducer})
    });
};
