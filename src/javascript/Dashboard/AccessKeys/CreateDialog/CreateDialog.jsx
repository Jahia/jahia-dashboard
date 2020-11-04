import React, {useState} from 'react';
import {useApolloClient} from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import PathSelector from './PathSelector';
import TypeSelector from './TypeSelector';
import ValueInput from './ValueInput';
import {CreateAccessKey} from './CreateDialog.gql-mutations';
import refetchers from '../AccessKeys.refetchers';

export default function () {
    const [response, setResponse] = useState(null);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState({});
    const [workspaces, setWorkspaces] = useState([]);
    const [paths, setPaths] = useState([]);
    const [apis, setApis] = useState([]);
    const [ips, setIps] = useState([]);
    const [nodeTypes, setNodeTypes] = useState([]);
    const [referrers, setReferrers] = useState([]);
    const client = useApolloClient();

    const clearAll = () => {
        setPaths([]);
        setApis([]);
        setIps([]);
        setNodeTypes([]);
        setReferrers([]);
        setResponse(null);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        clearAll();
        refetchers.keys();
    };

    const handleCreate = async () => {
        const resp = await client.mutate({
            mutation: CreateAccessKey,
            variables: {
                type: type.value,
                workspaces: workspaces,
                paths: paths,
                apis: apis,
                ips: ips,
                nodeTypes: nodeTypes,
                referer: referrers
            }
        });

        setResponse({
            accessId: resp.data.createAccessKey.accessId,
            accessKey: resp.data.createAccessKey.key
        });
    };

    const onTypesSelect = item => {
        setType(item);
        clearAll();
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Create
            </Button>
            <Dialog maxWidth="xl" open={open} aria-labelledby="form-dialog-title" onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Create access key</DialogTitle>
                <DialogContent>

                    {
                        response &&
                        <>
                            <DialogContentText variant="h4">Make sure to copy the key, you will not be able to access it
                                once this dialog is closed!</DialogContentText>
                            <DialogContentText variant="body1">{response.accessKey}</DialogContentText>
                            <DialogContentText>
                                <em>
                                    For usage combine accessId with the key like
                                    so: {response.accessId}:{response.accessKey}
                                </em>
                            </DialogContentText>
                        </>
                    }

                    {
                        response === null &&
                        <>
                            <TypeSelector type={type} onSelect={onTypesSelect}/>
                            <PathSelector type={type}
                                          workspace={workspaces}
                                          paths={paths}
                                          onAdd={path => {
                                              setPaths([...paths, path]);
                                          }}
                                          onRemove={path => {
                                              setPaths(paths.filter(p => p !== path));
                                          }}/>
                            <ValueInput label="Workspaces"
                                        values={workspaces}
                                        onAdd={value => setWorkspaces([...workspaces, value])}
                                        onRemove={value => {
                                            setWorkspaces(workspaces.filter(p => p !== value));
                                        }}/>
                            <ValueInput label="APIs"
                                        values={apis}
                                        onAdd={value => setApis([...apis, value])}
                                        onRemove={value => {
                                            setApis(apis.filter(p => p !== value));
                                        }}/>
                            <ValueInput label="IPs"
                                        values={ips}
                                        onAdd={value => setIps([...ips, value])}
                                        onRemove={value => {
                                            setIps(ips.filter(p => p !== value));
                                        }}/>
                            <ValueInput label="Referrers"
                                        values={referrers}
                                        onAdd={value => setReferrers([...referrers, value])}
                                        onRemove={value => {
                                            setReferrers(referrers.filter(p => p !== value));
                                        }}/>
                            <ValueInput label="NodeTypes"
                                        values={nodeTypes}
                                        onAdd={value => setNodeTypes([...nodeTypes, value])}
                                        onRemove={value => {
                                            setNodeTypes(nodeTypes.filter(p => p !== value));
                                        }}/>
                        </>
                    }
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        response === null &&
                        <Button color="primary" onClick={handleCreate}>
                            Create
                        </Button>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}
