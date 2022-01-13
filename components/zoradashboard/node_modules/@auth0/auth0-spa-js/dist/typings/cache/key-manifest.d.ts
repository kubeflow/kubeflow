import { ICache, KeyManifestEntry, MaybePromise } from './shared';
export declare class CacheKeyManifest {
    private cache;
    private clientId;
    private readonly manifestKey;
    constructor(cache: ICache, clientId: string);
    add(key: string): Promise<void>;
    remove(key: string): Promise<void>;
    get(): MaybePromise<KeyManifestEntry>;
    clear(): MaybePromise<void>;
    private createManifestKeyFrom;
}
