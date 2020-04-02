import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import styles from './Card.scss';
import {Typography} from '@jahia/moonstone';
import ArrowRight from '@jahia/moonstone/dist/icons/ArrowRight';

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
                    <div className={classnames(styles.cardLinkHeading)}>
                        <Typography variant="heading">
                            {headerText}
                        </Typography>
                        <ArrowRight/>
                    </div>
                    <Typography>
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
