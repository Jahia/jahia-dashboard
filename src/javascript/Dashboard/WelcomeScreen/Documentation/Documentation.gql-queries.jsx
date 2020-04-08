import gql from 'graphql-tag';
import {PredefinedFragments} from '@jahia/data-helper';

const DocumentationNodesQuery = gql`
    query DocumentationNodes($query: String!, $displayLanguage:String!) {
        jcr(workspace: LIVE) {
            result:nodesByQuery(query: $query, language: $displayLanguage) {
                docNodes:nodes {
                    name
                    path
                    displayName(language: $displayLanguage)
                    title: property(name: "jcr:title", language: $displayLanguage) {
                        value
                    }
                    description: property(name: "description", language: $displayLanguage) {
                        value
                    }
                    lastEditDate: property(name: "lastEditDate") {
                        value
                    }
                    featured: property(name: "featured") {
                        value
                    }
                    estimatedReadingTime: property(name: "estimatedReadingTime") {
                        longValue
                    }
                    academyUrl: property(name: "academyUrl") {
                        value
                    }
                    trainingPage: property(name: "trainingPage") {
                        refNode {
                            ajaxRenderUrl
                        }
                    }
                    operatingModes: property(name: "operatingModes") {
                        values
                    }
                    requiredPermissions: property(name: "j:requiredPermissionNames") {
                        values
                    }
                    requiredModules: property(name: "requiredModules") {
                        values
                    }
                    tags: property(name: "j:tagList") {
                        values
                    }
                    ...NodeCacheRequiredFields
                }
            }
        }
    }
    ${PredefinedFragments.nodeCacheRequiredFields.gql}
`;

export {DocumentationNodesQuery};
