import React from "react";
import styles from './Login.module.css';
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

const Login = () => {
    return(
        <div className={styles.loginbody}>
        <div className={styles.wrapper}>
            <form action="">
                <h1>Login</h1>
                <div className={styles.inputbox}>
                    <input type="text" placeholder="Username" required/>
                    <FaUserAlt className={styles.icon}/>
                </div>
                <div className={styles.inputbox}>
                    <input type="password" placeholder="Password" required/>
                    <FaLock className={styles.icon}/>
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
        </div>
    );
};

export default Login;