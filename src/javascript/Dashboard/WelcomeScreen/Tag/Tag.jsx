import React from 'react';
import classnames from 'clsx';
import PropTypes from 'prop-types';
import styles from './Tag.scss';
import {Chip} from '@jahia/moonstone';
import FeatherIcon from '@jahia/moonstone/dist/icons/Feather';
import ExploreIcon from '@jahia/moonstone/dist/icons/Explore';

const tags = {
    jcontent: {icon: <FeatherIcon/>},
    jexperience: {icon: <ExploreIcon/>}
};

const Tag = ({name}) => (
    <Chip
        label={name}
        className={classnames(styles.tag)}
        icon={tags[name.toLowerCase()]}
        // Color="accent_dark"
    />
);

Tag.propTypes = {
    name: PropTypes.string.isRequired
};

export default Tag;
