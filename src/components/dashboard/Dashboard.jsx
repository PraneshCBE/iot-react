import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './Navbar'
import Grids from "./grids";
import UsersMgmt from "../UsersMgmt";
import styles from "./Dashboard.module.css"
import DeviceList from "./DeviceList";

const devices=["fan","light","AC","camera"]

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tokens, setTokens] = useState([]);
    const [user, setUser] = useState("");
    const [navSelected, setNavSelected] = useState("Home");
    useEffect(() => {
        if (!location.state) {
            navigate('/login', { replace: true });
            return
        }
        setUser(location.state.user)
        setTokens(location.state.tokens)

    }, []);

    const changeNavSelected = (value) => {
        setNavSelected(value);
    }


    return (
        <>
            <div>
                <NavBar user={user} tokens={tokens} name="Home" navFun={changeNavSelected} />
                {navSelected === "Home" ?
                    (
                        <>
                                <div className={styles.centered}>
                                    <Grids></Grids>
                                </div>
                                <DeviceList devices={devices} rows={Math.ceil(devices.length/3)}></DeviceList>
                        </>
                    ) :
                    navSelected === "Users" ? (
                        <UsersMgmt ptokens={tokens} />
                    ) :
                    navSelected === "Explorer" ? (
                        <div><h1>Redirecting to Hyperledger Fabric Explorer 😁</h1><p>Please check the new tab opened!</p></div>
                    ) :
                    navSelected === "History" ? (
                        <div><h1>Hello {user}, History Page is under development 🛠️</h1><p> Comeback later for awesome Experience 🫣 </p></div>
                    ) :
                        (<></>)}
            </div>
        </>
    );
}

export default Dashboard;