import React, {useState} from 'react';
import SockJsClient from 'react-stomp';
import './App.css';

import {Container} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const SOCKET_URL = 'http://localhost:9000/ws-chat/';

const App = () => {
    let onConnected = () => {
        console.log("Connected!!")
    };

    let onMessageReceived = (msg) => {
        console.log('New Message Received!!', msg);
        // setMessages(messages.concat(msg));
    };

    let onSendMessage = (msgText) => {
        console.log(msgText);
    };

    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className="App">
            <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/group']}
                onConnect={onConnected}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
            />
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
                        <Tab label="Active" href={''} value={}/>
                        <Tab label="Active" href={''}/>
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
