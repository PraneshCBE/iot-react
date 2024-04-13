import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './Navbar'
import Grids from "./grids";
import UsersMgmt from "../UsersMgmt";
import styles from "./Dashboard.module.css"
import DeviceList from "./DeviceList";

const devices=["fan","light","AC","camera"]
import DeviceMgmt from "../devices/DeviceMgmt";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tokens, setTokens] = useState([]);
    const [user, setUser] = useState("");
    const [navSelected, setNavSelected] = useState("Home");
    const [dashDevice, setDashDevice] = useState("Home");
    useEffect(() => {
        if (!location.state) {
            navigate('/login', { replace: true });
            return
        }
        setUser(location.state.user)
        setTokens(location.state.tokens)
        if(location.state.landingPage){
            setNavSelected(location.state.landingPage)
        }
        console.log(dashDevice)
    }, []);

    const changeNavSelected = (value) => {
        setNavSelected(value);
    }
    const changeDashDevice = (value) => {
        setDashDevice(value);
    }
    return (
        <>
            <div>
                <NavBar user={user} tokens={tokens} name="Home" navFun={changeNavSelected} deviceFun={changeDashDevice} />
                {navSelected === "Home" ?
                    (
                        dashDevice === "Home" ?
                            (
                                <div>
                                    <h1>Dashboard (Under Development 🛠️ )</h1>
                                    <h2>Welcome {user}</h2>
                                    <h3>Here are your tokens:</h3>
                                    <ul>
                                        {Object.keys(tokens).map((key) => {
                                            return <li key={key}>{key}: {tokens[key]}</li>
                                        })}
                                    </ul>
                                    <div className={styles.centered}>
                                        <Grids deviceFun={changeDashDevice}></Grids>
                                    </div>
                                </div>
                            ) :
                            (
                                <DeviceMgmt tokens={tokens} org={dashDevice} user={user}></DeviceMgmt>
                            )
                    ) :
                    navSelected === "History" ? (
                        <UsersMgmt ptokens={tokens} />
                    ) :
                    navSelected === "Explorer" ? (
                        <div><h1>Redirecting to Hyperledger Fabric Explorer 😁</h1><p>Please check the new tab opened!</p></div>
                    ) :
                    navSelected === "History1" ? (
                        <div><h1>Hello {user}, History Page is under development 🛠️</h1><p> Comeback later for awesome Experience 🫣 </p></div>
                    ) :
                        (<></>)
                }
            </div>
        </>
    );
}    

export default Dashboard;