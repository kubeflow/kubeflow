import { StorageCache } from './StorageCache';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ICache } from './types';
export declare class AsyncStorageCache extends StorageCache implements ICache {
    /**
     * initialize the cache
     *
     * @param {Object} config - the configuration of the cache
     */
    constructor(config?: any);
    /**
     * decrease current size of the cache
     * @private
     * @param amount - the amount of the cache size which needs to be decreased
     */
    _decreaseCurSizeInBytes(amount: any): Promise<void>;
    /**
     * increase current size of the cache
     * @private
     * @param amount - the amount of the cache szie which need to be increased
     */
    _increaseCurSizeInBytes(amount: any): Promise<void>;
    /**
     * update the visited time if item has been visited
     * @private
     * @param item - the item which need to be refreshed
     * @param prefixedKey - the key of the item
     *
     * @return the refreshed item
     */
    _refreshItem(item: any, prefixedKey: any): Promise<any>;
    /**
     * check wether item is expired
     * @private
     * @param key - the key of the item
     *
     * @return true if the item is expired.
     */
    _isExpired(key: any): Promise<boolean>;
    /**
     * delete item from cache
     * @private
     * @param prefixedKey - the key of the item
     * @param size - optional, the byte size of the item
     */
    _removeItem(prefixedKey: any, size?: any): Promise<void>;
    /**
     * put item into cache
     * @private
     * @param prefixedKey - the key of the item
     * @param itemData - the value of the item
     * @param itemSizeInBytes - the byte size of the item
     */
    _setItem(prefixedKey: any, item: any): Promise<void>;
    /**
     * total space needed when poping out items
     * @private
     * @param itemSize
     *
     * @return total space needed
     */
    _sizeToPop(itemSize: any): Promise<number>;
    /**
     * see whether cache is full
     * @private
     * @param itemSize
     *
     * @return true if cache is full
     */
    _isCacheFull(itemSize: any): Promise<boolean>;
    /**
     * scan the storage and find out all the keys owned by this cache
     * also clean the expired keys while scanning
     * @private
     * @return array of keys
     */
    _findValidKeys(): Promise<any[]>;
    /**
     * get all the items we have, sort them by their priority,
     * if priority is same, sort them by their last visited time
     * pop out items from the low priority (5 is the lowest)
     * @private
     * @param keys - all the keys in this cache
     * @param sizeToPop - the total size of the items which needed to be poped out
     */
    _popOutItems(keys: any, sizeToPop: any): Promise<void>;
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
     * @param {String} key - the key of the item
     * @param {Object} value - the value of the item
     * @param {Object} [options] - optional, the specified meta-data
     * @return {Prmoise}
     */
    setItem(key: any, value: any, options: any): Promise<void>;
    /**
     * Get item from cache. It will return null if item doesn’t exist or it has been expired.
     * If you specified callback function in the options,
     * then the function will be executed if no such item in the cache
     * and finally put the return value into cache.
     * Please make sure the callback function will return the value you want to put into the cache.
     * The cache will abort output a warning:
     * If the key is invalid
     * If error happened with AsyncStorage
     *
     * @param {String} key - the key of the item
     * @param {Object} [options] - the options of callback function
     * @return {Promise} - return a promise resolves to be the value of the item
     */
    getItem(key: any, options: any): Promise<any>;
    /**
     * remove item from the cache
     * The cache will abort output a warning:
     * If error happened with AsyncStorage
     * @param {String} key - the key of the item
     * @return {Promise}
     */
    removeItem(key: any): Promise<void>;
    /**
     * clear the entire cache
     * The cache will abort output a warning:
     * If error happened with AsyncStorage
     * @return {Promise}
     */
    clear(): Promise<void>;
    /**
     * return the current size of the cache
     * @return {Promise}
     */
    getCacheCurSize(): Promise<number>;
    /**
     * Return all the keys in the cache.
     * Will return an empty array if error happend.
     * @return {Promise}
     */
    getAllKeys(): Promise<any[]>;
    /**
     * Return a new instance of cache with customized configuration.
     * @param {Object} config - the customized configuration
     * @return {Object} - the new instance of Cache
     */
    createInstance(config: any): ICache;
}
declare const instance: ICache;
export { AsyncStorage, instance as Cache };
export default instance;
