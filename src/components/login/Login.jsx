import React, {useState} from "react";
import styles from './Login.module.css';
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {
const navigate = useNavigate();
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [errorMsg, setErrorMsg] = useState("");
const [loader, setLoader] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setLoader(true);
        const data = {
            id: username,
            secret: password
        };
        let enroll_url1=process.env.REACT_APP_HLF_APPLIANCE_USER_ENROLL_URL;
        let enroll_url2=process.env.REACT_APP_HLF_SURVILLEANCE_USER_ENROLL_URL;
        let enroll_url3=process.env.REACT_APP_HLF_INTELLI_USER_ENROLL_URL;
        let response1; 
        let response2; 
        let response3;
        try {
            response1 = await axios.post(enroll_url1, data);
        } catch (error) {
            response1 = error.response;
        }
        try {
            response2 = await axios.post(enroll_url2, data);
        } catch (error) {
            response2 = error.response;
        }
        try {
            response3 = await axios.post(enroll_url3, data);
        } catch (error) {
            response3 = error.response;
        }
        let tokens = {};
        

        if (response1.status === 200) {
            tokens["HP"] = response1.data.token;
        }
        if (response2.status === 200) {
            tokens["Surv"] = response2.data.token;
        }
        if (response3.status === 200) {
            tokens["Intelli"] = response3.data.token;
        }
        console.log(tokens);
        setLoader(false);
        if (Object.keys(tokens).length === 0)
            setErrorMsg("Invalid Credentials");
        else 
        {
            setErrorMsg("");
            localStorage.setItem("isLogged", true);
            navigate("/", {state: {user: username, tokens: tokens}});
        }
    };

    return(
        <div className={styles.loginbody}>
        <div className={styles.wrapper}>
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className={styles.inputbox}>
                    <input type="text" placeholder="Username" required value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <FaUserAlt className={styles.icon}/>
                </div>
                <div className={styles.inputbox}>
                    <input type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                    <FaLock className={styles.icon}/>
                </div>
                <p className={styles.error}>{errorMsg}</p>
                <p className={styles.loadingText}>{loader ? "Checking HLF..." : ""}</p>
                <button type="submit">Login</button>
            </form>
        </div>
        </div>
    );
};

export default Login;