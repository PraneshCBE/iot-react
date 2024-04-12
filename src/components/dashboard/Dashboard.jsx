import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './Navbar'

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [tokens, setTokens] = useState([]);
    const [user, setUser] = useState("");
    useEffect(() => {
        if (!location.state) {
            navigate('/login', { replace: true });
            return
        }
        setUser(location.state.user)
        setTokens(location.state.tokens)

    }, []);


    return (
        <>
            <div>
                <NavBar user={user} tokens={tokens} name="Home" />
                <h1>Dashboard</h1>
                <h2>Welcome {user}</h2>
                <h3>Here are your tokens:</h3>
                <ul>
                    {Object.keys(tokens).map((key) => {
                        return <li key={key}>{key}: {tokens[key]}</li>
                    })}
                </ul>
            </div>
        </>
    );
}

export default Dashboard;