import { ICache, Cacheable, CACHE_KEY_PREFIX } from './shared';

export class LocalStorageCache implements ICache {
  public set<T = Cacheable>(key: string, entry: T) {
    localStorage.setItem(key, JSON.stringify(entry));
  }

  public get<T = Cacheable>(key: string) {
    const json = window.localStorage.getItem(key);

    if (!json) return;

    try {
      const payload = JSON.parse(json) as T;
      return payload;
    } catch (e) {
      /* istanbul ignore next */
      return;
    }
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public allKeys() {
    return Object.keys(window.localStorage).filter(key =>
      key.startsWith(CACHE_KEY_PREFIX)
    );
  }
}
