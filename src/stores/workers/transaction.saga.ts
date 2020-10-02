import {all, call, put, takeEvery} from 'redux-saga/effects';
import ApiService from "../../services/apis/api.service";
import {TransactionActionsTypes} from "../actions/index.action";
import {createSagas} from "./saga.util";
import {QueueEvents} from "../../constants/QueueEvents";


function* listTransactions(action: any) {
    action.payload = {
        ...action.payload,
        type: QueueEvents.PUT_TRANSACTION
    };
    const value = yield call(ApiService.transaction.get, '', action.payload);
    yield put({type: TransactionActionsTypes.LIST_TRANSACTIONS_SUCCESS, value});
}

function* watchListTransactions() {
    yield takeEvery(TransactionActionsTypes.LIST_TRANSACTIONS, listTransactions);
}

function* listDormantAccounts(action: any) {
    action.payload = {
        ...action.payload,
        type: QueueEvents.ACTIVATE_DORMANT
    };
    const value = yield call(ApiService.transaction.get, '', action.payload);
    yield put({type: TransactionActionsTypes.LIST_DORMANT_ACCOUNTS_SUCCESS, value});
}

function* watchDormantAccounts() {
    yield takeEvery(TransactionActionsTypes.LIST_DORMANT_ACCOUNTS, listDormantAccounts);
}

export const transactionsSagas = createSagas([
    {
        type: TransactionActionsTypes.LIST_TRANSACTIONS,
        callback: listTransactions,
    }
]);

export default function* rootSaga() {
    yield all([
        watchListTransactions(),
        watchDormantAccounts(),
    ]);
}
