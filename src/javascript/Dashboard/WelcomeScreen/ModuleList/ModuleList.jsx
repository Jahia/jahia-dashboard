import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import classnames from 'clsx';
import SectionTitle from '../SectionTitle';

const ModuleList = props => {
    const {modules} = props;
    return (
        <Suspense fallback="loading ...">
            <SectionTitle>Modules</SectionTitle>
            <div className={classnames('flexRow')}>
                {modules.map(module => {
                    return (
                        <Card key={module.id} headerText={module.name} infoText={module.description}/>
                    );
                })}
            </div>
        </Suspense>
    );
};

ModuleList.propTypes = {
    modules: PropTypes.array.isRequired
};

export default ModuleList;
