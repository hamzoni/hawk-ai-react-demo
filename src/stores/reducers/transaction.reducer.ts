import {TransactionState} from "../states/index.state";
import {TransactionActionsTypes} from "../actions/index.action";
import {ReducerType} from "./reducer.util";

const TransactionReducer = (state = new TransactionState(), action: ReducerType) => {
    switch (action.type) {

        // API actions
        case TransactionActionsTypes.LIST_TRANSACTIONS: {
            return {
                ...state,
            };
        }

        case TransactionActionsTypes.LIST_TRANSACTIONS_SUCCESS: {
            return {
                ...state,
            };
        }

        // WebSocket actions
        case TransactionActionsTypes.WS_STORE_TRANSACTION: {
            return {
                ...state,
            };
        }

        default: {
            return state;
        }
    }
};

export default TransactionReducer;
