import React, { useEffect, useState } from "react";
import axios from "axios";

const DeviceMgmt = (props) => {
    const [tokens, setTokens] = useState(props.tokens);
    const [devices, setDevices] = useState([]);
    const [deviceIp, setDeviceIp] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("input");
    const { org, user } = props;
    async function getDevices(){
        console.log(tokens);
        let auth_token = tokens[org];
        let url=""
        if (org === "HP")
            url=process.env.REACT_APP_HLF_APPLIANCE_QUERY_URL;
        else if (org === "Surv")
            url=process.env.REACT_APP_HLF_SURVILLEANCE_QUERY_URL;
        else if (org === "Intelli")
            url=process.env.REACT_APP_HLF_INTELLI_QUERY_URL;

        let body = {
            method:"KVContract:getAllDevices",
            args:[]
        }
        try{
            await axios.post(url, body, { headers: { Authorization: `Bearer ${auth_token}` } }).then((response) => {
                console.log(response);
                setDevices(response.data.response);
            });
        }
        catch(error){
            console.log(error);
        }

    }

    async function addDevice(e){
        e.preventDefault();
        console.log(tokens);
        console.log(deviceIp, deviceName, deviceType);  
        let auth_token = tokens[org];
        let url=""
        if (org === "HP")
            url=process.env.REACT_APP_HLF_APPLIANCE_INVOKE_URL;
        else if (org === "Surv")
            url=process.env.REACT_APP_HLF_SURVILLEANCE_INVOKE_URL;
        else if (org === "Intelli")
            url=process.env.REACT_APP_HLF_INTELLI_INVOKE_URL;

        let body = {
            method:"KVContract:addDevice",
            args:[deviceIp, deviceName, deviceType]
        }
        try{
            await axios.post(url, body, { headers: { Authorization: `Bearer ${auth_token}` } }).then((response) => {
                console.log(response);
                setDevices(response.data.response);
            });
        }
        catch(error){
            console.log(error);
        }

    }
    return (
        <div>
            <h1>{org} Devices</h1>
            <p> Hello {user} </p>
            <button onClick={getDevices}>Get Devices</button> 
            {user == "admin" ? (
                <div>
                <h1>Add Device</h1>
                <form onSubmit={addDevice}>
                    <label>IP Address:</label>
                    <input type="text" name="ip" value={deviceIp} required onChange={(e)=> setDeviceIp(e.target.value)}/>
                    <label>Name: </label>   
                    <input type="text" name="name"  value={deviceName} required onChange={(e)=> setDeviceName(e.target.value)}/>
                    <label>Device Type: </label>
                    {/* Add Dropdown with two options */}
                    <select name="type" required onChange={(e)=>setDeviceType(e.target.value)}>
                        <option value="input" >Toggle and Input</option>
                        <option value="toggle">Only Toggle</option>
                    </select>
                    <button type="submit">Add Device</button>
                </form>
                </div>
                ):
                (<></>)
            }   
        </div>
    );
}

export default DeviceMgmt;