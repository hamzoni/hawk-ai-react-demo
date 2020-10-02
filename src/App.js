import React, {useState, useEffect, useMemo} from 'react';
import SockJsClient from 'react-stomp';
import './App.css';

import {Container} from '@material-ui/core';
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {QueueEvents} from "./constants/QueueEvents";
import {WebSocketRoot} from "./constants/WsConstants";
import TransactionTable from "./components/TransactionTable";
import {connect} from 'react-redux';
import {listTransactions} from "./stores/actions/transaction.action";


const SOCKET_URL = `http://localhost:9000/${WebSocketRoot}/`;

const App = (props) => {
    const [value, setValue] = useState(QueueEvents.PUT_TRANSACTION);

    let onMessageReceived = (msg, name) => {
        console.log(name, msg);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        props.listTransactions({
            page: 0, size: 5,
        });
    }, []);

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
            </Container>
        </div>
    )
};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = {
    listTransactions,
};

// noinspection JSCheckFunctionSignatures
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
