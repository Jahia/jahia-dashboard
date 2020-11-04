import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Chip} from '@jahia/moonstone';

export default function ({label, values = [], onAdd, onRemove}) {
    const [value, setValue] = useState(null);

    const handleChange = event => {
        setValue(event.target.value);
    };

    const handleAdd = async () => {
        onAdd(value);
    };

    return (
        <>
            <div>
                {values.map(p => {
                    return <Chip icon={null} label={p} color="success" onClick={() => onRemove(p)}/>;
                })}
            </div>
            <div style={{display: "flex", alignItems: "baseline"}}>
                <TextField
                    margin="dense"
                    id={label}
                    label={label}
                    type="text"
                    placeholder={label}
                    value={value}
                    onChange={handleChange}
                />
                <Button variant="outlined" color="primary" onClick={handleAdd}>
                    Add
                </Button>
            </div>
        </>
    );
}
