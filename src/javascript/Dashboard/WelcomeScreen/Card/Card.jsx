import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import styles from './Card.scss';
import {Typography} from '@jahia/moonstone';

const Card = ({
    isCreateNewCard,
    headerText,
    icon,
    hoverIcon,
    infoText,
    isSelected,
    onDoubleClick,
    onClick
}) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <article
            data-sel-role-card={headerText}
            className={classnames(styles.cardContainer, isSelected ? styles.selected : '', isCreateNewCard ? styles.createNew : '')}
            aria-checked={isSelected}
            onDoubleClick={onDoubleClick}
            onClick={onClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className={classnames(styles.textContainer)}>
                <div className={classnames(styles.cardHeader)}>
                    <Typography
                        variant="subheading"
                        weight="bold"
                        component="h3"
                        className={classnames(styles.cardHeading)}
                    >
                        {icon && <span className={classnames(styles.icon)}>{icon}</span>}
                        {headerText}
                    </Typography>
                    {isHovering && hoverIcon}
                </div>
                <Typography>
                    {infoText}
                </Typography>
            </div>
        </article>
    );
};

Card.defaultProps = {
    isCreateNewCard: false,
    headerText: '',
    infoText: '',
    isSelected: false,
    onDoubleClick: () => {
    },
    onClick: () => {
    }
};

Card.propTypes = {
    isCreateNewCard: PropTypes.bool,
    headerText: PropTypes.string,
    icon: PropTypes.element,
    hoverIcon: PropTypes.element,
    infoText: PropTypes.string,
    isSelected: PropTypes.bool,
    onDoubleClick: PropTypes.func,
    onClick: PropTypes.func
};

export default Card;
