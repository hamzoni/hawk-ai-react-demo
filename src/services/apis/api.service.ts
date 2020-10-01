import TransactionApi from "./transaction.api";

export default class ApiService {
    static transaction: TransactionApi = new TransactionApi();
}
