import React, { useState, useEffect } from "react";
import { Card, CardMeta, CardHeader, CardDescription, CardContent, Loader, CardGroup, Message, MessageHeader } from "semantic-ui-react";
import { RandomAvatar } from "react-random-avatars";
import AccessList from "./dashboard/AccessList";
import axios, { all } from "axios";
const UsersMgmt = (props) => {
    const [tokens, setTokens] = useState(props.ptokens);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        getUsers();
    }, []);
    async function getUsers() {
        setLoading(true);
        setError("");
        let errorCnt = 0;
        let url_hp = process.env.REACT_APP_HLF_APPLIANCE_IDENTITIES_URL;
        let url_surv = process.env.REACT_APP_HLF_SURVILLEANCE_IDENTITIES_URL;
        let url_intelli = process.env.REACT_APP_HLF_INTELLI_IDENTITIES_URL;
        let hp_users = [], surv_users = [], intelli_users = [];
        try {
            await axios.get(url_hp, { headers: { Authorization: `Bearer ${tokens['HP']}` } }).then((response) => {
                hp_users = response.data.response.identities;
            });
        } catch (error) {
            console.log(error);
            errorCnt++;
        }
        try {
            await axios.get(url_surv, { headers: { Authorization: `Bearer ${tokens['Surv']}` } }).then((response) => {
                surv_users = response.data.response.identities;
            });
        } catch (error) {
            console.log(error);
            errorCnt++;
        }
        try {
            await axios.get(url_intelli, { headers: { Authorization: `Bearer ${tokens['Intelli']}` } }).then((response) => {
                intelli_users = response.data.response.identities;
            });
        } catch (error) {
            console.log(error);
            errorCnt++;
        }
        if (errorCnt===3) {
            setError("Failed to fetch Users! Possible Problems : 1. Token Expired [Login Again] 👨‍💻 2.Unauthorized Access [Run Away] 🤬 \n3. Server Error [Check Console and Contact Pranesh] 🥱.");
            setLoading(false);
            return;
        }
        let all_users = {}
        function addToList(user, orgName) {
            if (all_users[user])
                all_users[user].push(orgName);
            else
                all_users[user] = [orgName];
        }
        console.log(tokens);
        console.log(hp_users, surv_users, intelli_users);
        hp_users.forEach((user) => addToList(user.id, 'HomeAppliance'));
        surv_users.forEach((user) => addToList(user.id, 'Surveillance'));
        intelli_users.forEach((user) => addToList(user.id, 'Intelli'));
        setUsers(all_users);
        setLoading(false);


    }
    return (
        <div>
            <center>
                <h1>List of Users</h1>
                <br />
            </center>
            {
                error ? (
                    <Message negative>
                        <MessageHeader>Error</MessageHeader>
                        <p>{error}</p>
                    </Message>
                ) : (<></>)
            }
            {loading ? <Loader active inline='centered' /> : (
            <CardGroup centered>
                {Object.keys(users).map((user) => {
                    return (
                        <Card key={user}>
                            <CardContent>
                                <div style={{ float: "right" }}>
                                    <RandomAvatar name={user} size={40} />
                                </div>
                                <CardHeader>{user.toUpperCase()}</CardHeader>
                                <CardMeta>Username: {user}</CardMeta>
                                <CardDescription>
                                    <b>Access: </b>
                                    <AccessList access={users[user]}></AccessList>
                                </CardDescription>
                            </CardContent>
                        </Card>
                    )
                })}
            </CardGroup>)}

        </div>
    )
};

export default UsersMgmt;