import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './Navbar'
import UsersMgmt from "../UsersMgmt";

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
                            <h1>Dashboard (Under Development 🛠️ )</h1>
                            <h2>Welcome {user}</h2>
                            <h3>Here are your tokens:</h3>
                            <ul>
                                {Object.keys(tokens).map((key) => {
                                    return <li key={key}>{key}: {tokens[key]}</li>
                                })}
                            </ul>
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
                    navSelected === "Profile" ? (
                        <div><h1>Hello {user}, Profile Page is under development 🛠️</h1><p>Comeback later for awesome Experience 🫣</p></div>
                    ) :
                        (<></>)}
            </div>
        </>
    );
}

export default Dashboard;