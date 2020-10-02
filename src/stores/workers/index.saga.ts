import {all} from 'redux-saga/effects';
import {transactionsSagas} from "./transaction.saga";


export default function* rootSaga(): any {
    yield all([
        transactionsSagas
    ]);
}
