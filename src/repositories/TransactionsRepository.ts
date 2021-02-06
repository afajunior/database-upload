import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
    let income=0;
    let outcome=0;
    transactions.forEach(value => {
      if(value.type === 'income') {
        income += value.value;
      } else if(value.type === 'outcome') {
        outcome += value.value;
      }
    });
    return {
      income,
      outcome,
      total: income - outcome
    };
  }
}

export default TransactionsRepository;
