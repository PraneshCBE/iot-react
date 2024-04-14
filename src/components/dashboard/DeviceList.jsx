import React from 'react';
import { Card, CardGroup, Button, ButtonGroup } from 'semantic-ui-react';
const DeviceList = ({ devices }) => {
    //     const sample_devices=[{"Key":"192.168.0.1","Record":{
    // actionType: "input",
    // ip: "192.168.0.1",
    // lastInvokedTime: "4/13/2024, 5:07:05 PM",
    // lastInvoker: "INIT",
    // name: "AC 1",
    // orgName: "HomeApplianceMSP",
    // status: "OFF",
    // value: 0}},
    // {"Key":"192.168.0.2","Record":{
    //     actionType: "",
    //     ip: "192.168.0.2",
    //     lastInvokedTime: "4/13/2024, 5:07:05 PM",
    //     lastInvoker: "INIT",
    //     name: "Light 1",
    //     orgName: "HomeApplianceMSP",
    //     status: "OFF",
    //     value: 0}},
    // ]
    return (
        <div style={{ marginLeft: "100px", marginRight: "100px" }}>
            <CardGroup itemsPerRow={3} stackable>
                {
                    devices.map((device, index) => (
                        <Card key={index}>
                            <Card.Content>
                                <div style={{float: "left"}}>
                                <Card.Header style={{ fontWeight: "bolder", fontSize: "20px" }}>{device.Record.name}</Card.Header>
                                <Card.Meta>{device.Record.ip}</Card.Meta>
                                <Card.Description>
                                    Last Invoked: {device.Record.lastInvokedTime}
                                </Card.Description>
                                <Card.Description>
                                    {device.Record.status}
                                </Card.Description>
                                </div>
                                {/* Button Group should be on right parallel to other above tags */}
                                <div style={{ display:"flex",float:"right"}}>
                                <ButtonGroup basic vertical>
                                    <Button icon='history' />
                                    <Button icon='cubes' />
                                    <Button icon='trash' />
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
