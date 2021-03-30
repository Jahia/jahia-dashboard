import gql from 'graphql-tag';
import {PredefinedFragments} from '@jahia/data-helper';

const WelcomeScreenWithPermissions = gql`
    query WelcomeScreenWithPermissions {
        dashboard {
            toolsAccess
            modules {
                id
                name
                description
                version
                inDevelopment
            }
        }
        jcr {
            rootNode: nodeByPath(path: "/") {
                studioModeAccess: hasPermission(permissionName: "studioModeAccess")
                adminVirtualSites: hasPermission(permissionName: "adminVirtualSites")
                ...NodeCacheRequiredFields
            }
        }
    }
    ${PredefinedFragments.nodeCacheRequiredFields.gql}
`;

export {WelcomeScreenWithPermissions};
