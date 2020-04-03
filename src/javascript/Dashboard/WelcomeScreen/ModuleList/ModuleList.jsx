import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import classnames from 'clsx';
import SectionTitle from '../SectionTitle';
import parentStyles from '../WelcomeScreen.scss';
import styles from './ModuleList.scss';
import ArrowRight from '@jahia/moonstone/dist/icons/ArrowRight';
import {Typography} from '@jahia/moonstone';

const ModuleList = props => {
    const {t, modules} = props;
    modules.length = Math.min(modules.length, 8);
    return (
        <Suspense fallback="loading ...">
            <div className={classnames(parentStyles.sectionHeading)}>
                <SectionTitle>{t('jahia-dashboard:jahia-dashboard.modules.title')}</SectionTitle>
                <a href={window.contextJsParameters.contextPath + '/cms/studio/default/en/settings.manageModules.html'} className={classnames(parentStyles.seeAllLink)} target="_blank" rel="noopener noreferrer">
                    <div className={classnames('flexRow')}>
                        <span className={classnames(parentStyles.seeAllLinkText)}>{t('jahia-dashboard:jahia-dashboard.seeAll')}</span>
                        <ArrowRight/>
                    </div>
                </a>
            </div>
            <div className={classnames('flexRow')}>
                {modules.length === 0 ? <Typography className={classnames(styles.noModulesText)}>{t('jahia-dashboard:jahia-dashboard.modules.noModules')}</Typography> : modules.map(module => {
                    const moduleUrl = window.contextJsParameters.contextPath + '/cms/studio/default/en/modules/' + module.id + '.html';

                    const onClick = () => {
                        window.open(moduleUrl, '_blank');
                    };

                    return (
                        <Card key={module.id} headerText={module.name} infoText={module.description} onClick={() => onClick()}/>
                    );
                })}
            </div>
        </Suspense>
    );
};

ModuleList.propTypes = {
    modules: PropTypes.array.isRequired,
    t: PropTypes.func.isRequired
};

export default ModuleList;
