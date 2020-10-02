import {Paging} from "../../dto/common.dto";
import {TransactionActionsTypes} from "./index.action";

export const listTransactions = (paging: Paging) => {
    return {
        type: TransactionActionsTypes.LIST_TRANSACTIONS,
        payload: paging,
    }
};
