import {Paging} from "../../dto/common.dto";
import {TransactionActionsTypes} from "./index.action";

export const listTransactions = (paging: Paging) => {
    console.log('listTransactions action', paging);
    return {
        type: TransactionActionsTypes.LIST_TRANSACTIONS,
        payload: paging,
    }
};
