import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import styles from './Spacing.scss';

const Spacing = ({height}) => {
    return (
        <div className={classnames(styles[`height_${height}`])}> </div>
    );
};

Spacing.defaultProps = {
    height: 'small'
};

Spacing.propTypes = {
    height: PropTypes.string
};

export default Spacing;
