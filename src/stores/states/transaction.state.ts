import TransactionDto from "../../dto/transaction.dto";
import DormantAccount from "../../dto/dormant-account.dto";

export default class TransactionState {
    transactions: TransactionDto[];
    dormantAccounts: DormantAccount[];
}
