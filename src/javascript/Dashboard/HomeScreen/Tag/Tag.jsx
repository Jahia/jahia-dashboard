import React from 'react';
import classnames from 'clsx';
import PropTypes from 'prop-types';
import styles from './Tag.scss';
import {Chip} from '@jahia/moonstone';
import JContentIcon from '@jahia/moonstone/dist/icons/JContent';
import BarSquareIcon from '@jahia/moonstone/dist/icons/BarSquare';

const tags = {
    jcontent: {icon: <JContentIcon/>, color: 'accent'},
    jexperience: {icon: <BarSquareIcon/>, color: 'reassuring'},
    developer: {icon: null, color: 'warning'},
    administrator: {icon: null, color: 'danger'}
};

const Tag = ({name}) => (
    <Chip
        label={name}
        className={classnames(styles.tag)}
        icon={tags[name.toLowerCase()].icon}
        color={tags[name.toLowerCase()].color}
    />
);

Tag.propTypes = {
    name: PropTypes.string.isRequired
};

export default Tag;
