import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import styles from './Card.scss';
import {Typography} from '@jahia/moonstone';
import ArrowRightIcon from '@jahia/moonstone/dist/icons/ArrowRight';
import OpenInNewIcon from '@jahia/moonstone/dist/icons/OpenInNew';

const Card = ({
    headerText,
    icon,
    infoText,
    isSelected,
    onDoubleClick,
    onClick
}) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <article
            data-sel-role-card={headerText}
            className={classnames(styles.cardContainer, isSelected ? 'selected' : '')}
            aria-checked={isSelected}
            onDoubleClick={onDoubleClick}
            onClick={onClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className={classnames(styles.textContainer)}>
                <div className={classnames(styles.cardLinkHeading)}>
                    <Typography variant="heading" component="h3">
                        {icon && <span className={classnames(styles.icon)}>{icon}</span>}
                        {headerText}
                    </Typography>
                    {isHovering ? <OpenInNewIcon/> : <ArrowRightIcon/>}
                </div>
                <Typography>
                    {infoText}
                </Typography>
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
    onClick: PropTypes.func
};

export default Card;
