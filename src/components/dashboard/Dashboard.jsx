import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './Navbar'
import Grids from "./grids";
import UsersMgmt from "../UsersMgmt";
import styles from "./Dashboard.module.css"
import DeviceMgmt from "../devices/DeviceMgmt";
import Arch from "./Arch";
import Footer from "./Footer";
import { Button, Icon, Popup, Form, FormInput, FormButton, FormGroup, Message, MessageHeader, Divider, Image, ImageGroup} from "semantic-ui-react";
import axios from "axios";


// Dummy Comment for Github PR
const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tokens, setTokens] = useState([]);
    const [user, setUser] = useState("");
    const [navSelected, setNavSelected] = useState("Home");
    const [dashDevice, setDashDevice] = useState("Home");
    const [isLoaded, setIsLoaded] = useState(true);
    const [error, setError] = useState("");
    const [weakError, setWeakError] = useState("");
    const [limit, setLimit] = useState(0);
    const [isLimitChanged, setIsLimitChanged] = useState(false);

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
    const handleBackButton = () => {
        setDashDevice("Home");
        setNavSelected("Home");

    }

    async function changeTransactionLimit() {
        setIsLoaded(false);
        setError("");
        setWeakError("");
        setIsLimitChanged(false);
        console.log("Changing Transaction Limit");
        let auth_token = tokens["HP"];
        let url = process.env.REACT_APP_HLF_APPLIANCE_INVOKE_URL;
        let body = {
            method: "KVContract:changeLimitsPerDay",
            args: [limit.toString()]
        }
        try {
            await axios.post(url, body, { headers: { Authorization: `Bearer ${auth_token}` } }).then((response) => {
                console.log(response.data);
            });
            console.log("Transaction Limit Changed Successfully");
            setIsLimitChanged(true);
            setIsLoaded(true);
            setError("");

        }
        catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.status === 403)
                    setError("Token Expired, Please Login Again 🕒 (or) You don't have access here, Contact Admin or Pranesh 💨");
                else {
                    setWeakError(error.response.data.mesage);
                    setError("")
                }
            }
            else {
                setError("")
                setWeakError(error.message)
            }
        }
        setLimit(0)
        setIsLoaded(true);
    }
    useEffect(() => {
        setError("");
        setWeakError("");
    }, []);

    useEffect(() => {
        if (!isLoaded)
            setWeakError("");
    }, [isLoaded]);


    return (
        <>
            <div>
                <NavBar user={user} tokens={tokens} name="Home" navFun={changeNavSelected} deviceFun={changeDashDevice} activeIt={navSelected} />
                {navSelected === "Home" ?
                    (
                        dashDevice === "Home" ?
                            (
                                <div>
                                    <center>
                                        <div>
                                            <h1 style={{ marginTop: "60px" }}>Dashboard 🏠</h1>
                                            {user === "admin" ?
                                                <div style={{ float: "right", marginRight: "20px", marginTop: "-70px" }}>
                                                    <Popup
                                                        trigger={
                                                            <Button content='Transaction Limit' icon='setting' labelPosition='left' onClick={() => { setIsLimitChanged(false) }} />
                                                        }
                                                        content={
                                                            <div>
                                                                <h4>Set Transaction Limit per Device</h4>
                                                                <Form
                                                                    onSubmit={changeTransactionLimit}
                                                                    loading={!isLoaded}
                                                                    success={isLimitChanged}

                                                                >
                                                                    <FormGroup>
                                                                        <FormInput value={limit} onChange={(e) => setLimit(e.target.value)} />
                                                                        <div style={{ marginTop: "20px" }}>
                                                                            <FormButton content='Submit'></FormButton>
                                                                        </div>
                                                                        {isLimitChanged ? <Message success>
                                                                            <MessageHeader>Success</MessageHeader>
                                                                        </Message> : <></>}
                                                                    </FormGroup>
                                                                </Form>
                                                            </div>
                                                        }
                                                        on='click'
                                                        position='bottom left'
                                                    ></Popup>
                                                </div> : <></>
                                            }
                                        </div>
                                        <h2>Welcome to Smart Home Client App</h2>
                                        <p>Note: Don't use Browser's Navigation for best experience, instead use the Navigation Bar Provided</p>

                                        <div className={styles.centered}>
                                            <Grids deviceFun={changeDashDevice}></Grids>
                                        </div>
                                    </center>
                                    {
                                        weakError || error ? (
                                            <Message negative>
                                                <MessageHeader>Error</MessageHeader>
                                                <p>{weakError}{error}</p>
                                            </Message>
                                        ) : (<></>)
                                    }
                                    <Footer></Footer>
                                </div>
                                
                            ) :
                            (
                                <>
                                    <div style={{ marginLeft: "20px" }}>
                                        <Button onClick={() => handleBackButton()} icon><Icon name='chevron left' /></Button>
                                    </div>

                                    <DeviceMgmt tokens={tokens} org={dashDevice} user={user}></DeviceMgmt>
                                    
                                </>
                            )
                    ) : <>
                        <div style={{ marginLeft: "20px" }}>
                            <Button onClick={() => handleBackButton()} icon><Icon name='chevron left' /></Button>
                        </div>

                        {navSelected === "Users" ? (
                            <UsersMgmt ptokens={tokens} />
                        ) :
                            navSelected === "Explorer" ? (
                                <div><center><h1>Redirecting to Hyperledger Fabric Explorer 😁</h1><p>Please check the new tab opened!</p></center></div>
                                
                            ) :
                                navSelected === "Arch" ? (

                                    <Arch></Arch>
                                    // <div><h1>Hello {user}, Arch Page is under development 🛠️</h1><p> Comeback later for awesome Experience 🫣 </p></div>
                                ) :
                                    (<><h1>Something is Fishy 🦈 </h1></>)}
                    </>
                }
            </div>
        </>
    );
}

export default Dashboard;