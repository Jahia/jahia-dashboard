import gql from 'graphql-tag';

const CreateAccessKey = gql`
    mutation CreateAccessKey($type: String!, $apis: [String], $referer: [String], $nodeTypes: [String], $paths: [String], $ips: [String], $workspaces: [String]) {
        createAccessKey(type: $type, apis: $apis, referer: $referer, nodeTypes: $nodeTypes, paths: $paths, ips: $ips, workspaces: $workspaces ) {
            accessId
            key
            active
        }
    }
`;

export {CreateAccessKey};
