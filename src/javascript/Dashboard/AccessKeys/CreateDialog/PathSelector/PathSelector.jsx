import React, {useState} from 'react';
import {useApolloClient} from '@apollo/react-hooks';
import {WritePermissionsQuery, ReadPermissionsQuery} from './PathSelector.gql-queries';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Chip} from '@jahia/moonstone';

const goodPathForCheck = path => {
    return path.endsWith('/.*') ? path.replace("/.*", "") : path;
};

export default function ({type, paths = [], onAdd, onRemove}) {
    const client = useApolloClient();
    const [value, setValue] = useState(null);
    const [error, setError] = useState(false);

    const handleChange = event => {
        setError(false);
        setValue(event.target.value);
    };

    const handleAdd = async () => {
        let resp;
        if (type.value === 'write') {
            resp = await client.mutate({
                mutation: WritePermissionsQuery,
                variables: {
                    path: goodPathForCheck(value)
                }
            });
        } else {
            resp = await client.mutate({
                mutation: ReadPermissionsQuery,
                variables: {
                    path: goodPathForCheck(value)
                }
            });
        }

        if (resp.data && resp.data.jcr && resp.data.jcr.nodeByPath.hasDefaultPermission && resp.data.jcr.nodeByPath.hasLivePermission) {
            onAdd(value);
        } else {
            setError(true);
        }
    };

    return (
        <>
            <div>
                {paths.map(p => {
                    return <Chip icon={null} label={p} color="success" onClick={() => onRemove(p)}/>;
                })}
            </div>
            {error && <div><small>You don't have needed permissions for that path</small></div>}
            <div style={{display:"flex", alignItems: "baseline"}}>
                <TextField
                    margin="dense"
                    id="path"
                    label="Path"
                    type="text"
                    placeholder="/sites"
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
