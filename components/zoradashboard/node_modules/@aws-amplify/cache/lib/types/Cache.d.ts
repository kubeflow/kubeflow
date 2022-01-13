/**
 * Cache Interface
 */
export interface ICache {
    /** Put item into cache */
    setItem(key: string, value: any, options?: CacheItemOptions): void;
    /** Get item from cache */
    getItem(key: string, options?: CacheItemOptions): any;
    /** Remove item from cache */
    removeItem(key: string): void;
    /** Remove all items from cache */
    clear(): void;
    /** Get all keys form cache */
    getAllKeys(): string[] | Promise<string[]>;
    /** Get current size of the cache */
    getCacheCurSize(): number | Promise<number>;
    /** create a new instance with customized config */
    createInstance(config: CacheConfig): ICache;
    /** change current configuration */
    configure(config: CacheConfig): CacheConfig;
}
/**
 * Cache instance options
 */
export interface CacheConfig {
    /** Prepend to key to avoid conflicts */
    keyPrefix?: string;
    /** Cache capacity, in bytes */
    capacityInBytes?: number;
    /** Max size of one item */
    itemMaxSize?: number;
    /** Time to live, in milliseconds */
    defaultTTL?: number;
    /** Warn when over threshold percentage of capacity, maximum 1 */
    warningThreshold?: number;
    /** default priority number put on cached items */
    defaultPriority?: number;
    storage?: Storage;
    Cache?: Cache;
}
export interface CacheItem {
    key: string;
    data: any;
    timestamp: number;
    visitedTime: number;
    priority: number;
    expires: number;
    type: string;
    byteSize: number;
}
export interface CacheItemOptions {
    priority?: number;
    expires?: number;
    callback?: Function;
}
