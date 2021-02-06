import Transaction from '../models/Transaction';
import fs from 'fs';
import path from 'path';
import uploadConfig from '../config/upload'
import CreateTransactionService from './CreateTransactionService';

class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[]> {
    const importFilepath = path.join(uploadConfig.directory, filename);
    const data = fs.readFileSync(importFilepath);
    const createTransactionService = new CreateTransactionService();
    const lines = data.toString().split('\n');
    const transactions = []

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (line) {
        const [title, type, value, category] = line.split(',');
        const transaction = await createTransactionService.execute(
          {
            title: title.trim(),
            value: Number(value),
            type: type.trim() as ('income' | 'outcome'),
            category: category.trim()
          }
        );
        transactions.push(transaction);
      }
    }

    fs.promises.unlink(importFilepath);

    return transactions;
  }
}

export default ImportTransactionsService;
