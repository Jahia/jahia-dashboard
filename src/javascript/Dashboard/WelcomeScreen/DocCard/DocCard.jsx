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
    academyLabel,
    trainingUrl,
    trainingLabel
}) => {
    const onClickAcademy = () => {
        window.open(academyUrl, '_blank');
    };

    const onClickTraining = () => {
        window.location.assign(window.contextJsParameters + trainingUrl);
    };

    return (
        <article
            data-sel-role-card={headerText}
            className={classnames(styles.container)}
        >
            <div className={classnames(styles.infoContainer)}>
                <div className={classnames(styles.textContainer)}>
                    <Typography variant="heading">
                        {headerText}
                    </Typography>
                    {estimatedReadingTime &&
                    <Typography variant="subheading" weight="light">
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
                    <div className={classnames(styles.buttonContainer)}>
                        { academyUrl &&
                        <Button className={classnames(styles.button)} size="big" color={trainingUrl ? 'default' : 'accent'} label={academyLabel} onClick={() => onClickAcademy()}/>}
                        { trainingUrl &&
                        <Button className={classnames(styles.button)} size="big" label={trainingLabel} color="accent" onClick={() => onClickTraining()}/>}
                    </div>
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
    academyLabel: 'Academy',
    trainingUrl: null,
    trainingLabel: 'Training'
};

DocCard.propTypes = {
    headerText: PropTypes.string,
    estimatedReadingTime: PropTypes.number,
    tags: PropTypes.array,
    infoText: PropTypes.string,
    academyUrl: PropTypes.string,
    academyLabel: PropTypes.string,
    trainingUrl: PropTypes.string,
    trainingLabel: PropTypes.string
};

export default DocCard;
