import gql from 'graphql-tag';

const DashboardQuery = gql`
    query WelcomeScreen {
        dashboard {
            installationMode
            operatingMode
            myModules {
                id
                name
                description
                version
            }
        }
    }
`;

const PermissionsQuery = gql`
    query WelcomeScreenPermissions {
        jcr {
            rootNode: nodeByPath(path: "/") {
                studioModeAccess: hasPermission(permissionName: "studioModeAccess")
                adminVirtualSites: hasPermission(permissionName: "adminVirtualSites")
            }
        }
    }
`;

export {DashboardQuery, PermissionsQuery};
