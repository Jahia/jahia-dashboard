import gql from 'graphql-tag';

const ReadPermissionsQuery = gql`
    query ReadPermission($path: String!) {
        jcr {
            nodeByPath(path: $path) {
                hasDefaultPermission: hasPermission(permissionName: "jcr:read_default")
                hasLivePermission: hasPermission(permissionName: "jcr:read_live")
            }
        }
    }
`;

const WritePermissionsQuery = gql`
    query WritePermission($path: String!) {
        jcr {
            nodeByPath(path: $path) {
                hasDefaultPermission: hasPermission(permissionName: "jcr:write_default")
                hasLivePermission: hasPermission(permissionName: "jcr:write_live")
            }
        }
    }
`;

export {ReadPermissionsQuery, WritePermissionsQuery};
