import {
  CACHE_KEY_PREFIX,
  ICache,
  KeyManifestEntry,
  MaybePromise
} from './shared';

export class CacheKeyManifest {
  private readonly manifestKey: string;

  constructor(private cache: ICache, private clientId: string) {
    this.manifestKey = this.createManifestKeyFrom(clientId);
  }

  async add(key: string): Promise<void> {
    const keys = new Set(
      (await this.cache.get<KeyManifestEntry>(this.manifestKey))?.keys || []
    );

    keys.add(key);

    await this.cache.set<KeyManifestEntry>(this.manifestKey, {
      keys: [...keys]
    });
  }

  async remove(key: string): Promise<void> {
    const entry = await this.cache.get<KeyManifestEntry>(this.manifestKey);

    if (entry) {
      const keys = new Set(entry.keys);
      keys.delete(key);

      if (keys.size > 0) {
        return await this.cache.set(this.manifestKey, { keys: [...keys] });
      }

      return await this.cache.remove(this.manifestKey);
    }
  }

  get(): MaybePromise<KeyManifestEntry> {
    return this.cache.get<KeyManifestEntry>(this.manifestKey);
  }

  clear(): MaybePromise<void> {
    return this.cache.remove(this.manifestKey);
  }

  private createManifestKeyFrom(clientId: string): string {
    return `${CACHE_KEY_PREFIX}::${clientId}`;
  }
}
