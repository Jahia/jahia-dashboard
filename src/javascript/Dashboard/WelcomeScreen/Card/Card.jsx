import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import styles from './Card.scss';
import {Typography} from '@jahia/moonstone';

const Card = ({
    headerText,
    icon,
    infoText,
    isSelected,
    onDoubleClick,
    onClick,
    linkComponent
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
                        <Typography variant="heading" component="h3">
                            {icon && <span className={classnames(styles.icon)}>{icon}</span>}
                            {headerText}
                        </Typography>
                        <span className={classnames(styles.linkIcon)}>{linkComponent}</span>
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
    icon: PropTypes.element,
    infoText: PropTypes.string,
    isSelected: PropTypes.bool,
    onDoubleClick: PropTypes.func,
    onClick: PropTypes.func,
    linkComponent: PropTypes.element
};

export default Card;
