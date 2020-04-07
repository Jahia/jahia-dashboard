import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import classnames from 'clsx';
import styles from './ModuleList.scss';
import {Typography} from '@jahia/moonstone';
import SectionHeader from '../SectionHeader';
import OpenInNewIcon from '@jahia/moonstone/dist/icons/OpenInNew';

const ModuleList = props => {
    const {t, modules} = props;
    modules.length = Math.min(modules.length, 8);
    return (
        <Suspense fallback="loading ...">
            <SectionHeader
                title={t('jahia-dashboard:jahia-dashboard.modules.title')}
                moreUrl={window.contextJsParameters.contextPath + '/cms/studio/default/en/settings.manageModules.html'}
                moreLabel={t('jahia-dashboard:jahia-dashboard.seeAll')}
            />
            <div className={classnames('flexRow')}>
                {modules.length === 0 ? <Typography className={classnames(styles.noModulesText)}>{t('jahia-dashboard:jahia-dashboard.modules.noModules')}</Typography> : modules.map(module => {
                    const moduleUrl = window.contextJsParameters.contextPath + '/cms/studio/default/en/modules/' + module.id + '.html';

                    const onClick = () => {
                        window.open(moduleUrl, '_blank');
                    };

                    return (
                        <Card key={module.id} headerText={module.name} infoText={module.description} linkComponent={<OpenInNewIcon/>} onClick={() => onClick()}/>
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
