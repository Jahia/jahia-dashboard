import React from 'react';
import {registry} from '@jahia/ui-extender';
import {useHistory} from 'react-router-dom';
import {Accordion, AccordionItem, LayoutModule, PrimaryNavItem, SecondaryNav, TreeView, Typography} from '@jahia/moonstone';
import {registerRoute} from './Dashboard.route';
import {useTranslation} from 'react-i18next';
import RenderIframe from './iFrame/RenderIframe';
import {Route, Switch} from 'react-router';
import Bars from '@jahia/moonstone/dist/icons/Bar';
import Home from '@jahia/moonstone/dist/icons/Home';
import Work from '@jahia/moonstone/dist/icons/Work';
import File from '@jahia/moonstone/dist/icons/File';
import Task from '@jahia/moonstone/dist/icons/Task';
import SiteWeb from '@jahia/moonstone/dist/icons/SiteWeb';
import FileContent from '@jahia/moonstone/dist/icons/FileContent';

let endPath = `/${window.contextJsParameters.locale}${window.contextJsParameters.user.path}.projects`;
const ROUTE = '/cms/dashboard/default';

const DashboardGroup = () => {
    const history = useHistory();
    const {t} = useTranslation('jahia-dashboard');
    return (
        <PrimaryNavItem key={ROUTE}
                        isSelected={history.location.pathname.startsWith(ROUTE)}
                        label={t('jahia-dashboard.label')}
                        icon={<Bars/>}
                        onClick={() => {
                            history.push(`${ROUTE}${endPath}`);
                        }}/>
    );
};

const getRoutes = (contextPath, user, locale) => {
    return [
        {
            key: 'files',
            pathChunk: 'files',
            locale: locale,
            user: user,
            contextPath: contextPath,
            path: `${ROUTE}/${locale}${user}.files`
        },
        {
            key: 'projects',
            pathChunk: 'projects',
            locale: locale,
            user: user,
            contextPath: contextPath,
            path: `${ROUTE}/${locale}${user}.projects`
        },
        {
            key: 'tasks',
            pathChunk: 'tasks',
            locale: locale,
            user: user,
            contextPath: contextPath,
            path: `${ROUTE}/${locale}${user}.tasks`
        },
        {
            key: 'pages',
            pathChunk: 'pages',
            locale: locale,
            user: user,
            contextPath: contextPath,
            path: `${ROUTE}/${locale}${user}.pages`
        },
        {
            key: 'welcome',
            path: ROUTE,
            render: () => 'Welcome to dashboard'
        }
    ];
};

const getPageId = (pages, url) => {
    const split = url.split('.');

    if (split.length !== 2) {
        return 'welcome';
    }

    const page = pages.find(p => p.id === split[1]);

    if (page === undefined) {
        return 'welcome';
    }

    return page.id;
};

const DashBoard = () => {
    const history = useHistory();
    const {t} = useTranslation('jahia-dashboard');
    const itemId = 'myWorkspace';

    const localeAndUser = `${window.contextJsParameters.locale}${window.contextJsParameters.user.path}`;
    const pages = [
        {
            id: 'welcome',
            label: t('jahia-dashboard.workspace.welcome'),
            iconStart: <Home/>,
            hasChildren: false,
            route: ROUTE
        },
        {
            id: 'files',
            label: t('jahia-dashboard.workspace.files'),
            iconStart: <File/>,
            hasChildren: false,
            route: `${ROUTE}/${localeAndUser}.files`
        },
        {
            id: 'projects',
            label: t('jahia-dashboard.workspace.projects'),
            iconStart: <SiteWeb/>,
            hasChildren: false,
            route: `${ROUTE}/${localeAndUser}.projects`
        },
        {
            id: 'pages',
            label: t('jahia-dashboard.workspace.pages'),
            iconStart: <FileContent/>,
            hasChildren: false,
            route: `${ROUTE}/${localeAndUser}.pages`
        },
        {
            id: 'tasks',
            label: t('jahia-dashboard.workspace.tasks'),
            iconStart: <Task/>,
            hasChildren: false,
            route: `${ROUTE}/${localeAndUser}.tasks`
        }
    ];

    const routes = getRoutes(window.contextJsParameters.contextPath, window.contextJsParameters.user.path, window.contextJsParameters.locale);
    const selectedPage = getPageId(pages, history.location.pathname);

    return (
        <LayoutModule
            navigation={
                <SecondaryNav header={<Typography variant="section">{t('jahia-dashboard.label')}</Typography>}>
                    <Accordion openedItem={itemId}>
                        <AccordionItem id={itemId} label={t('jahia-dashboard.workspace.label')} icon={<Work/>}>
                            <TreeView isReversed
                                      data={pages}
                                      selectedItems={[selectedPage]}
                                      onClickItem={item => history.push(item.route)}/>
                        </AccordionItem>
                    </Accordion>
                </SecondaryNav>
            }
            content={
                <Switch>
                    {routes.map(r =>
                        <Route key={r.key} path={r.path} render={() => <RenderIframe {...r}/>}/>
                    )}
                </Switch>
            }
        />
    );
};

export const registerDashboard = () => {
    registerRoute(<DashBoard/>);
    registry.add('primary-nav-item', 'dashboardGroupItem', {
        targets: ['nav-root-top:1'],
        render: () => <DashboardGroup/>
    });
};

