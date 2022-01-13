import { StorageCache } from './StorageCache';
import { ICache, CacheConfig, CacheItemOptions } from './types';
/**
 * Customized storage based on the SessionStorage or LocalStorage with LRU implemented
 */
export declare class BrowserStorageCacheClass extends StorageCache implements ICache {
    /**
     * initialize the cache
     * @param config - the configuration of the cache
     */
    constructor(config?: CacheConfig);
    /**
     * decrease current size of the cache
     *
     * @private
     * @param amount - the amount of the cache size which needs to be decreased
     */
    private _decreaseCurSizeInBytes;
    /**
     * increase current size of the cache
     *
     * @private
     * @param amount - the amount of the cache szie which need to be increased
     */
    private _increaseCurSizeInBytes;
    /**
     * update the visited time if item has been visited
     *
     * @private
     * @param item - the item which need to be refreshed
     * @param prefixedKey - the key of the item
     *
     * @return the refreshed item
     */
    private _refreshItem;
    /**
     * check wether item is expired
     *
     * @private
     * @param key - the key of the item
     *
     * @return true if the item is expired.
     */
    private _isExpired;
    /**
     * delete item from cache
     *
     * @private
     * @param prefixedKey - the key of the item
     * @param size - optional, the byte size of the item
     */
    private _removeItem;
    /**
     * put item into cache
     *
     * @private
     * @param prefixedKey - the key of the item
     * @param itemData - the value of the item
     * @param itemSizeInBytes - the byte size of the item
     */
    private _setItem;
    /**
     * total space needed when poping out items
     *
     * @private
     * @param itemSize
     *
     * @return total space needed
     */
    private _sizeToPop;
    /**
     * see whether cache is full
     *
     * @private
     * @param itemSize
     *
     * @return true if cache is full
     */
    private _isCacheFull;
    /**
     * scan the storage and find out all the keys owned by this cache
     * also clean the expired keys while scanning
     *
     * @private
     *
     * @return array of keys
     */
    private _findValidKeys;
    /**
     * get all the items we have, sort them by their priority,
     * if priority is same, sort them by their last visited time
     * pop out items from the low priority (5 is the lowest)
     *
     * @private
     * @param keys - all the keys in this cache
     * @param sizeToPop - the total size of the items which needed to be poped out
     */
    private _popOutItems;
    /**
     * Set item into cache. You can put number, string, boolean or object.
     * The cache will first check whether has the same key.
     * If it has, it will delete the old item and then put the new item in
     * The cache will pop out items if it is full
     * You can specify the cache item options. The cache will abort and output a warning:
     * If the key is invalid
     * If the size of the item exceeds itemMaxSize.
     * If the value is undefined
     * If incorrect cache item configuration
     * If error happened with browser storage
     *
     * @param key - the key of the item
     * @param value - the value of the item
     * @param {Object} [options] - optional, the specified meta-data
     */
    setItem(key: string, value: object | number | string | boolean, options?: CacheItemOptions): void;
    /**
     * Get item from cache. It will return null if item doesn’t exist or it has been expired.
     * If you specified callback function in the options,
     * then the function will be executed if no such item in the cache
     * and finally put the return value into cache.
     * Please make sure the callback function will return the value you want to put into the cache.
     * The cache will abort output a warning:
     * If the key is invalid
     * If error happened with browser storage
     *
     * @param key - the key of the item
     * @param {Object} [options] - the options of callback function
     *
     * @return - return the value of the item
     */
    getItem(key: string, options?: CacheItemOptions): any;
    /**
     * remove item from the cache
     * The cache will abort output a warning:
     * If error happened with browser storage
     * @param key - the key of the item
     */
    removeItem(key: string): void;
    /**
     * clear the entire cache
     * The cache will abort output a warning:
     * If error happened with browser storage
     */
    clear(): void;
    /**
     * Return all the keys in the cache.
     *
     * @return - all keys in the cache
     */
    getAllKeys(): string[];
    /**
     * return the current size of the cache
     *
     * @return - current size of the cache
     */
    getCacheCurSize(): number;
    /**
     * Return a new instance of cache with customized configuration.
     * @param config - the customized configuration
     *
     * @return - new instance of Cache
     */
    createInstance(config: CacheConfig): ICache;
}
export declare const BrowserStorageCache: ICache;
/**
 * @deprecated use named import
 */
export default BrowserStorageCache;
