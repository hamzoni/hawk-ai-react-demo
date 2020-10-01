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
import TransactionTable from "./components/TransactionTable";

const SOCKET_URL = `http://localhost:9000/${WebSocketRoot}/`;

const App = () => {
    const [value, setValue] = useState(QueueEvents.PUT_TRANSACTION);

    let onMessageReceived = (msg, name) => {
        console.log(name, msg);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="App">
            {Object.values(QueueEvents).map(name => <SockJsClient
                url={SOCKET_URL} topics={[`/${WebSocketRoot}/${name}`]}
                onMessage={msg => onMessageReceived(msg, name)}
            />)}

            <Container maxWidth="lg" component={'div'}>
                <Paper square>
                    <Tabs
                        component={'div'} value={value} variant="fullWidth"
                        indicatorColor="primary" textColor="primary"
                        onChange={handleChange}
                    >
                        <Tab label="Transactions" href={''} value={QueueEvents.PUT_TRANSACTION}/>
                        <Tab label="Dormant activations" href={''} value={QueueEvents.ACTIVATE_DORMANT}/>
                    </Tabs>
                </Paper>

                <TransactionTable/>

                <Button variant="contained" color="primary" href={''}>
                    Hello World
                </Button>
            </Container>
        </div>
    )
}

export default App;
