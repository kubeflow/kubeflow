import { RequestData } from './StorableRequest.js';
import '../_version.js';
export interface UnidentifiedQueueStoreEntry {
    requestData: RequestData;
    timestamp: number;
    id?: number;
    queueName?: string;
    metadata?: object;
}
export interface QueueStoreEntry extends UnidentifiedQueueStoreEntry {
    id: number;
}
/**
 * A class to manage storing requests from a Queue in IndexedDB,
 * indexed by their queue name for easier access.
 *
 * @private
 */
export declare class QueueStore {
    private readonly _queueName;
    private readonly _db;
    /**
     * Associates this instance with a Queue instance, so entries added can be
     * identified by their queue name.
     *
     * @param {string} queueName
     * @private
     */
    constructor(queueName: string);
    /**
     * Append an entry last in the queue.
     *
     * @param {Object} entry
     * @param {Object} entry.requestData
     * @param {number} [entry.timestamp]
     * @param {Object} [entry.metadata]
     * @private
     */
    pushEntry(entry: UnidentifiedQueueStoreEntry): Promise<void>;
    /**
     * Prepend an entry first in the queue.
     *
     * @param {Object} entry
     * @param {Object} entry.requestData
     * @param {number} [entry.timestamp]
     * @param {Object} [entry.metadata]
     * @private
     */
    unshiftEntry(entry: UnidentifiedQueueStoreEntry): Promise<void>;
    /**
     * Removes and returns the last entry in the queue matching the `queueName`.
     *
     * @return {Promise<Object>}
     * @private
     */
    popEntry(): Promise<QueueStoreEntry>;
    /**
     * Removes and returns the first entry in the queue matching the `queueName`.
     *
     * @return {Promise<Object>}
     * @private
     */
    shiftEntry(): Promise<QueueStoreEntry>;
    /**
     * Returns all entries in the store matching the `queueName`.
     *
     * @param {Object} options See {@link module:workbox-background-sync.Queue~getAll}
     * @return {Promise<Array<Object>>}
     * @private
     */
    getAll(): Promise<QueueStoreEntry[]>;
    /**
     * Deletes the entry for the given ID.
     *
     * WARNING: this method does not ensure the deleted enry belongs to this
     * queue (i.e. matches the `queueName`). But this limitation is acceptable
     * as this class is not publicly exposed. An additional check would make
     * this method slower than it needs to be.
     *
     * @private
     * @param {number} id
     */
    deleteEntry(id: number): Promise<void>;
    /**
     * Removes and returns the first or last entry in the queue (based on the
     * `direction` argument) matching the `queueName`.
     *
     * @return {Promise<Object>}
     * @private
     */
    _removeEntry({ direction }: {
        direction?: IDBCursorDirection;
    }): Promise<any>;
    /**
     * Upgrades the database given an `upgradeneeded` event.
     *
     * @param {Event} event
     * @private
     */
    private _upgradeDb;
}
