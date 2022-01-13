import { ICache, Cacheable } from './shared';
export declare class LocalStorageCache implements ICache {
    set<T = Cacheable>(key: string, entry: T): void;
    get<T = Cacheable>(key: string): T;
    remove(key: string): void;
    allKeys(): string[];
}
