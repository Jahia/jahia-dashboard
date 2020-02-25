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

const endPath = '/projects';
const ROUTE = '/dashboard';

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
            path: `${ROUTE}/files`
        },
        {
            key: 'projects',
            pathChunk: 'projects',
            locale: locale,
            user: user,
            contextPath: contextPath,
            path: `${ROUTE}/projects`
        },
        {
            key: 'tasks',
            pathChunk: 'tasks',
            locale: locale,
            user: user,
            contextPath: contextPath,
            path: `${ROUTE}/tasks`
        },
        {
            key: 'pages',
            pathChunk: 'pages',
            locale: locale,
            user: user,
            contextPath: contextPath,
            path: `${ROUTE}/pages`
        },
        {
            key: 'welcome',
            path: ROUTE,
            render: () => <h2 style={{color: 'white'}}>Welcome to dashboard - missing design</h2>
        }
    ];
};

const getPageId = (pages, url) => {
    const split = url.split('/');

    if (split.length !== 3) {
        return 'welcome';
    }

    const page = pages.find(p => p.id === split[2]);

    if (page === undefined) {
        return 'welcome';
    }

    return page.id;
};

const DashBoard = () => {
    const history = useHistory();
    const {t} = useTranslation('jahia-dashboard');
    const itemId = 'myWorkspace';
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
            route: `${ROUTE}/files`
        },
        {
            id: 'projects',
            label: t('jahia-dashboard.workspace.projects'),
            iconStart: <SiteWeb/>,
            hasChildren: false,
            route: `${ROUTE}/projects`
        },
        {
            id: 'pages',
            label: t('jahia-dashboard.workspace.pages'),
            iconStart: <FileContent/>,
            hasChildren: false,
            route: `${ROUTE}/pages`
        },
        {
            id: 'tasks',
            label: t('jahia-dashboard.workspace.tasks'),
            iconStart: <Task/>,
            hasChildren: false,
            route: `${ROUTE}/tasks`
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

