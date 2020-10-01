import React, {useState} from 'react';
import SockJsClient from 'react-stomp';
import './App.css';

import {Container} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {QueueEvents} from "./constants/QueueEvents";
import {WebSocketRoot} from "./constants/WsConstants";

const SOCKET_URL = `http://localhost:9000/${WebSocketRoot}/`;

const App = () => {
    let onConnected = () => {
        console.log("Connected!!")
    };

    let onMessageReceived = (msg, name) => {
        console.log(name, msg);
    };

    let onSendMessage = (msgText) => {
        console.log(msgText);
    };

    const [value, setValue] = useState(QueueEvents.PUT_TRANSACTION);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="App">
            {Object.values(QueueEvents).map(name => <SockJsClient
                url={SOCKET_URL}
                topics={[`/${WebSocketRoot}/${name}`]}
                onConnect={onConnected}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg, name)}
                debug={false}
            />)}

            <Container maxWidth="lg" component={'div'}>
                <Paper square>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                        component={'div'}
                        variant="fullWidth"
                    >
                        <Tab label="Transactions" href={''} value={QueueEvents.PUT_TRANSACTION}/>
                        <Tab label="Dormant activations" href={''} value={QueueEvents.ACTIVATE_DORMANT}/>
                    </Tabs>
                </Paper>

                <Button variant="contained" color="primary" href={''}>
                    Hello World
                </Button>
            </Container>
        </div>
    )
}

export default App;
