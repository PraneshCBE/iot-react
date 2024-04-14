import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './Navbar'
import Grids from "./grids";
import UsersMgmt from "../UsersMgmt";
import styles from "./Dashboard.module.css"
import DeviceMgmt from "../devices/DeviceMgmt";
import { Button, Icon } from "semantic-ui-react";


const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tokens, setTokens] = useState([]);
    const [user, setUser] = useState("");
    const [navSelected, setNavSelected] = useState("Home");
    const [dashDevice, setDashDevice] = useState("Home");
    useEffect(() => {
        console.log(location.state)
        if (!location.state) {
            navigate('/login', { replace: true });
            return
        }
        setUser(location.state.user)
        setTokens(location.state.tokens)
        if (location.state.landingPage) {
            setNavSelected(location.state.landingPage)
        }
    }, []);

    const changeNavSelected = (value) => {
        setNavSelected(value);
    }
    const changeDashDevice = (value) => {
        setDashDevice(value);
    }
    const handleBackButton = ()=>{
        setDashDevice("Home");
        setNavSelected("Home");
        
    }
    return (
        <>
            <div>
                <NavBar user={user} tokens={tokens} name="Home" navFun={changeNavSelected} deviceFun={changeDashDevice} activeIt={navSelected}/>
                {navSelected === "Home" ?
                    (
                        dashDevice === "Home" ?
                            (
                                <div>
                                    <center>
                                        <h1>Dashboard 🏠</h1>
                                        <h2>Welcome to Smart Home Client App</h2>
                                        <p>Note: Don't use Browser's Navigation for best experience, instead use the Navigation Bar Provided</p>

                                        <div className={styles.centered}>
                                            <Grids deviceFun={changeDashDevice}></Grids>
                                        </div>
                                        <iframe
                                            width="100%"
                                            height="340"
                                            src="https://www.youtube.com/watch?v=wedwOQuMQbM"
                                            title="Smart Home"
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowfullscreen
                                        ></iframe>
                                    </center>
                                </div>
                            ) :
                            (
                                <>
                                <Button onClick={() =>handleBackButton()}>Go to Main Menu</Button>
                                <DeviceMgmt tokens={tokens} org={dashDevice} user={user}></DeviceMgmt>
                                </>
                            )
                    ) :<>
                    <Button onClick={() => handleBackButton()}>Go to Main Menu</Button>

                    {navSelected === "Users" ? (
                        <UsersMgmt ptokens={tokens} />
                    ) :
                        navSelected === "Explorer" ? (
                            <div><h1>Redirecting to Hyperledger Fabric Explorer 😁</h1><p>Please check the new tab opened!</p></div>
                        ) :
                            navSelected === "Arch" ? (
                                <div><h1>Hello {user}, Arch Page is under development 🛠️</h1><p> Comeback later for awesome Experience 🫣 </p></div>
                            ) :
                                (<><h1>Something is Fishy 🦈 </h1></>)}
                                </>
                }
            </div>
        </>
    );
}

export default Dashboard;