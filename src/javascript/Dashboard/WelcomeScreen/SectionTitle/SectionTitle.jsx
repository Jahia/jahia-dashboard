import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import {Typography} from '@jahia/moonstone';
import styles from './SectionTitle.scss';

const SectionTitle = ({children}) => {
    return (
        <Typography variant="title" className={classnames(styles.title)}>{children}</Typography>
    );
};

SectionTitle.propTypes = {
    children: PropTypes.node
};

export default SectionTitle;
