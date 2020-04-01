import React, {Suspense} from 'react';
import {Separator} from '@jahia/moonstone';
import WelcomeIntro from './WelcomeIntro';
import ProjectList from './ProjectList';
import ModuleList from './ModuleList';
import DevResources from './DevResources';
import Documentation from './Documentation';
import classnames from 'clsx';
import styles from './WelcomeScreen.scss';
import {useQuery} from '@apollo/react-hooks';
import {WelcomeScreenQuery} from './WelcomeScreen.gql-queries';
import {ProgressOverlay} from '@jahia/react-material';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const WelcomeScreen = () => {
    const {t} = useTranslation('jahia-dashboard');
    const locale = useSelector(state => state.uilang);
    const {data, error, loading} = useQuery(WelcomeScreenQuery, {
        variables: {
        }
    });

    if (error) {
        const message = t(
            'jahia-dashboard:label.jahiaDashBoard.error.queryingContent',
            {details: error.message ? error.message : ''}
        );
        return <>{message}</>;
    }

    if (loading) {
        return <ProgressOverlay/>;
    }

    const myModules = data.dashboard.myModules;
    const operatingMode = data.dashboard.operatingMode;
    const installationMode = data.dashboard.installationMode;

    console.log('operatingMode=' + operatingMode + ' installationMode=' + installationMode);

    return (
        <Suspense fallback="loading ...">
            <div className={classnames(styles.root)}>
                <WelcomeIntro locale={locale}/>
                <Separator/>
                <ProjectList locale={locale} t={t}/>
                <Separator/>
                <ModuleList locale={locale} modules={myModules}/>
                <Separator/>
                <DevResources locale={locale}/>
                <Separator/>
                <Documentation locale={locale}/>
            </div>
        </Suspense>
    );
};

export default WelcomeScreen;
