import React, { useState } from 'react';
import { Card, CardGroup, Button, ButtonGroup, Popup, Form, FormGroup, FormInput, FormButton, Radio, Segment, Label, Modal, ModalContent, ModalActions, Header, Icon,
    ListItem,
  ListIcon,
  ListHeader,
  ListDescription,
  ListContent,
  List,
  Loader
} from 'semantic-ui-react';
const DeviceList = ({ devices, handleDelete, handleUpdate, handleHistory }) => {

    const [updateStatusValue, setUpdateStatusValue] = useState("");
    const [updateValue, setUpdateValue] = useState("");
    const [open, setOpen] = useState(false);
    const [deviceHistory, setDeviceHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function getHistory(ip) {
        setLoading(true);
        setError("");
        await handleHistory(ip, setDeviceHistory);
        setLoading(false);
        if(!deviceHistory){
            setError("No History Found! Something is Fishy! 🦈");
        }
    }

    const handleUpdateHere = (ip) => {
        setLoading(true);
        handleUpdate(ip, updateStatusValue, updateValue);
        setUpdateStatusValue("");
        setUpdateValue("");
        setLoading(false);
    }


    return (
        <div style={{ marginLeft: "100px", marginRight: "100px" }}>
            <CardGroup itemsPerRow={3} stackable>
                {
                    devices.map((device, index) => (
                        <Card key={index}>
                            <Card.Content>
                                <div style={{ float: "left" }}>
                                    <Card.Header><h2>{device.Record.name}</h2></Card.Header>
                                    <Card.Meta>{device.Record.ip}</Card.Meta>
                                    <Card.Description>
                                        Last Invoked: {device.Record.lastInvokedTime} by {device.Record.lastInvoker}
                                    </Card.Description>
                                    <Card.Description>
                                        <Label circular color={device.Record.status === "ON" ? "green" : "red"} empty />
                                        <span>  {device.Record.status}</span>
                                    </Card.Description>
                                </div>
                                {/* Button Group should be on right parallel to other above tags */}
                                <div style={{ display: "flex", float: "right" }}>
                                    <ButtonGroup basic vertical>
                                        <Modal
                                            basic
                                            onClose={() => setOpen(false)}
                                            onOpen={() => setOpen(true)}
                                            open={open}
                                            size='small'
                                            trigger={<Button icon='history' onClick={()=>getHistory(device.Record.ip)} />}
                                        >
                                            <Header icon>
                                                <Icon name='history' />
                                                History of Transactions 
                                            </Header>
                                            <ModalActions>
                                                <p>{error}</p>
                                                <Button basic color='red' onClick={() => setOpen(false)}>
                                                    <Icon name='remove' /> Close
                                                </Button>
                                            </ModalActions>
                                            <ModalContent >
                                                {loading ? <Loader active inline='centered' /> : 
                                                <List inverted>
                                                    {deviceHistory.map((history, index) => (
                                                        <ListItem key={index}>
                                                            <ListIcon name='clock' />
                                                            <ListContent>
                                                                <ListHeader>{history.Record.lastInvokedTime}</ListHeader>
                                                                <ListDescription>
                                                                    Invoked by {history.Record.lastInvoker} for {history.Record.status} with value {history.Record.value}
                                                                </ListDescription>
                                                            </ListContent>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                                // { deviceHistory.map((history, index) => (
                                                //     <List key={index} inverted>
                                                //         <ListItem>
                                                //             <ListIcon name='clock' />
                                                //             <ListContent>
                                                //                 <ListHeader>{history.Record.lastInvokedTime}</ListHeader>
                                                //                 <ListDescription>
                                                //                     Invoked by {history.Record.lastInvoker} for {history.Record.status} with value {history.Record.value}
                                                //                 </ListDescription>
                                                //             </ListContent>
                                                //         </ListItem>
                                                //     </List>
                                                // ))
                                                // }
                                            }
                                            </ModalContent>
                                        </Modal>
                                        <Popup
                                            on='click'
                                            content={
                                                <Form onSubmit={() => handleUpdateHere(device.Record.ip)}>
                                                    <FormGroup>
                                                        <Segment compact color='grey' inverted stacked>
                                                            <Radio toggle
                                                                checked={updateStatusValue === "ON" ? true : false}
                                                                onChange={() => setUpdateStatusValue(device.Record.status === "ON" ? "OFF" : "ON")}
                                                            />
                                                        </Segment>
                                                        {device.Record.actionType === "input" ? <FormInput
                                                            placeholder='Value'
                                                            name='value'
                                                            value={updateValue}
                                                            required={device.Record.status === "OFF" ? true : false}
                                                            onChange={(e) => setUpdateValue(e.target.value)}
                                                        /> : null}
                                                        <FormButton content="Invoke" />
                                                    </FormGroup>
                                                </Form>
                                            }
                                            trigger={<Button icon='cubes' onClick={() => setUpdateStatusValue(device.Record.status)} />}
                                        />
                                        <Button icon='trash' onClick={() => handleDelete(device.Record.ip)} />
                                    </ButtonGroup>
                                </div>
                            </Card.Content>
                        </Card>
                    ))
                }

            </CardGroup>
        </div>

    );
};

export default DeviceList;
