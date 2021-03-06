import Transaction from '../models/Transaction';

interface Balance {
    income: number;
    outcome: number;
    total: number;
}
interface CreateTransactionDTO {
    title: string;
    value: number;
    type: 'income' | 'outcome';
}
class TransactionsRepository {
    private transactions: Transaction[];

    private balance: Balance;

    constructor() {
        this.transactions = [];
        this.balance = {
            income: 0,
            outcome: 0,
            total: 0,
        };
    }

    public all(): Transaction[] {
        return this.transactions;
    }

    public getBalance(): Balance {
        const myBalance = {
            income: 0,
            outcome: 0,
            total: 0,
        };

        this.transactions.map(transaction => {
            if (transaction.type === 'income')
                myBalance.income += transaction.value;
            else myBalance.outcome += transaction.value;
        });

        myBalance.total = myBalance.income - myBalance.outcome;
        this.balance = myBalance;

        return myBalance;
    }

    public hasMoney({
        type,
        value,
    }: Omit<CreateTransactionDTO, 'title'>): boolean {
        const balance = this.getBalance();
        if (type === 'outcome' && value <= balance.total) return true;
        return false;
    }

    public create({ title, type, value }: CreateTransactionDTO): Transaction {
        const transaction = new Transaction({ title, type, value });
        this.transactions.push(transaction);
        return transaction;
    }
}

export default TransactionsRepository;
