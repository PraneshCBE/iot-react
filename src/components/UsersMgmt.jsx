import React, {useState, useEffect} from "react";
import axios from "axios";
const UsersMgmt = (props) => {
    const [tokens, setTokens] = useState(props.ptokens);
    const [users, setUsers] = useState([]);

    async function getUsers() {
        let url_hp=process.env.REACT_APP_HLF_APPLIANCE_IDENTITIES_URL;
        let url_surv=process.env.REACT_APP_HLF_SURVILLEANCE_IDENTITIES_URL;
        let url_intelli=process.env.REACT_APP_HLF_INTELLI_IDENTITIES_URL;
        let hp_users=[], surv_users=[], intelli_users=[];
        try{
            await axios.get(url_hp, { headers: { Authorization: `Bearer ${tokens['HP']}` } }).then((response) => {
                hp_users=response.data.response.identities;
            });
        }catch(error){
            console.log(error);
        }
        try{
            await axios.get(url_surv, { headers: { Authorization: `Bearer ${tokens['Surv']}` } }).then((response) => {
                surv_users=response.data.response.identities;
            });
        }catch(error){
            console.log(error);
        }
        try{
            await axios.get(url_intelli, { headers: { Authorization: `Bearer ${tokens['Intelli']}` } }).then((response) => {
                intelli_users=response.data.response.identities;
            });
        }catch(error){
            console.log(error);
        }
        let all_users={}
        function addToList(user, orgName){
            if (all_users[user])
                all_users[user].push(orgName);
            else
                all_users[user]=[orgName];
        }
        hp_users.forEach((user) => addToList(user.id, 'HP'));
        surv_users.forEach((user) => addToList(user.id, 'S'));
        intelli_users.forEach((user) => addToList(user.id, 'I'));
        setUsers(all_users);
        
    }
    return (
    <div>
        <h1>List of Users</h1>
        <button onClick={getUsers}>Get Users</button>
        <table>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Organizations</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(users).map((user) => {
                    return (
                        <tr key={user}>
                            <td>{user}</td>
                            <td>{users[user].join(", ")}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        
    </div>
    )
};

export default UsersMgmt;