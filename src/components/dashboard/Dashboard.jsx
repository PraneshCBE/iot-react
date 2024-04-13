import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './Navbar'
import Grids from "./grids";
import UsersMgmt from "../UsersMgmt";
import styles from "./Dashboard.module.css"
import DeviceMgmt from "../devices/DeviceMgmt";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tokens, setTokens] = useState([]);
    const [user, setUser] = useState("");
    const [navSelected, setNavSelected] = useState("Home");
    const [dashDevice, setDashDevice] = useState("");
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
    }, []);

    const changeNavSelected = (value) => {
        setNavSelected(value);
    }
    return (
        <>
            <div>
                <NavBar user={user} tokens={tokens} name="Home" navFun={changeNavSelected} deviceFun={setDashDevice} />
                {navSelected === "Home" ?
                    (
                        <>
                            <h1>Dashboard (Under Development 🛠️ )</h1>
                            <h2>Welcome {user}</h2>
                            <h3>Here are your tokens:</h3>
                            <ul>
                                {Object.keys(tokens).map((key) => {
                                    return <li key={key}>{key}: {tokens[key]}</li>
                                })}
                            </ul>
                            <div className={styles.centered}>
                            <Grids deviceFun={setDashDevice}></Grids>
                            </div>
                            { dashDevice!==""
                            ?(
                                <DeviceMgmt xtokens={tokens} org={dashDevice} user={user}></DeviceMgmt>
                            )
                            :(
                            <></>
                            )
                            }
                        </>
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
                        (<></>)}
            </div>
        </>
    );
}

export default Dashboard;