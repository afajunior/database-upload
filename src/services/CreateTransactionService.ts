// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import CategoriesRepository from '../repositories/CategoriesRepository';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const { total } = await transactionRepository.getBalance();

    if(type === 'outcome' && (total-value) < 0) {
      throw new Error('No Balance');
    }

    const categoryObj = await categoriesRepository.getCategoryId(category);
    
    const transaction = transactionRepository.create({
      title,
      type,
      value,
      category: categoryObj
    });
    return await transactionRepository.save(transaction);
  }
}

export default CreateTransactionService;
