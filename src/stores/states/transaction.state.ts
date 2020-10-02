import TransactionDto from "../../dto/transaction.dto";
import DormantAccount from "../../dto/dormant-account.dto";
import {ListRequest} from "../../dto/common.dto";

export default class TransactionState {
    transactions: ListRequest<TransactionDto> = new ListRequest<TransactionDto>();
    dormantAccounts: ListRequest<DormantAccount> = new ListRequest<DormantAccount>();
}
