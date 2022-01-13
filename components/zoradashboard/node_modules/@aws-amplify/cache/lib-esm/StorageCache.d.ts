import { CacheConfig, CacheItem, CacheItemOptions } from './types';
/**
 * Initialization of the cache
 *
 */
export declare class StorageCache {
    protected cacheCurSizeKey: string;
    protected config: CacheConfig;
    /**
     * Initialize the cache
     * @param config - the configuration of the cache
     */
    constructor(config: CacheConfig);
    getModuleName(): string;
    private checkConfig;
    /**
     * produce a JSON object with meta-data and data value
     * @param value - the value of the item
     * @param options - optional, the specified meta-data
     *
     * @return - the item which has the meta-data and the value
     */
    protected fillCacheItem(key: string, value: object | number | string | boolean, options: CacheItemOptions): CacheItem;
    /**
     * set cache with customized configuration
     * @param config - customized configuration
     *
     * @return - the current configuration
     */
    configure(config?: CacheConfig): CacheConfig;
}
/**
 * @deprecated use named import
 */
export default StorageCache;
