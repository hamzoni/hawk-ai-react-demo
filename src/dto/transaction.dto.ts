import AccountDto from "./account.dto";

export default class TransactionDto {
    bankTransactionId!: string;
    receivingAccount!: AccountDto;
    sendingAccount!: AccountDto;
    amount!: number;
    currency!: string;
    bankProcessingTimestamp!: Date;
    usage!: string;
}
