import gql from 'graphql-tag';

const KeyList = gql`
    query KeyList {
        accessKeys {
            accessId
            paths
            nodeTypes
            ips
            apis
            referrers
            type
            active
            userKey
            workspaces
            superkey
        }
    }`;

export {KeyList};
