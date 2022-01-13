import { ClientStorage } from './storage';
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
    private storage;
    private transaction;
    constructor(storage: ClientStorage);
    create(transaction: Transaction): void;
    get(): Transaction;
    remove(): void;
}
export {};
