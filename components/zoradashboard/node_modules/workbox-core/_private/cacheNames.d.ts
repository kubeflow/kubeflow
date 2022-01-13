import '../_version.js';
export interface CacheNameDetails {
    googleAnalytics: string;
    precache: string;
    prefix: string;
    runtime: string;
    suffix: string;
}
export interface PartialCacheNameDetails {
    [propName: string]: string;
}
export declare type CacheNameDetailsProp = 'googleAnalytics' | 'precache' | 'prefix' | 'runtime' | 'suffix';
export declare const cacheNames: {
    updateDetails: (details: PartialCacheNameDetails) => void;
    getGoogleAnalyticsName: (userCacheName?: string | undefined) => string;
    getPrecacheName: (userCacheName?: string | undefined) => string;
    getPrefix: () => string;
    getRuntimeName: (userCacheName?: string | undefined) => string;
    getSuffix: () => string;
};
