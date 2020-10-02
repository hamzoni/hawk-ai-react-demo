import TransactionDto from "./transaction.dto";
import AccountDto from "./account.dto";

export default class DormantAccount extends AccountDto {
    transaction!: TransactionDto;
    isReceiver!: boolean;
}
