import {combineReducers} from 'redux';
import TransactionReducer from "./transaction.reducer";

const allReducers = combineReducers({
    transaction: TransactionReducer,
});

export default allReducers;
