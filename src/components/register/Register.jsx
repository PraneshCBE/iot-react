import React, { useState, useEffect } from "react";
import styles from './Register.module.css';
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loader, setLoader] = useState("");
    const [checkboxes, setCheckboxes] = useState([true, false, false]);
    const [tokens, setTokens] = useState({});
    useEffect(() => {
        setTokens(JSON.parse(localStorage.getItem("tokens")));
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setLoader("Gathering HLF Tokens...");
        console.log(tokens)
        const data = {
            id: username,
            secret: password
        };
        let register_urls = []
        console.log(checkboxes);
        if (checkboxes[0]){
            register_urls.push(process.env.REACT_APP_HLF_APPLIANCE_USER_REGISTER_URL);
        }
        if (checkboxes[1]){
            register_urls.push(process.env.REACT_APP_HLF_SURVILLEANCE_USER_REGISTER_URL);
        }
        if (checkboxes[2]){
            register_urls.push(process.env.REACT_APP_HLF_INTELLI_USER_REGISTER_URL);
        }
        let success_cnt=0
        try{
            for (const url of register_urls){
                setErrorMsg("");
                setLoader("Registering for Org"+success_cnt+1+"...");
                const response = await axios.post(url, data);
                if (response.status === 200){
                   success_cnt+=1;
                }
            }
        }catch(error){
            console.log(error);
        }
        if (success_cnt < register_urls.length){
            setLoader("");
            setErrorMsg("Registration Failed");
        }
        else{
            setErrorMsg("");
            setLoader("Registration Successful");
        }
    }

    function handleCheckBoxChange(e){
        if (e.target.value === "HP"){
            setCheckboxes([e.target.checked, checkboxes[1], checkboxes[2]]);
        }
        else if (e.target.value === "Surv"){
            setCheckboxes([checkboxes[0], e.target.checked, checkboxes[2]]);
        }
        else if (e.target.value === "Intelli"){
            setCheckboxes([checkboxes[0], checkboxes[1], e.target.checked]);
        }
        console.log(checkboxes);
    }
    return(
        <div className={styles.loginbody}>
        <div className={styles.wrapper}>
            <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <div className={styles.inputbox}>
                    <input type="text" placeholder="Username" required value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <FaUserAlt className={styles.icon}/>
                </div>
                <div className={styles.inputbox}>
                    <input type="password" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                    <FaLock className={styles.icon}/>
                </div>
                <div className={styles.inputbox}>
                    <input type="password" placeholder="Confirm Password" required></input>
                    <FaLock className={styles.icon}/>
                </div>
                <div className={styles.checkboxesContainer}>
                    <input type="checkbox" id="HP" name="HP" value="HP" checked onChange={handleCheckBoxChange}/>
                    <label for="HP"> Home Appliances</label>
                    <input type="checkbox" id="Surv" name="Surv" value="Surv"onChange={handleCheckBoxChange}/>
                    <label for="Surv"> Survilleance</label>
                    <input type="checkbox" id="Intelli" name="Intelli" value="Intelli" onChange={handleCheckBoxChange}/>
                    <label for="Intelli"> Intelli</label>
                </div>
                <p className={styles.error}>{errorMsg}</p>
                <p className={styles.loadingText}>{loader}</p>
                <button type="submit">Register</button>
            </form>
        </div>
        </div>
    );
}

export default Register;