import React from 'react';
import {registry} from '@jahia/ui-extender';
import {RouteWithTitle} from '@jahia/jahia-ui-root';
import {useHistory} from 'react-router-dom';
import {Accordion, AccordionItem, LayoutModule, SecondaryNav, SecondaryNavHeader, TreeView} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';
import {Switch} from 'react-router';
import Work from '@jahia/moonstone/dist/icons/Work';
import {useAdminRouteTreeStructure} from '@jahia/ui-extender';
import PropTypes from 'prop-types';
import {useNodeInfo} from '@jahia/data-helper';

const getRegistryTarget = function (item, target) {
    const foundTarget = item.targets.find(t => t.id === target || t.id.startsWith(target + '-'));
    return foundTarget.id + ':' + foundTarget.priority;
};

const getPageId = match => {
    let matchByRoute = registry.find({type: 'adminRoute', route: match.url});
    if (matchByRoute.length > 0) {
        return matchByRoute[0].key;
    }

    let param = match.params[0];

    let item = param.substr(1);
    if (registry.get('adminRoute', item)) {
        return item;
    }
};

export const DashBoard = ({match}) => {
    const history = useHistory();
    const {t} = useTranslation('jahia-dashboard');
    const itemId = 'myWorkspace';

    const selectedPage = getPageId(match);
    const {tree, routes, defaultOpenedItems, allPermissions} = useAdminRouteTreeStructure('dashboard', selectedPage);
    const {node} = useNodeInfo({path: '/'}, {
        getPermissions: allPermissions
    });

    const data = tree
        .filter(route => route.requiredPermission === undefined || (node && (node[route.requiredPermission] !== false)))
        .map(route => ({
            id: route.key,
            label: t(route.label),
            isSelectable: route.isSelectable,
            iconStart: route.icon,
            route: route.route,
            treeItemProps: {
                'data-sel-role': route.key,
                'data-registry-key': route.type + ':' + route.key,
                'data-registry-target': getRegistryTarget(route, 'dashboard')
            }
        }))
        .getData();

    const filteredRoutes = routes && routes
        .filter(route => route.isSelectable && route.render);

    return (
        <LayoutModule
            navigation={
                <SecondaryNav header={<SecondaryNavHeader>{t('jahia-dashboard.label')}</SecondaryNavHeader>}>
                    <Accordion isReversed openedItem={itemId}>
                        <AccordionItem id={itemId} label={t('jahia-dashboard.workspace.label')} icon={<Work/>}>
                            <TreeView isReversed
                                      data={data}
                                      selectedItems={[selectedPage]}
                                      defaultOpenedItems={defaultOpenedItems}
                                      onClickItem={
                                          (app, event, toggleNode) => (
                                              app.isSelectable ?
                                                  history.push(app.route || ('/dashboard/' + app.id)) :
                                                  toggleNode(event)
                                          )
                                      }/>
                        </AccordionItem>
                    </Accordion>
                </SecondaryNav>
            }
            content={
                <Switch>
                    {filteredRoutes.map(r =>
                        <RouteWithTitle key={r.key} exact strict routeTitle={`${t('jahia-dashboard.label')} - ${r.label ? t(r.label) : r.key}`} path={r.route || '/dashboard/' + r.key} render={props => r.render(props)}/>
                    )}
                </Switch>
            }
        />
    );
};

DashBoard.propTypes = {
    match: PropTypes.object.isRequired
};

