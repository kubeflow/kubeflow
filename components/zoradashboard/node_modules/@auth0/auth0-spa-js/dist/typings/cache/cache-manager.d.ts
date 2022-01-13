import { CacheEntry, ICache, CacheKey } from './shared';
export declare class CacheManager {
    private cache;
    private readonly keyManifest?;
    constructor(cache: ICache, clientId: string);
    get(cacheKey: CacheKey, expiryAdjustmentSeconds?: number): Promise<Partial<CacheEntry> | undefined>;
    set(entry: CacheEntry): Promise<void>;
    clear(): Promise<void>;
    /**
     * Note: only call this if you're sure one of our internal (synchronous) caches are being used.
     */
    clearSync(): void;
    private wrapCacheEntry;
    private getCacheKeys;
    /**
     * Finds the corresponding key in the cache based on the provided cache key.
     * The keys inside the cache are in the format {prefix}::{client_id}::{audience}::{scope}.
     * The first key in the cache that satisfies the following conditions is returned
     *  - `prefix` is strict equal to Auth0's internally configured `keyPrefix`
     *  - `client_id` is strict equal to the `cacheKey.client_id`
     *  - `audience` is strict equal to the `cacheKey.audience`
     *  - `scope` contains at least all the `cacheKey.scope` values
     *  *
     * @param keyToMatch The provided cache key
     * @param allKeys A list of existing cache keys
     */
    private matchExistingCacheKey;
}
