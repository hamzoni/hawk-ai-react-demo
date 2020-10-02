import React, {useEffect} from 'react';
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

const convertType = (label: string, fn: any = null) => {
    if (!fn) {
        fn = (value: any) => {
            return value;
        }
    }
    return {label, fn}
};

const mappingTypes = {
    [QueueEvents.PUT_TRANSACTION]: {
        "bankTransactionId": convertType("ID"),
        "amount": convertType("Amount"),
        "bankProcessingTimestamp": convertType("Processed Time"),
        "currency": convertType("Currency"),
        "receivingAccount": convertType("Receive Acc", (value: any) => !value ? '' : value.holder),
        "sendingAccount": convertType("Send Acc", (value: any) => !value ? '' : value.holder),
        "usage": convertType("Usage"),
    } as any
};

const TransactionTable = (props: any) => {
    const classes = useStyles();

    useEffect(() => {
        console.log(props.transactions);
    }, [props.transactions]);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table" component={'table'}>
                <TableHead component={'thead'}>
                    <TableRow>
                        {
                            Object.keys(mappingTypes[QueueEvents.PUT_TRANSACTION])
                                .map((key: string) =>
                                    <TableCell align="right">
                                        {mappingTypes[QueueEvents.PUT_TRANSACTION][key].label}
                                    </TableCell>
                                )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.transactions && props.transactions.list.map((record: any, i: number) => (
                        <TableRow key={record.bankTransactionId + i} component={'tr'}>
                            {
                                Object.keys(mappingTypes[QueueEvents.PUT_TRANSACTION]).map((key: string, j: number) => (
                                    <TableCell align="right" component={'td'} key={key + i + '_' + j}>
                                        {mappingTypes[QueueEvents.PUT_TRANSACTION][key].fn(record[key])}
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


const mapStateToProps = (state: any) => {
    let transactions = state.transaction.transactions;
    transactions = transactions ? cloneDeep(transactions) : null;
    return {
        transactions,
    };
};

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TransactionTable);

