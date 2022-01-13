import { StorageCache } from './StorageCache';
import { ICache, CacheConfig, CacheItemOptions } from './types';
/**
 * Customized in-memory cache with LRU implemented
 * @member cacheObj - object which store items
 * @member cacheList - list of keys in the cache with LRU
 * @member curSizeInBytes - current size of the cache
 * @member maxPriority - max of the priority
 * @member cacheSizeLimit - the limit of cache size
 */
export declare class InMemoryCacheClass extends StorageCache implements ICache {
    private cacheList;
    private curSizeInBytes;
    private maxPriority;
    private cacheSizeLimit;
    /**
     * initialize the cache
     *
     * @param config - the configuration of the cache
     */
    constructor(config?: CacheConfig);
    /**
     * decrease current size of the cache
     *
     * @param amount - the amount of the cache size which needs to be decreased
     */
    private _decreaseCurSizeInBytes;
    /**
     * increase current size of the cache
     *
     * @param amount - the amount of the cache szie which need to be increased
     */
    private _increaseCurSizeInBytes;
    /**
     * check whether item is expired
     *
     * @param key - the key of the item
     *
     * @return true if the item is expired.
     */
    private _isExpired;
    /**
     * delete item from cache
     *
     * @param prefixedKey - the key of the item
     * @param listIdx - indicates which cache list the key belongs to
     */
    private _removeItem;
    /**
     * put item into cache
     *
     * @param prefixedKey - the key of the item
     * @param itemData - the value of the item
     * @param itemSizeInBytes - the byte size of the item
     * @param listIdx - indicates which cache list the key belongs to
     */
    private _setItem;
    /**
     * see whether cache is full
     *
     * @param itemSize
     *
     * @return true if cache is full
     */
    private _isCacheFull;
    /**
     * check whether the cache contains the key
     *
     * @param key
     */
    private containsKey;
    /**
     * * Set item into cache. You can put number, string, boolean or object.
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
     * @param options - optional, the specified meta-data
     *
     * @throws if the item is too big which exceeds the limit of single item size
     * @throws if the key is invalid
     */
    setItem(key: string, value: object | string | number | boolean, options?: CacheItemOptions): void;
    /**
     * Get item from cache. It will return null if item doesn’t exist or it has been expired.
     * If you specified callback function in the options,
     * then the function will be executed if no such item in the cache
     * and finally put the return value into cache.
     * Please make sure the callback function will return the value you want to put into the cache.
     * The cache will abort output a warning:
     * If the key is invalid
     *
     * @param key - the key of the item
     * @param options - the options of callback function
     */
    getItem(key: string, options?: CacheItemOptions): any;
    /**
     * remove item from the cache
     *
     * @param key - the key of the item
     */
    removeItem(key: string): void;
    /**
     * clear the entire cache
     */
    clear(): void;
    /**
     * Return all the keys in the cache.
     */
    getAllKeys(): string[];
    /**
     * return the current size of the cache
     *
     * @return the current size of the cache
     */
    getCacheCurSize(): number;
    /**
     * Return a new instance of cache with customized configuration.
     * @param config - the customized configuration
     */
    createInstance(config: CacheConfig): ICache;
}
export declare const InMemoryCache: ICache;
/**
 * @deprecated use named import
 */
export default InMemoryCache;
