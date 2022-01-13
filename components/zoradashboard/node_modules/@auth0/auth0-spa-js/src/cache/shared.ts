import { IdToken, User } from '../global';

export const CACHE_KEY_PREFIX = '@@auth0spajs@@';

export type CacheKeyData = {
  audience: string;
  scope: string;
  client_id: string;
};

export class CacheKey {
  public client_id: string;
  public scope: string;
  public audience: string;

  constructor(data: CacheKeyData, public prefix: string = CACHE_KEY_PREFIX) {
    this.client_id = data.client_id;
    this.scope = data.scope;
    this.audience = data.audience;
  }

  /**
   * Converts this `CacheKey` instance into a string for use in a cache
   * @returns A string representation of the key
   */
  toKey(): string {
    return `${this.prefix}::${this.client_id}::${this.audience}::${this.scope}`;
  }

  /**
   * Converts a cache key string into a `CacheKey` instance.
   * @param key The key to convert
   * @returns An instance of `CacheKey`
   */
  static fromKey(key: string): CacheKey {
    const [prefix, client_id, audience, scope] = key.split('::');

    return new CacheKey({ client_id, scope, audience }, prefix);
  }

  /**
   * Utility function to build a `CacheKey` instance from a cache entry
   * @param entry The entry
   * @returns An instance of `CacheKey`
   */
  static fromCacheEntry(entry: CacheEntry): CacheKey {
    const { scope, audience, client_id } = entry;

    return new CacheKey({
      scope,
      audience,
      client_id
    });
  }
}

interface DecodedToken {
  claims: IdToken;
  user: User;
}

export type CacheEntry = {
  id_token: string;
  access_token: string;
  expires_in: number;
  decodedToken: DecodedToken;
  audience: string;
  scope: string;
  client_id: string;
  refresh_token?: string;
};

export type WrappedCacheEntry = {
  body: Partial<CacheEntry>;
  expiresAt: number;
};

export type KeyManifestEntry = {
  keys: string[];
};

export type Cacheable = WrappedCacheEntry | KeyManifestEntry;

export type MaybePromise<T> = Promise<T> | T;

export interface ICache {
  set<T = Cacheable>(key: string, entry: T): MaybePromise<void>;
  get<T = Cacheable>(key: string): MaybePromise<T>;
  remove(key: string): MaybePromise<void>;
  allKeys?(): MaybePromise<string[]>;
}
