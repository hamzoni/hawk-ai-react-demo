import {TransactionActions} from "../actions/index.action";
import {TransactionState} from "../states/index.state";

const TransactionReducer = (state = new TransactionState(), action) => {
    switch (action.type) {

        // API actions
        case TransactionActions.LIST_TRANSACTIONS: {
            return {
                ...state,
            };
        }

        case TransactionActions.LIST_TRANSACTIONS_SUCCESS: {
            return {
                ...state,
            };
        }

        // WebSocket actions
        case TransactionActions.WS_STORE_TRANSACTION: {
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
