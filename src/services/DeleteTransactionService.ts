// import AppError from '../errors/AppError';

import { getCustomRepository } from "typeorm";
import TransactionsRepository from "../repositories/TransactionsRepository";

class DeleteTransactionService {
  public async execute(transactionId: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const transaction = await transactionRepository.find({
      where: {
        id: transactionId
      }
    });
    if(transaction && transaction.length) {
      transactionRepository.remove(transaction);
    } else {
      throw Error(`Transaction '${transactionId}' not found`);
    }
  }
}

export default DeleteTransactionService;
