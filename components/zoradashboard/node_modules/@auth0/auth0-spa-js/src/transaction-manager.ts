import { ClientStorage } from './storage';

const TRANSACTION_STORAGE_KEY = 'a0.spajs.txs';

interface Transaction {
  nonce: string;
  scope: string;
  audience: string;
  appState?: any;
  code_verifier: string;
  redirect_uri: string;
  organizationId?: string;
}

export default class TransactionManager {
  private transaction: Transaction;

  constructor(private storage: ClientStorage) {
    this.transaction = this.storage.get(TRANSACTION_STORAGE_KEY);
  }

  public create(transaction: Transaction) {
    this.transaction = transaction;

    this.storage.save(TRANSACTION_STORAGE_KEY, transaction, {
      daysUntilExpire: 1
    });
  }

  public get(): Transaction {
    return this.transaction;
  }

  public remove() {
    delete this.transaction;
    this.storage.remove(TRANSACTION_STORAGE_KEY);
  }
}
