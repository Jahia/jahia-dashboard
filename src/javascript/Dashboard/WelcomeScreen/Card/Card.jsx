import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import styles from './Card.scss';

import {Typography} from '@jahia/moonstone';

const Card = ({
    headerText,
    infoText,
    isSelected,
    onDoubleClick,
    onClick
}) => {
    return (
        <article
            data-sel-role-card={headerText}
            className={classnames(styles.container, isSelected ? 'selected' : '')}
            aria-checked={isSelected}
            onDoubleClick={onDoubleClick}
            onClick={onClick}
        >
            <div className={classnames(styles.infoContainer)}>
                <div className={classnames(styles.textContainer)}>
                    <Typography
                        component="h3"
                        variant="zeta"
                        color="alpha"
                        title={headerText}
                    >
                        {headerText}
                    </Typography>
                    <Typography variant="omega" color="gamma" title={infoText}>
                        {infoText}
                    </Typography>
                </div>
            </div>
        </article>
    );
};

Card.defaultProps = {
    headerText: '',
    infoText: '',
    isSelected: false,
    onDoubleClick: () => {
    },
    onClick: () => {
    }
};

Card.propTypes = {
    headerText: PropTypes.string,
    infoText: PropTypes.string,
    isSelected: PropTypes.bool,
    onDoubleClick: PropTypes.func,
    onClick: PropTypes.func
};

export default Card;
