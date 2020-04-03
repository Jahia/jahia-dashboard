import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import styles from './SectionHeader.scss';
import SectionTitle from '../SectionTitle';
import ArrowRightIcon from '@jahia/moonstone/dist/icons/ArrowRight';

const SectionHeader = ({title, moreLink, moreLinkText}) => {
    const moreLinkElement = (
        <a href={moreLink} className={classnames(styles.seeAllLink)} target="_blank" rel="noopener noreferrer">
            <div className={classnames('flexRow')}>
                <span className={classnames(styles.seeAllLinkText)}>{moreLinkText}</span>
                <ArrowRightIcon/>
            </div>
        </a>
    );

    return (
        <div className={classnames(styles.sectionHeading)}>
            <SectionTitle>{title}</SectionTitle>
            {moreLink && moreLinkElement}
        </div>
    );
};

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    moreLink: PropTypes.string,
    moreLinkText: PropTypes.string
};

export default SectionHeader;
