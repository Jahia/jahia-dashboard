import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import styles from './DocCard.scss';
import {Typography, Chip, Button} from '@jahia/moonstone';

const DocCard = ({
    headerText,
    estimatedReadingTime,
    tags,
    infoText,
    academyUrl,
    trainingUrl,
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
                    <Typography variant="heading">
                        {headerText}
                    </Typography>
                    {estimatedReadingTime &&
                    <Typography variant="heading">
                        {estimatedReadingTime}
                    </Typography>}
                    {tags ? tags.map(tag => {
                        return (
                            <Chip key={tag} label={tag}/>
                        );
                    }) : ''}
                    <Typography>
                        {infoText}
                    </Typography>
                    { academyUrl &&
                        <Button label="Academy"/>}
                    { trainingUrl &&
                    <Button label="Academy"/>}
                </div>
            </div>
        </article>
    );
};

DocCard.defaultProps = {
    headerText: '',
    estimatedReadingTime: null,
    tags: [],
    infoText: '',
    academyUrl: null,
    trainingUrl: null,
    isSelected: false,
    onDoubleClick: () => {
    },
    onClick: () => {
    }
};

DocCard.propTypes = {
    headerText: PropTypes.string,
    estimatedReadingTime: PropTypes.number,
    tags: PropTypes.array,
    infoText: PropTypes.string,
    academyUrl: PropTypes.string,
    trainingUrl: PropTypes.string,
    isSelected: PropTypes.bool,
    onDoubleClick: PropTypes.func,
    onClick: PropTypes.func
};

export default DocCard;
