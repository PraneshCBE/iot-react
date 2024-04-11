import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        const isLogged = localStorage.getItem('isLogged');
        if (!isLogged || isLogged === 'false') {
          navigate('/login', { replace: true });
        }
      }, [navigate]);
    const location = useLocation();
    const user = location.state.user;
    const [tokens, setTokens] = useState(location.state.tokens);
    return(
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome {user}</h2>
            <h3>Here are your tokens:</h3>
            <ul>
                {Object.keys(tokens).map((key) => {
                    return <li key={key}>{key}: {tokens[key]}</li>
                })}
            </ul>
        </div>
    );
}

export default Dashboard;