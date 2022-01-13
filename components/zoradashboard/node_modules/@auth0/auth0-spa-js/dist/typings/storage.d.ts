interface ClientStorageOptions {
    daysUntilExpire: number;
}
/**
 * Defines a type that handles storage to/from a storage location
 */
export declare type ClientStorage = {
    get<T extends Object>(key: string): T;
    save(key: string, value: any, options?: ClientStorageOptions): void;
    remove(key: string): void;
};
/**
 * A storage protocol for marshalling data to/from cookies
 */
export declare const CookieStorage: ClientStorage;
/**
 * Cookie storage that creates a cookie for modern and legacy browsers.
 * See: https://web.dev/samesite-cookie-recipes/#handling-incompatible-clients
 */
export declare const CookieStorageWithLegacySameSite: ClientStorage;
/**
 * A storage protocol for marshalling data to/from session storage
 */
export declare const SessionStorage: ClientStorage;
export {};
