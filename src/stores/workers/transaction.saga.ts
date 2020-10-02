import {call, put} from 'redux-saga/effects';
import ApiService from "../../services/apis/api.service";
import {TransactionActionsTypes} from "../actions/index.action";
import {createSagas} from "./saga.util";


function* listTransactions(action: any) {
    const value = yield call(ApiService.transaction.get, action.payload);
    yield put({type: TransactionActionsTypes.LIST_TRANSACTIONS, value});
}


export const transactionsSagas = createSagas([
    {
        type: TransactionActionsTypes.LIST_TRANSACTIONS,
        callback: listTransactions,
    }
]);
