import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import classnames from 'clsx';
import SectionTitle from '../SectionTitle';

const ModuleList = props => {
    const {t, modules} = props;
    return (
        <Suspense fallback="loading ...">
            <SectionTitle>{t('jahia-dashboard:jahia-dashboard.modules.title')}</SectionTitle>
            <a href={window.contextJsParameters.contextPath + '/cms/studio/default/en/settings.manageModules.html'} target="_blank" rel="noopener noreferrer">{t('jahia-dashboard:jahia-dashboard.seeAll')}</a>
            <div className={classnames('flexRow')}>
                {modules.map(module => {
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
