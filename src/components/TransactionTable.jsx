import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import {QueueEvents} from "../constants/QueueEvents";

import {cloneDeep} from 'lodash'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const convertType = (label, fn = null) => {
    if (!fn) {
        fn = value => value
    }
    return {label, fn}
};

const mappingTypes = {
    [QueueEvents.PUT_TRANSACTION]: {
        "bankTransactionId": convertType("ID"),
        "amount": convertType("Amount"),
        "bankProcessingTimestamp": convertType("Processed Time"),
        "currency": convertType("Currency"),
        "receivingAccount": convertType("Receive Acc", (value) => !value ? '' : value.holder),
        "sendingAccount": convertType("Send Acc", (value) => !value ? '' : value.holder),
        "usage": convertType("Usage"),
    },
    [QueueEvents.ACTIVATE_DORMANT]: {
        "bankTransactionId": convertType("ID"),
    },
};


const mapStateToProps = (state) => {
    let transactions = state.transaction.transactions;
    transactions = transactions ? cloneDeep(transactions) : null;

    let dormantAccounts = state.transaction.dormantAccounts;
    dormantAccounts = dormantAccounts ? cloneDeep(dormantAccounts) : null;

    return {
        transactions, dormantAccounts
    };
};

const mapDispatchToProps = {};

const TransactionTable = (props) => {

    const [items, setItems] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        if (props.entityType === QueueEvents.PUT_TRANSACTION) {
            setItems(props.transactions.list);
        } else if (props.entityType === QueueEvents.ACTIVATE_DORMANT) {
            setItems(props.dormantAccounts.list);
        }
    }, [props.entityType, props.transactions, props.dormantAccounts]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table" component={'table'}>
                <TableHead component={'thead'}>
                    <TableRow>
                        {
                            Object.keys(mappingTypes[props.entityType]).map((key) =>
                                <TableCell align="right">
                                    {mappingTypes[props.entityType][key].label}
                                </TableCell>
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((record, i) => (
                        <TableRow key={record.bankTransactionId + i} component={'tr'}>
                            {
                                Object.keys(mappingTypes[props.entityType]).map((key, j) => (
                                    <TableCell align="right" component={'td'} key={key + i + '_' + j}>
                                        {mappingTypes[props.entityType] ? mappingTypes[props.entityType][key].fn(record[key]) : ''}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TransactionTable);

