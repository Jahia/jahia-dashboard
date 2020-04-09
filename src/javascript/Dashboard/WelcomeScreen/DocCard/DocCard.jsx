import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import {useHistory} from 'react-router-dom';
import styles from './DocCard.scss';
import {Typography, Button} from '@jahia/moonstone';
import Tag from '../Tag';
import ClockIcon from '@jahia/moonstone/dist/icons/Clock';
import BookIcon from '@jahia/moonstone/dist/icons/Book';
import SchoolIcon from '@jahia/moonstone/dist/icons/School';

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
    const history = useHistory();
    const onClickAcademy = () => {
        window.open(academyUrl, '_blank');
    };

    const onClickTraining = () => {
        history.push(trainingUrl);
    };

    return (
        <article
            data-sel-role-card={headerText}
            className={classnames(styles.docCardContainer)}
        >
            <div className={classnames(styles.textContainer)}>
                <Typography variant="subheading" weight="bold" component="h3" className={classnames(styles.cardHeading)}>
                    {headerText}
                </Typography>
                {estimatedReadingTime &&
                    <Typography variant="caption">
                        <div className={classnames(styles.readingTime)}>
                            <ClockIcon size="small" className={classnames(styles.clockIcon)}/>
                            <span>{estimatedReadingTime}</span>
                        </div>
                    </Typography>}
                <div>
                    {tags ? tags.map(tag => <Tag key={tag} name={tag}/>) : ''}
                </div>
                <div className={classnames(styles.infoText)}>
                    <Typography>{infoText}</Typography>
                </div>
                <div className={classnames(styles.buttonContainer)}>
                    { academyUrl &&
                        <Button
                            className={classnames(styles.button)}
                            icon={<BookIcon/>}
                            size="big"
                            color={trainingUrl ? 'default' : 'accent'}
                            label={academyLabel}
                            onClick={() => onClickAcademy()}
                        />}
                    { trainingUrl &&
                        <Button
                            className={classnames(styles.button)}
                            icon={<SchoolIcon/>}
                            size="big"
                            label={trainingLabel}
                            color="accent"
                            onClick={() => onClickTraining()}
                        />}
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
