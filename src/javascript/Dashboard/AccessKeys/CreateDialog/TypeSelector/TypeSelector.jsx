import React from 'react';
import {Dropdown} from '@jahia/moonstone';

export default function ({type, onSelect}) {
    const data = [
        {
            value: 'read',
            label: 'Read access'
        }, {
            value: 'write',
            label: 'Write access'
        }
    ];

    return (
        <Dropdown
            icon={null}
            label={type.label}
            value={type.value}
            size="medium"
            isDisabled={false}
            maxWidth="120px"
            data={data}
            onChange={(e, item) => onSelect(item)}
        />
    );
}
