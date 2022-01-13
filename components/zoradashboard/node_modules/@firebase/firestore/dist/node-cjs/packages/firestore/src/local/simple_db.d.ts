/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { FirestoreError } from '../util/error';
import { PersistencePromise } from './persistence_promise';
declare type SimpleDbTransactionMode = 'readonly' | 'readwrite';
export interface SimpleDbSchemaConverter {
    createOrUpgrade(db: IDBDatabase, txn: IDBTransaction, fromVersion: number, toVersion: number): PersistencePromise<void>;
}
/**
 * Wraps an IDBTransaction and exposes a store() method to get a handle to a
 * specific object store.
 */
export declare class SimpleDbTransaction {
    private readonly action;
    private readonly transaction;
    private aborted;
    /**
     * A promise that resolves with the result of the IndexedDb transaction.
     */
    private readonly completionDeferred;
    static open(db: IDBDatabase, action: string, mode: IDBTransactionMode, objectStoreNames: string[]): SimpleDbTransaction;
    constructor(action: string, transaction: IDBTransaction);
    get completionPromise(): Promise<void>;
    abort(error?: Error): void;
    /**
     * Returns a SimpleDbStore<KeyType, ValueType> for the specified store. All
     * operations performed on the SimpleDbStore happen within the context of this
     * transaction and it cannot be used anymore once the transaction is
     * completed.
     *
     * Note that we can't actually enforce that the KeyType and ValueType are
     * correct, but they allow type safety through the rest of the consuming code.
     */
    store<KeyType extends IDBValidKey, ValueType extends unknown>(storeName: string): SimpleDbStore<KeyType, ValueType>;
}
/**
 * Provides a wrapper around IndexedDb with a simplified interface that uses
 * Promise-like return values to chain operations. Real promises cannot be used
 * since .then() continuations are executed asynchronously (e.g. via
 * .setImmediate), which would cause IndexedDB to end the transaction.
 * See PersistencePromise for more details.
 */
export declare class SimpleDb {
    private readonly name;
    private readonly version;
    private readonly schemaConverter;
    private db?;
    private versionchangelistener?;
    /** Deletes the specified database. */
    static delete(name: string): Promise<void>;
    /** Returns true if IndexedDB is available in the current environment. */
    static isAvailable(): boolean;
    /**
     * Returns true if the backing IndexedDB store is the Node IndexedDBShim
     * (see https://github.com/axemclion/IndexedDBShim).
     */
    static isMockPersistence(): boolean;
    /** Helper to get a typed SimpleDbStore from a transaction. */
    static getStore<KeyType extends IDBValidKey, ValueType extends unknown>(txn: SimpleDbTransaction, store: string): SimpleDbStore<KeyType, ValueType>;
    /** Parse User Agent to determine iOS version. Returns -1 if not found. */
    static getIOSVersion(ua: string): number;
    /** Parse User Agent to determine Android version. Returns -1 if not found. */
    static getAndroidVersion(ua: string): number;
    constructor(name: string, version: number, schemaConverter: SimpleDbSchemaConverter);
    /**
     * Opens the specified database, creating or upgrading it if necessary.
     */
    ensureDb(action: string): Promise<IDBDatabase>;
    setVersionChangeListener(versionChangeListener: (event: IDBVersionChangeEvent) => void): void;
    runTransaction<T>(action: string, mode: SimpleDbTransactionMode, objectStores: string[], transactionFn: (transaction: SimpleDbTransaction) => PersistencePromise<T>): Promise<T>;
    close(): void;
}
/**
 * A controller for iterating over a key range or index. It allows an iterate
 * callback to delete the currently-referenced object, or jump to a new key
 * within the key range or index.
 */
export declare class IterationController {
    private dbCursor;
    private shouldStop;
    private nextKey;
    constructor(dbCursor: IDBCursorWithValue);
    get isDone(): boolean;
    get skipToKey(): IDBValidKey | null;
    set cursor(value: IDBCursorWithValue);
    /**
     * This function can be called to stop iteration at any point.
     */
    done(): void;
    /**
     * This function can be called to skip to that next key, which could be
     * an index or a primary key.
     */
    skip(key: IDBValidKey): void;
    /**
     * Delete the current cursor value from the object store.
     *
     * NOTE: You CANNOT do this with a keysOnly query.
     */
    delete(): PersistencePromise<void>;
}
/**
 * Callback used with iterate() method.
 */
export declare type IterateCallback<KeyType, ValueType> = (key: KeyType, value: ValueType, control: IterationController) => void | PersistencePromise<void>;
/** Options available to the iterate() method. */
export interface IterateOptions {
    /** Index to iterate over (else primary keys will be iterated) */
    index?: string;
    /** IndxedDB Range to iterate over (else entire store will be iterated) */
    range?: IDBKeyRange;
    /** If true, values aren't read while iterating. */
    keysOnly?: boolean;
    /** If true, iterate over the store in reverse. */
    reverse?: boolean;
}
/** An error that wraps exceptions that thrown during IndexedDB execution. */
export declare class IndexedDbTransactionError extends FirestoreError {
    name: string;
    constructor(actionName: string, cause: Error | string);
}
/** Verifies whether `e` is an IndexedDbTransactionError. */
export declare function isIndexedDbTransactionError(e: Error): boolean;
/**
 * A wrapper around an IDBObjectStore providing an API that:
 *
 * 1) Has generic KeyType / ValueType parameters to provide strongly-typed
 * methods for acting against the object store.
 * 2) Deals with IndexedDB's onsuccess / onerror event callbacks, making every
 * method return a PersistencePromise instead.
 * 3) Provides a higher-level API to avoid needing to do excessive wrapping of
 * intermediate IndexedDB types (IDBCursorWithValue, etc.)
 */
export declare class SimpleDbStore<KeyType extends IDBValidKey, ValueType extends unknown> {
    private store;
    constructor(store: IDBObjectStore);
    /**
     * Writes a value into the Object Store.
     *
     * @param key - Optional explicit key to use when writing the object, else the
     * key will be auto-assigned (e.g. via the defined keyPath for the store).
     * @param value - The object to write.
     */
    put(value: ValueType): PersistencePromise<void>;
    put(key: KeyType, value: ValueType): PersistencePromise<void>;
    /**
     * Adds a new value into an Object Store and returns the new key. Similar to
     * IndexedDb's `add()`, this method will fail on primary key collisions.
     *
     * @param value - The object to write.
     * @returns The key of the value to add.
     */
    add(value: ValueType): PersistencePromise<KeyType>;
    /**
     * Gets the object with the specified key from the specified store, or null
     * if no object exists with the specified key.
     *
     * @key The key of the object to get.
     * @returns The object with the specified key or null if no object exists.
     */
    get(key: KeyType): PersistencePromise<ValueType | null>;
    delete(key: KeyType | IDBKeyRange): PersistencePromise<void>;
    /**
     * If we ever need more of the count variants, we can add overloads. For now,
     * all we need is to count everything in a store.
     *
     * Returns the number of rows in the store.
     */
    count(): PersistencePromise<number>;
    loadAll(): PersistencePromise<ValueType[]>;
    loadAll(range: IDBKeyRange): PersistencePromise<ValueType[]>;
    loadAll(index: string, range: IDBKeyRange): PersistencePromise<ValueType[]>;
    deleteAll(): PersistencePromise<void>;
    deleteAll(range: IDBKeyRange): PersistencePromise<void>;
    deleteAll(index: string, range: IDBKeyRange): PersistencePromise<void>;
    /**
     * Iterates over keys and values in an object store.
     *
     * @param options - Options specifying how to iterate the objects in the
     * store.
     * @param callback - will be called for each iterated object. Iteration can be
     * canceled at any point by calling the doneFn passed to the callback.
     * The callback can return a PersistencePromise if it performs async
     * operations but note that iteration will continue without waiting for them
     * to complete.
     * @returns A PersistencePromise that resolves once all PersistencePromises
     * returned by callbacks resolve.
     */
    iterate(callback: IterateCallback<KeyType, ValueType>): PersistencePromise<void>;
    iterate(options: IterateOptions, callback: IterateCallback<KeyType, ValueType>): PersistencePromise<void>;
    /**
     * Iterates over a store, but waits for the given callback to complete for
     * each entry before iterating the next entry. This allows the callback to do
     * asynchronous work to determine if this iteration should continue.
     *
     * The provided callback should return `true` to continue iteration, and
     * `false` otherwise.
     */
    iterateSerial(callback: (k: KeyType, v: ValueType) => PersistencePromise<boolean>): PersistencePromise<void>;
    private iterateCursor;
    private options;
    private cursor;
}
export {};
