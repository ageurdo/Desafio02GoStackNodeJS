import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
    title: string;
    value: number;
    type: 'income' | 'outcome';
}
class CreateTransactionService {
    private transactionsRepository: TransactionsRepository;

    constructor(transactionsRepository: TransactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    public execute({ title, type, value }: Request): Transaction {
        const hasMoneyForTransaction = this.transactionsRepository.hasMoney({
            value,
            type,
        });
        if (type === 'outcome' && !hasMoneyForTransaction) {
            throw Error('There is not enough money');
        }

        const transaction = this.transactionsRepository.create({
            title,
            value,
            type,
        });

        return transaction;
    }
}

export default CreateTransactionService;
