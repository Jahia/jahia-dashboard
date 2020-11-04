import gql from 'graphql-tag';

const ActivateKey = gql`
    mutation activate($accessId: String!) {
        activateAccessKey(accessId: $accessId)
    }`;

const DeactivateKey = gql`
    mutation deactivate($accessId: String!) {
        deactivateAccessKey(accessId: $accessId)
    }`;

const RemoveAccessKey = gql`
    mutation remove($accessId: String!) {
        removeAccessKey(accessId: $accessId)
    }`;

export {ActivateKey, DeactivateKey, RemoveAccessKey};
