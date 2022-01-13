import '../_version.js';
/**
 * Returns the timestamp model.
 *
 * @private
 */
declare class CacheTimestampsModel {
    private readonly _cacheName;
    private readonly _db;
    /**
     *
     * @param {string} cacheName
     *
     * @private
     */
    constructor(cacheName: string);
    /**
     * Should perform an upgrade of indexedDB.
     *
     * @param {Event} event
     *
     * @private
     */
    private _handleUpgrade;
    /**
     * @param {string} url
     * @param {number} timestamp
     *
     * @private
     */
    setTimestamp(url: string, timestamp: number): Promise<void>;
    /**
     * Returns the timestamp stored for a given URL.
     *
     * @param {string} url
     * @return {number}
     *
     * @private
     */
    getTimestamp(url: string): Promise<number>;
    /**
     * Iterates through all the entries in the object store (from newest to
     * oldest) and removes entries once either `maxCount` is reached or the
     * entry's timestamp is less than `minTimestamp`.
     *
     * @param {number} minTimestamp
     * @param {number} maxCount
     * @return {Array<string>}
     *
     * @private
     */
    expireEntries(minTimestamp: number, maxCount?: number): Promise<string[]>;
    /**
     * Takes a URL and returns an ID that will be unique in the object store.
     *
     * @param {string} url
     * @return {string}
     *
     * @private
     */
    private _getId;
}
export { CacheTimestampsModel };
