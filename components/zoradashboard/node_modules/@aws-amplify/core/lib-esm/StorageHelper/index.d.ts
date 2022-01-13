/** @class */
export declare class MemoryStorage {
    /**
     * This is used to set a specific item in storage
     * @param {string} key - the key for the item
     * @param {object} value - the value
     * @returns {string} value that was set
     */
    static setItem(key: string, value: any): any;
    /**
     * This is used to get a specific key from storage
     * @param {string} key - the key for the item
     * This is used to clear the storage
     * @returns {string} the data item
     */
    static getItem(key: string): any;
    /**
     * This is used to remove an item from storage
     * @param {string} key - the key being set
     * @returns {string} value - value that was deleted
     */
    static removeItem(key: string): boolean;
    /**
     * This is used to clear the storage
     * @returns {string} nothing
     */
    static clear(): {};
}
export declare class StorageHelper {
    private storageWindow;
    /**
     * This is used to get a storage object
     * @returns {object} the storage
     */
    constructor();
    /**
     * This is used to return the storage
     * @returns {object} the storage
     */
    getStorage(): any;
}
/**
 * @deprecated use named import
 */
export default StorageHelper;
