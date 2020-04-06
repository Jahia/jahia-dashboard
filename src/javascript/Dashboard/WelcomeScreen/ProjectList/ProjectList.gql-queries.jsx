import gql from 'graphql-tag';
import {PredefinedFragments} from '@jahia/data-helper';

const SiteNodesQuery = gql`
    query SiteNodes($query: String!, $displayLanguage:String!) {
        jcr {
            result:nodesByQuery(query: $query) {
                siteNodes:nodes {
                    name
                    hasPermission(permissionName: "editModeAccess")
                    displayName(language: $displayLanguage)
                    site {
                        description
                        ...NodeCacheRequiredFields
                    }
                    children(typesFilter: {multi: ALL, types: ["jnt:page"]}) {
                        nodes {
                            name
                            path
                            isHomePage: property(name: "j:isHomePage") {
                                value
                            }
                            ...NodeCacheRequiredFields
                        }
                    }
                    lastModified: property(name: "jcr:lastModified") {
                        longValue
                    }
                    ...NodeCacheRequiredFields
                }
            }
        }
    }
    ${PredefinedFragments.nodeCacheRequiredFields.gql}
`;

export {SiteNodesQuery};
