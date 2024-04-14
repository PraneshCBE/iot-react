import React, { useEffect, useState } from "react";
import axios from "axios";
import DeviceList from "../dashboard/DeviceList";
import { Dimmer, Loader, Segment, Image, Message, MessageHeader, Button, Popup, Form, FormGroup, FormInput, FormButton, Radio } from "semantic-ui-react";
import ChainImage from "../../assets/chain.jpeg";

const DeviceMgmt = (props) => {
    const [tokens] = useState(props.tokens);
    const [devices, setDevices] = useState([]);
    const [deviceIp, setDeviceIp] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("toggle");
    const { org, user } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState("");
    const [weakError, setWeakError] = useState("");

    const orgs = {
        "HP": "Home Appliances",
        "Surv": "Surveillance",
        "Intelli": "Intelli"
    }

    useEffect(() => {
        getDevices();
        setError("");
        setWeakError("");
        // setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded)
            setWeakError("");
    },[isLoaded]);

    async function getDevices() {
        setIsLoaded(false);
        setError("");
        let auth_token = tokens[org];
        let url = ""
        if (org === "HP")
            url = process.env.REACT_APP_HLF_APPLIANCE_QUERY_URL;
        else if (org === "Surv")
            url = process.env.REACT_APP_HLF_SURVILLEANCE_QUERY_URL;
        else if (org === "Intelli")
            url = process.env.REACT_APP_HLF_INTELLI_QUERY_URL;

        let body = {
            method: "KVContract:getAllDevices",
            args: []
        }
        try {
            await axios.post(url, body, { headers: { Authorization: `Bearer ${auth_token}` } }).then((response) => {
                let all_devices = response.data.response;
                if (org === "HP" || org === "Intelli") 
                {
                    if (org === "HP")
                        all_devices = all_devices.filter((device) => device.Record.orgName === "HomeApplianceMSP");
                    else
                        all_devices = all_devices.filter((device) => device.Record.orgName === "IntelliMSP");
                }
                if(all_devices.length === 0 && user === "admin")
                    setWeakError("No Devices Found!! Please Add Devices to the Network")
                else if(all_devices.length === 0)
                    setWeakError("No Devices Found!! Please Contact Admin to Add Devices to the Network")
                setDevices(all_devices);
                
            });
            setError("");
            setIsLoaded(true);
            
        }
        catch (error) {
            if (error.response) {
                if (error.response.status === 403)
                    setError("Token Expired, Please Login Again");
                else
                    setError(error.response.data.message)
            }
            else
                setError(error.message)


        }
        setIsLoaded(true);
    }

    async function addDevice(e) {
        e.preventDefault();
        setIsLoaded(false);
        setError("");
        let auth_token = tokens[org];
        let url = ""
        if (org === "HP")
            url = process.env.REACT_APP_HLF_APPLIANCE_INVOKE_URL;
        else if (org === "Surv")
            url = process.env.REACT_APP_HLF_SURVILLEANCE_INVOKE_URL;
        else if (org === "Intelli")
            url = process.env.REACT_APP_HLF_INTELLI_INVOKE_URL;

        let body = {
            method: "KVContract:addDevice",
            args: [deviceIp, deviceName, deviceType]
        }
        try {
            await axios.post(url, body, { headers: { Authorization: `Bearer ${auth_token}` } }).then((response) => {
            });
            getDevices();
            setIsLoaded(true);
            setError("");
            setDeviceIp("");
            setDeviceName("");
            setDeviceType("toggle");
        }
        catch (error) {
            if (error.response) {
                if (error.response.status === 403)
                    setError("Token Expired, Please Login Again");
                else
                {
                    setWeakError(error.response.data.message)
                    setError("")
                }
            }
            else{
                setError("")
                setWeakError(error.message)
            }
        }

        setIsLoaded(true);

    }
    async function deleteDevice(ip) {
        setIsLoaded(false);
        setError("");
        setWeakError("");
        let auth_token = tokens[org];
        let url = ""
        if (org === "HP")
            url = process.env.REACT_APP_HLF_APPLIANCE_INVOKE_URL;
        else if (org === "Surv")
            url = process.env.REACT_APP_HLF_SURVILLEANCE_INVOKE_URL;
        else if (org === "Intelli")
            url = process.env.REACT_APP_HLF_INTELLI_INVOKE_URL;

        let body = {
            method: "KVContract:deleteDevice",
            args: [ip]
        }
        try {
            await axios.post(url, body, { headers: { Authorization: `Bearer ${auth_token}` } }).then((response) => {
            });
            getDevices();
            setIsLoaded(true);
            setError("");
        }
        catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.status === 403)
                    setError("Token Expired, Please Login Again");
                else
                    {
                        setError("")
                        setWeakError(error.response.data.message)
                        setIsLoaded(true);
                    }
            }
            else
            {
                setWeakError(error.message)
                setIsLoaded(true);
            }
                

        }
    }
    async function performAction(ip, status, value) {
        setIsLoaded(false);
        setError("");
        console.log(tokens);
        let auth_token = tokens[org];
        let url = ""
        if (org === "HP")
            url = process.env.REACT_APP_HLF_APPLIANCE_INVOKE_URL;
        else if (org === "Surv")
            url = process.env.REACT_APP_HLF_SURVILLEANCE_INVOKE_URL;
        else if (org === "Intelli")
            url = process.env.REACT_APP_HLF_INTELLI_INVOKE_URL;

        let body = {
            method: "KVContract:performAction",
            args: [ip, status, value, user]
        }
        try {
            await axios.post(url, body, { headers: { Authorization: `Bearer ${auth_token}` } }).then((response) => {
            });
            getDevices();
            setIsLoaded(true);
            setError("");
        }
        catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.status === 403)
                    setError("Token Expired, Please Login Again");
                else
                    setError(error.response.data.message)
            }
            else
                setError(error.message)

        }
        setIsLoaded(true);
    }
     async function getHistory(ip,setDeviceHistory) {
        let url = ""
        let auth_token = tokens[org];
        if (org === "HP")
            url = process.env.REACT_APP_HLF_APPLIANCE_QUERY_URL;
        else if (org === "Surv")
            url = process.env.REACT_APP_HLF_SURVILLEANCE_QUERY_URL;
        else if (org === "Intelli")
            url = process.env.REACT_APP_HLF_INTELLI_QUERY_URL;

        let body = {
            method: "KVContract:getDeviceHistoryByIp",
            args: [ip]
        }
        try {
            await axios.post(url, body, { headers: { Authorization: `Bearer ${auth_token}` } }).then((response) => {
                setDeviceHistory(response.data.response);
            });
        }
        catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.status === 403)
                    setError("Token Expired, Please Login Again");
            }
        }
        return [];
    }
    return (
        <>
            {
                weakError ? (
                    <Message negative>
                        <MessageHeader>Error</MessageHeader>
                        <p>{weakError}</p>
                    </Message>
                ) : (<></>)
            }
            {
                error ?
                    (<Segment inverted color='red' stacked >
                        {error}
                  </Segment>) :
                    (
                            <div>
                                { user === "admin" ? (
                                <>
                                 <Popup
                                    style={{
                                    
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}
                                    basic
                                    position="top right"
                                            on='click'
                                            size="huge"
                                        
                                            content={
                                                <Form onSubmit={addDevice}>
                                                    <FormGroup>
                                                       <FormInput
                                                            placeholder='IP Address'
                                                            value={deviceIp}
                                                            required
                                                            onChange={(e) => setDeviceIp(e.target.value)}
                                                        /> 
                                                        <FormInput
                                                            placeholder='Name'
                                                            value={deviceName}
                                                            required
                                                            onChange={(e) => setDeviceName(e.target.value)}
                                                        />
                                                        
                                                        <Radio label="Does the device have any input?"
                                                            
                                                            checked={deviceType === "input" ? true : false}
                                                            onChange={() => setDeviceType(deviceType === "input" ? "toggle" : "input")}
                                                        />
                                                        <FormButton content="Add Device" />
                                                    </FormGroup>
                                                </Form>
                                            }
                                            trigger={<div style={{marginRight: "2%"}}>
                                            <Button  color="blue" compact floated="right">Add Device</Button>
                                            </div>}
                                        />
                                </>
                            ) : (<></>)}
                                <center>
                                <h1 >Devices - {orgs[org]}</h1>
                                </center>
                                {isLoaded}
                                <br/>
                                {!isLoaded ? (
                                    <center>
                                        <Loader active inline='centered' />
                                    </center>
                                ) : (
                                <DeviceList devices={devices} handleDelete={deleteDevice} handleUpdate={performAction} handleHistory={getHistory}></DeviceList>
                                )}
                            </div>
                        )}
        </>
    );
}

export default DeviceMgmt;