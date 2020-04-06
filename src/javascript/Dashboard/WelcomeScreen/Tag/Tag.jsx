import React from 'react';
import classnames from 'clsx';
import PropTypes from 'prop-types';
import styles from './Tag.scss';
import {Chip} from '@jahia/moonstone';
import FeatherIcon from '@jahia/moonstone/dist/icons/Feather';
import ExploreIcon from '@jahia/moonstone/dist/icons/Explore';

const tags = {
    jcontent: {icon: <FeatherIcon/>, color: 'accent'},
    jexperience: {icon: <ExploreIcon/>, color: 'success'},
    developer: {icon: null, color: ''},
    administrator: {icon: null, color: ''}
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
