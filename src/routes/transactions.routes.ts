import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  try {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const balance = await transactionRepository.getBalance();
    const transactions = await transactionRepository.find({ relations: ['category'] });

    transactions.forEach(trn => {
      console.log(trn.category);
    })

    response.json({
      "transactions": transactions,
      "balance": balance
    });
  } catch(err) {
    response.status(400).json({ status: 'error', message: err.message });
  }
});

transactionsRouter.post('/', async (request, response) => {
  try {
    const createTransactionService = new CreateTransactionService();
    const transaction = await createTransactionService.execute(request.body);
    response.json(transaction);
  } catch(err) {
    response.status(400).json({ status: 'error', message: err.message });
  }
});

transactionsRouter.delete('/:id', async (request, response) => {
  try {
    const deleteTransactionService = new DeleteTransactionService();
    await deleteTransactionService.execute(request.params.id);
    response.status(200).send();
  } catch(err) {
    response.status(400).json({ status: 'error', message: err.message });
  }
});

transactionsRouter.post('/import', async (request, response) => {
});

export default transactionsRouter;
