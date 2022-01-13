import '../_version.js';
declare type IDBObjectStoreMethods = 'get' | 'count' | 'getKey' | 'getAll' | 'getAllKeys' | 'add' | 'put' | 'clear' | 'delete';
declare type Query = IDBValidKey | IDBKeyRange | null;
interface DBWrapperOptions {
    onupgradeneeded?: (event: IDBVersionChangeEvent) => any;
    onversionchange?: (event: IDBVersionChangeEvent) => any;
}
interface GetAllMatchingOptions {
    index?: string;
    query?: Query;
    direction?: IDBCursorDirection;
    count?: number;
    includeKeys?: boolean;
}
/**
 * A class that wraps common IndexedDB functionality in a promise-based API.
 * It exposes all the underlying power and functionality of IndexedDB, but
 * wraps the most commonly used features in a way that's much simpler to use.
 *
 * @private
 */
export declare class DBWrapper {
    private readonly _name;
    private readonly _version;
    private readonly _onupgradeneeded?;
    private readonly _onversionchange;
    private _db;
    add?: Function;
    clear?: Function;
    count?: Function;
    delete?: Function;
    get?: Function;
    put?: Function;
    OPEN_TIMEOUT?: number;
    /**
     * @param {string} name
     * @param {number} version
     * @param {Object=} [callback]
     * @param {!Function} [callbacks.onupgradeneeded]
     * @param {!Function} [callbacks.onversionchange] Defaults to
     *     DBWrapper.prototype._onversionchange when not specified.
     * @private
     */
    constructor(name: string, version: number, { onupgradeneeded, onversionchange, }?: DBWrapperOptions);
    /**
     * Returns the IDBDatabase instance (not normally needed).
     * @return {IDBDatabase|undefined}
     *
     * @private
     */
    get db(): IDBDatabase | null;
    /**
     * Opens a connected to an IDBDatabase, invokes any onupgradedneeded
     * callback, and added an onversionchange callback to the database.
     *
     * @return {IDBDatabase}
     * @private
     */
    open(): Promise<this | undefined>;
    /**
     * Polyfills the native `getKey()` method. Note, this is overridden at
     * runtime if the browser supports the native method.
     *
     * @param {string} storeName
     * @param {*} query
     * @return {Array}
     * @private
     */
    getKey(storeName: string, query: Query): Promise<IDBValidKey>;
    /**
     * Polyfills the native `getAll()` method. Note, this is overridden at
     * runtime if the browser supports the native method.
     *
     * @param {string} storeName
     * @param {*} query
     * @param {number} count
     * @return {Array}
     * @private
     */
    getAll(storeName: string, query?: Query, count?: number): Promise<any[]>;
    /**
     * Polyfills the native `getAllKeys()` method. Note, this is overridden at
     * runtime if the browser supports the native method.
     *
     * @param {string} storeName
     * @param {*} query
     * @param {number} count
     * @return {Array}
     * @private
     */
    getAllKeys(storeName: string, query: Query, count: number): Promise<IDBValidKey[]>;
    /**
     * Supports flexible lookup in an object store by specifying an index,
     * query, direction, and count. This method returns an array of objects
     * with the signature .
     *
     * @param {string} storeName
     * @param {Object} [opts]
     * @param {string} [opts.index] The index to use (if specified).
     * @param {*} [opts.query]
     * @param {IDBCursorDirection} [opts.direction]
     * @param {number} [opts.count] The max number of results to return.
     * @param {boolean} [opts.includeKeys] When true, the structure of the
     *     returned objects is changed from an array of values to an array of
     *     objects in the form {key, primaryKey, value}.
     * @return {Array}
     * @private
     */
    getAllMatching(storeName: string, { index, query, // IE/Edge errors if query === `undefined`.
    direction, count, includeKeys, }?: GetAllMatchingOptions): Promise<Array<IDBCursor | any>>;
    /**
     * Accepts a list of stores, a transaction type, and a callback and
     * performs a transaction. A promise is returned that resolves to whatever
     * value the callback chooses. The callback holds all the transaction logic
     * and is invoked with two arguments:
     *   1. The IDBTransaction object
     *   2. A `done` function, that's used to resolve the promise when
     *      when the transaction is done, if passed a value, the promise is
     *      resolved to that value.
     *
     * @param {Array<string>} storeNames An array of object store names
     *     involved in the transaction.
     * @param {string} type Can be `readonly` or `readwrite`.
     * @param {!Function} callback
     * @return {*} The result of the transaction ran by the callback.
     * @private
     */
    transaction(storeNames: string | string[], type: IDBTransactionMode, callback: (txn: IDBTransaction, done: Function) => void): Promise<any>;
    /**
     * Delegates async to a native IDBObjectStore method.
     *
     * @param {string} method The method name.
     * @param {string} storeName The object store name.
     * @param {string} type Can be `readonly` or `readwrite`.
     * @param {...*} args The list of args to pass to the native method.
     * @return {*} The result of the transaction.
     * @private
     */
    _call(method: IDBObjectStoreMethods, storeName: string, type: IDBTransactionMode, ...args: any[]): Promise<any>;
    /**
     * Closes the connection opened by `DBWrapper.open()`. Generally this method
     * doesn't need to be called since:
     *   1. It's usually better to keep a connection open since opening
     *      a new connection is somewhat slow.
     *   2. Connections are automatically closed when the reference is
     *      garbage collected.
     * The primary use case for needing to close a connection is when another
     * reference (typically in another tab) needs to upgrade it and would be
     * blocked by the current, open connection.
     *
     * @private
     */
    close(): void;
}
export {};
