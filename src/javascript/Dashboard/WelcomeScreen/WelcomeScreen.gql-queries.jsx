import gql from 'graphql-tag';

const WelcomeScreenQuery = gql`
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

export {WelcomeScreenQuery};
