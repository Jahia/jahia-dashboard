import React from 'react';
import {useApolloClient, useQuery} from '@apollo/react-hooks';
import {KeyList} from './KeyList.gql-queries';
import refetchers from '../AccessKeys.refetchers';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import {ActivateKey, RemoveAccessKey, DeactivateKey} from './KeyList.gql-mutations';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    superRow: {
        backgroundColor: "aliceblue"
    }
});

export default withStyles(styles)(function ({classes}) {
    const {loading, error, data, refetch} = useQuery(KeyList);
    const client = useApolloClient();

    if (!refetchers.keys) {
        refetchers.keys = refetch;
    }

    if (loading) {
        return 'List loading ...';
    }

    if (error) {
        return 'Failed to load list';
    }

    const activateDeactivate = async key => {
        let QUERY = ActivateKey;

        if (key.active) {
            QUERY = DeactivateKey;
        }

        await client.mutate({
            mutation: QUERY,
            variables: {
                accessId: key.accessId
            }
        });

        refetchers.keys();
    };

    const removeKey = async key => {
        await client.mutate({
            mutation: RemoveAccessKey,
            variables: {
                accessId: key.accessId
            }
        });

        refetchers.keys();
    };

    return (
        <Paper>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Active</TableCell>
                        <TableCell align="right">User Key</TableCell>
                        <TableCell align="right">Access ID</TableCell>
                        <TableCell align="right">Workspaces</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Paths</TableCell>
                        <TableCell align="right">IPs</TableCell>
                        <TableCell align="right">APIs</TableCell>
                        <TableCell align="right">NodeTypes</TableCell>
                        <TableCell align="right">Referrers</TableCell>
                        <TableCell align="right">Remove</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.accessKeys.map(key => (
                        <TableRow key={key.accessId} className={key.superkey ? classes.superRow : ""}>
                            <TableCell align="right"><Checkbox checked={key.active} onChange={() => activateDeactivate(key)}/></TableCell>
                            <TableCell align="right">{key.userKey}</TableCell>
                            <TableCell align="right">{key.accessId}</TableCell>
                            <TableCell align="right">{key.workspaces}</TableCell>
                            <TableCell align="right">{key.type === 'read' ? 'Read access' : 'Write access'}</TableCell>
                            <TableCell align="right">{key.paths}</TableCell>
                            <TableCell align="right">{key.ips}</TableCell>
                            <TableCell align="right">{key.apis}</TableCell>
                            <TableCell align="right">{key.nodeTypes}</TableCell>
                            <TableCell align="right">{key.referrers}</TableCell>
                            <TableCell align="right"><DeleteIcon onClick={() => removeKey(key)}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
})
