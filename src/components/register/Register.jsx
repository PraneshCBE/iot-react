import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './Register.module.css';
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import axios from "axios";

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loader, setLoader] = useState("");
    const [checkboxes, setCheckboxes] = useState([true, false, false]);
    const [tokens, setTokens] = useState({});
    useEffect(() => {
        if (!location.state)
        {
            navigate('/login', { replace: true });
            return 
        }
        setTokens(location.state.tokens);
    }, []);
    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        if (password !== confirmPassword){
            setErrorMsg("Passwords do not match");
            return;
        }
        console.log(tokens)
        const data = {
            id: username,
            secret: password
        };
        let register_urls = []
        let headers = []
        if (checkboxes[0]){
            register_urls.push(process.env.REACT_APP_HLF_APPLIANCE_USER_REGISTER_URL);
            headers.push({
                headers: { Authorization: `Bearer ${tokens["HP"]}` }
            });
        }
        if (checkboxes[1]){
            register_urls.push(process.env.REACT_APP_HLF_SURVILLEANCE_USER_REGISTER_URL);
            headers.push({
                headers: { Authorization: `Bearer ${tokens["Surv"]}` }
            });
        }
        if (checkboxes[2]){
            register_urls.push(process.env.REACT_APP_HLF_INTELLI_USER_REGISTER_URL);
            headers.push({
                headers: { Authorization: `Bearer ${tokens["Intelli"]}` }
            });
        }
        let success_cnt=0
        try{
            for (let i=0; i<register_urls.length; i++){
                setLoader(`Registering for Organization ${i+1}...`);
                let response = await axios.post(register_urls[i], data, headers[i]);
                if (response.status === 201){
                    success_cnt++;
                }
            }
        }catch(error){
            console.log("Error",error.response.data.message);
            setErrorMsg("")
            setErrorMsg(error.response.data.message)
            if (error.response.status === 403)
                setErrorMsg(errorMsg+": Token Expired, Please Login Again");
            if ((error.response.data.message).includes("already registered"))
                setLoader("");
                setErrorMsg("User already registered for a Organization, Please select properly");
            return;
        }
        if (success_cnt < register_urls.length){
            setLoader("");
            setErrorMsg(errorMsg+"\n Registration Failed");
        }
        else{
            setErrorMsg("");
            setLoader("Registration Successful");
            setUsername("");
            setPassword("");
            setConfirmPassword("");
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
                    <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></input>
                    <FaLock className={styles.icon}/>
                </div>
                <div className={styles.checkboxesContainer}>
                    <input type="checkbox" id="HP" name="HP" value="HP" onChange={handleCheckBoxChange}/>
                    <label> Home Appliances</label>
                    <input type="checkbox" id="Surv" name="Surv" value="Surv"onChange={handleCheckBoxChange}/>
                    <label> Survilleance</label>
                    <input type="checkbox" id="Intelli" name="Intelli" value="Intelli" onChange={handleCheckBoxChange}/>
                    <label> Intelli</label>
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