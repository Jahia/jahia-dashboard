import React from 'react';
import {registry} from '@jahia/ui-extender';
import {useHistory} from 'react-router-dom';
import {Accordion, AccordionItem, LayoutModule, SecondaryNav, SecondaryNavHeader, TreeView} from '@jahia/moonstone';
import {useTranslation} from 'react-i18next';
import {Route, Switch} from 'react-router';
import Work from '@jahia/moonstone/dist/icons/Work';
import {useAdminRouteTreeStructure} from '@jahia/ui-extender';
import PropTypes from 'prop-types';

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
    const {tree, routes, defaultOpenedItems} = useAdminRouteTreeStructure('dashboard', selectedPage);

    const data = tree
        .map(route => ({
            id: route.key,
            label: t(route.label),
            isSelectable: route.isSelectable,
            iconStart: route.icon,
            route: route.route
        }))
        .getData();

    const filteredRoutes = routes && routes
        .filter(route => route.isSelectable && route.render);

    return (
        <LayoutModule
            navigation={
                <SecondaryNav header={<SecondaryNavHeader>{t('jahia-dashboard.label')}</SecondaryNavHeader>}>
                    <Accordion openedItem={itemId}>
                        <AccordionItem id={itemId} label={t('jahia-dashboard.workspace.label')} icon={<Work/>}>
                            <TreeView isReversed
                                      data={data}
                                      selectedItems={[selectedPage]}
                                      defaultOpenedItems={defaultOpenedItems}
                                      onClickItem={app => app.isSelectable ? history.push(app.route || ('/dashboard/' + app.id)) : false}/>
                        </AccordionItem>
                    </Accordion>
                </SecondaryNav>
            }
            content={
                <Switch>
                    {filteredRoutes.map(r =>
                        <Route key={r.key} exact strict path={r.route || '/dashboard/' + r.key} render={props => r.render(props)}/>
                    )}
                </Switch>
            }
        />
    );
};

DashBoard.propTypes = {
    match: PropTypes.object.isRequired
};

