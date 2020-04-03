import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import styles from './SectionHeader.scss';
import SectionTitle from '../SectionTitle';
import ArrowRightIcon from '@jahia/moonstone/dist/icons/ArrowRight';

const SectionHeader = ({title, moreUrl, moreLabel}) => {
    const moreElement = (
        <a href={moreUrl} className={classnames(styles.moreLink)} target="_blank" rel="noopener noreferrer">
            <div className={classnames('flexRow')}>
                <span className={classnames(styles.moreLabel)}>{moreLabel}</span>
                <ArrowRightIcon/>
            </div>
        </a>
    );

    return (
        <div className={classnames(styles.sectionHeading)}>
            <SectionTitle>{title}</SectionTitle>
            {moreUrl && moreElement}
        </div>
    );
};

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    moreUrl: PropTypes.string,
    moreLabel: PropTypes.string
};

export default SectionHeader;
