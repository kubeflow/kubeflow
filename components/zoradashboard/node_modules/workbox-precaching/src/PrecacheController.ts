/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {assert} from 'workbox-core/_private/assert.js';
import {cacheNames} from 'workbox-core/_private/cacheNames.js';
import {cacheWrapper} from 'workbox-core/_private/cacheWrapper.js';
import {fetchWrapper} from 'workbox-core/_private/fetchWrapper.js';
import {logger} from 'workbox-core/_private/logger.js';
import {WorkboxError} from 'workbox-core/_private/WorkboxError.js';
import {copyResponse} from 'workbox-core/copyResponse.js';
import {RouteHandlerCallback, RouteHandlerCallbackOptions}
    from 'workbox-core/types.js';
import {WorkboxPlugin} from 'workbox-core/types.js';

import {PrecacheEntry} from './_types.js';
import {createCacheKey} from './utils/createCacheKey.js';
import {printCleanupDetails} from './utils/printCleanupDetails.js';
import {printInstallDetails} from './utils/printInstallDetails.js';

import './_version.js';

/**
 * Performs efficient precaching of assets.
 *
 * @memberof module:workbox-precaching
 */
class PrecacheController {
  private readonly _cacheName: string;
  private readonly _urlsToCacheKeys: Map<string, string>;
  private readonly _urlsToCacheModes: Map<string, "reload" | "default" | "no-store" | "no-cache" | "force-cache" | "only-if-cached">;
  private readonly _cacheKeysToIntegrities: Map<string, string>;

  /**
   * Create a new PrecacheController.
   *
   * @param {string} [cacheName] An optional name for the cache, to override
   * the default precache name.
   */
  constructor(cacheName?: string) {
    this._cacheName = cacheNames.getPrecacheName(cacheName);
    this._urlsToCacheKeys = new Map();
    this._urlsToCacheModes = new Map();
    this._cacheKeysToIntegrities = new Map();
  }

  /**
   * This method will add items to the precache list, removing duplicates
   * and ensuring the information is valid.
   *
   * @param {
   * Array<module:workbox-precaching.PrecacheController.PrecacheEntry|string>
   * } entries Array of entries to precache.
   */
  addToCacheList(entries: Array<PrecacheEntry|string>) {
    if (process.env.NODE_ENV !== 'production') {
      assert!.isArray(entries, {
        moduleName: 'workbox-precaching',
        className: 'PrecacheController',
        funcName: 'addToCacheList',
        paramName: 'entries',
      });
    }

    const urlsToWarnAbout: string[] = [];
    for (const entry of entries) {
      // See https://github.com/GoogleChrome/workbox/issues/2259
      if (typeof entry === 'string') {
        urlsToWarnAbout.push(entry);
      } else if (entry && entry.revision === undefined) {
        urlsToWarnAbout.push(entry.url);
      }

      const {cacheKey, url} = createCacheKey(entry);
      const cacheMode = (typeof entry !== 'string' && entry.revision) ?
        'reload' : 'default';

      if (this._urlsToCacheKeys.has(url) &&
          this._urlsToCacheKeys.get(url) !== cacheKey) {
        throw new WorkboxError('add-to-cache-list-conflicting-entries', {
          firstEntry: this._urlsToCacheKeys.get(url),
          secondEntry: cacheKey,
        });
      }

      if (typeof entry !== 'string' && entry.integrity) {
        if (this._cacheKeysToIntegrities.has(cacheKey) &&
            this._cacheKeysToIntegrities.get(cacheKey) !== entry.integrity) {
          throw new WorkboxError('add-to-cache-list-conflicting-integrities', {
            url,
          });
        }
        this._cacheKeysToIntegrities.set(cacheKey, entry.integrity);
      }

      this._urlsToCacheKeys.set(url, cacheKey);
      this._urlsToCacheModes.set(url, cacheMode);

      if (urlsToWarnAbout.length > 0) {
        const warningMessage = `Workbox is precaching URLs without revision ` +
          `info: ${urlsToWarnAbout.join(', ')}\nThis is generally NOT safe. ` +
          `Learn more at https://bit.ly/wb-precache`;
        if (process.env.NODE_ENV === 'production') {
          // Use console directly to display this warning without bloating
          // bundle sizes by pulling in all of the logger codebase in prod.
          console.warn(warningMessage);
        } else {
          logger.warn(warningMessage);
        }
      }
    }
  }

  /**
   * Precaches new and updated assets. Call this method from the service worker
   * install event.
   *
   * @param {Object} options
   * @param {Event} [options.event] The install event (if needed).
   * @param {Array<Object>} [options.plugins] Plugins to be used for fetching
   * and caching during install.
   * @return {Promise<module:workbox-precaching.InstallResult>}
   */
  async install({event, plugins}: {
    event?: ExtendableEvent;
    plugins?: WorkboxPlugin[];
  } = {}) {
    if (process.env.NODE_ENV !== 'production') {
      if (plugins) {
        assert!.isArray(plugins, {
          moduleName: 'workbox-precaching',
          className: 'PrecacheController',
          funcName: 'install',
          paramName: 'plugins',
        });
      }
    }

    const toBePrecached: {cacheKey: string; url: string}[] = [];
    const alreadyPrecached: string[] = [];

    const cache = await self.caches.open(this._cacheName);
    const alreadyCachedRequests = await cache.keys();
    const existingCacheKeys = new Set(alreadyCachedRequests.map(
        (request) => request.url));

    for (const [url, cacheKey] of this._urlsToCacheKeys) {
      if (existingCacheKeys.has(cacheKey)) {
        alreadyPrecached.push(url);
      } else {
        toBePrecached.push({cacheKey, url});
      }
    }

    const precacheRequests = toBePrecached.map(({cacheKey, url}) => {
      const integrity = this._cacheKeysToIntegrities.get(cacheKey);
      const cacheMode = this._urlsToCacheModes.get(url);
      return this._addURLToCache({
        cacheKey,
        cacheMode,
        event,
        integrity,
        plugins,
        url,
      });
    });
    await Promise.all(precacheRequests);

    const updatedURLs = toBePrecached.map((item) => item.url);

    if (process.env.NODE_ENV !== 'production') {
      printInstallDetails(updatedURLs, alreadyPrecached);
    }

    return {
      updatedURLs,
      notUpdatedURLs: alreadyPrecached,
    };
  }

  /**
   * Deletes assets that are no longer present in the current precache manifest.
   * Call this method from the service worker activate event.
   *
   * @return {Promise<module:workbox-precaching.CleanupResult>}
   */
  async activate() {
    const cache = await self.caches.open(this._cacheName);
    const currentlyCachedRequests = await cache.keys();
    const expectedCacheKeys = new Set(this._urlsToCacheKeys.values());

    const deletedURLs = [];
    for (const request of currentlyCachedRequests) {
      if (!expectedCacheKeys.has(request.url)) {
        await cache.delete(request);
        deletedURLs.push(request.url);
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      printCleanupDetails(deletedURLs);
    }

    return {deletedURLs};
  }

  /**
   * Requests the entry and saves it to the cache if the response is valid.
   * By default, any response with a status code of less than 400 (including
   * opaque responses) is considered valid.
   *
   * If you need to use custom criteria to determine what's valid and what
   * isn't, then pass in an item in `options.plugins` that implements the
   * `cacheWillUpdate()` lifecycle event.
   *
   * @private
   * @param {Object} options
   * @param {string} options.cacheKey The string to use a cache key.
   * @param {string} options.url The URL to fetch and cache.
   * @param {string} [options.cacheMode] The cache mode for the network request.
   * @param {Event} [options.event] The install event (if passed).
   * @param {Array<Object>} [options.plugins] An array of plugins to apply to
   * fetch and caching.
   * @param {string} [options.integrity] The value to use for the `integrity`
   * field when making the request.
   */
  async _addURLToCache({cacheKey, url, cacheMode, event, plugins, integrity}: {
    cacheKey: string;
    url: string;
    cacheMode: "reload" | "default" | "no-store" | "no-cache" | "force-cache" | "only-if-cached" | undefined;
    event?: ExtendableEvent;
    plugins?: WorkboxPlugin[];
    integrity?: string;
  }) {
    const request = new Request(url, {
      integrity,
      cache: cacheMode,
      credentials: 'same-origin',
    });

    let response = await fetchWrapper.fetch({
      event,
      plugins,
      request,
    });

    // Allow developers to override the default logic about what is and isn't
    // valid by passing in a plugin implementing cacheWillUpdate(), e.g.
    // a `CacheableResponsePlugin` instance.
    let cacheWillUpdatePlugin;
    for (const plugin of (plugins || [])) {
      if ('cacheWillUpdate' in plugin) {
        cacheWillUpdatePlugin = plugin;
      }
    }

    const isValidResponse = cacheWillUpdatePlugin ?
      // Use a callback if provided. It returns a truthy value if valid.
      // NOTE: invoke the method on the plugin instance so the `this` context
      // is correct.
      await cacheWillUpdatePlugin.cacheWillUpdate!({event, request, response}) :
      // Otherwise, default to considering any response status under 400 valid.
      // This includes, by default, considering opaque responses valid.
      response.status < 400;

    // Consider this a failure, leading to the `install` handler failing, if
    // we get back an invalid response.
    if (!isValidResponse) {
      throw new WorkboxError('bad-precaching-response', {
        url,
        status: response.status,
      });
    }

    // Redirected responses cannot be used to satisfy a navigation request, so
    // any redirected response must be "copied" rather than cloned, so the new
    // response doesn't contain the `redirected` flag. See:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=669363&desc=2#c1
    if (response.redirected) {
      response = await copyResponse(response);
    }

    await cacheWrapper.put({
      event,
      plugins,
      response,
      // `request` already uses `url`. We may be able to reuse it.
      request: cacheKey === url ? request : new Request(cacheKey),
      cacheName: this._cacheName,
      matchOptions: {
        ignoreSearch: true,
      },
    });
  }

  /**
   * Returns a mapping of a precached URL to the corresponding cache key, taking
   * into account the revision information for the URL.
   *
   * @return {Map<string, string>} A URL to cache key mapping.
   */
  getURLsToCacheKeys() {
    return this._urlsToCacheKeys;
  }

  /**
   * Returns a list of all the URLs that have been precached by the current
   * service worker.
   *
   * @return {Array<string>} The precached URLs.
   */
  getCachedURLs() {
    return [...this._urlsToCacheKeys.keys()];
  }

  /**
   * Returns the cache key used for storing a given URL. If that URL is
   * unversioned, like `/index.html', then the cache key will be the original
   * URL with a search parameter appended to it.
   *
   * @param {string} url A URL whose cache key you want to look up.
   * @return {string} The versioned URL that corresponds to a cache key
   * for the original URL, or undefined if that URL isn't precached.
   */
  getCacheKeyForURL(url: string) {
    const urlObject = new URL(url, location.href);
    return this._urlsToCacheKeys.get(urlObject.href);
  }

  /**
   * This acts as a drop-in replacement for [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
   * with the following differences:
   *
   * - It knows what the name of the precache is, and only checks in that cache.
   * - It allows you to pass in an "original" URL without versioning parameters,
   * and it will automatically look up the correct cache key for the currently
   * active revision of that URL.
   *
   * E.g., `matchPrecache('index.html')` will find the correct precached
   * response for the currently active service worker, even if the actual cache
   * key is `'/index.html?__WB_REVISION__=1234abcd'`.
   *
   * @param {string|Request} request The key (without revisioning parameters)
   * to look up in the precache.
   * @return {Promise<Response|undefined>}
   */
  async matchPrecache(request: string|Request): Promise<Response|undefined> {
    const url = request instanceof Request ? request.url : request;
    const cacheKey = this.getCacheKeyForURL(url);
    if (cacheKey) {
      const cache = await self.caches.open(this._cacheName);
      return cache.match(cacheKey);
    }
    return undefined;
  }

  /**
   * Returns a function that can be used within a
   * {@link module:workbox-routing.Route} that will find a response for the
   * incoming request against the precache.
   *
   * If for an unexpected reason there is a cache miss for the request,
   * this will fall back to retrieving the `Response` via `fetch()` when
   * `fallbackToNetwork` is `true`.
   *
   * @param {boolean} [fallbackToNetwork=true] Whether to attempt to get the
   * response from the network if there's a precache miss.
   * @return {module:workbox-routing~handlerCallback}
   */
  createHandler(fallbackToNetwork = true): RouteHandlerCallback {
    return async ({request}: RouteHandlerCallbackOptions) => {
      try {
        const response = await this.matchPrecache(request);
        if (response) {
          return response;
        }

        // This shouldn't normally happen, but there are edge cases:
        // https://github.com/GoogleChrome/workbox/issues/1441
        throw new WorkboxError('missing-precache-entry', {
          cacheName: this._cacheName,
          url: request instanceof Request ? request.url : request,
        });
      } catch (error) {
        if (fallbackToNetwork) {
          if (process.env.NODE_ENV !== 'production') {
            logger.debug(`Unable to respond with precached response. ` +
                `Falling back to network.`, error);
          }
          return fetch(request);
        }

        throw error;
      }
    };
  }

  /**
   * Returns a function that looks up `url` in the precache (taking into
   * account revision information), and returns the corresponding `Response`.
   *
   * If for an unexpected reason there is a cache miss when looking up `url`,
   * this will fall back to retrieving the `Response` via `fetch()` when
   * `fallbackToNetwork` is `true`.
   *
   * @param {string} url The precached URL which will be used to lookup the
   * `Response`.
   * @param {boolean} [fallbackToNetwork=true] Whether to attempt to get the
   * response from the network if there's a precache miss.
   * @return {module:workbox-routing~handlerCallback}
   */
  createHandlerBoundToURL(url: string, fallbackToNetwork = true): RouteHandlerCallback {
    const cacheKey = this.getCacheKeyForURL(url);
    if (!cacheKey) {
      throw new WorkboxError('non-precached-url', {url});
    }

    const handler = this.createHandler(fallbackToNetwork);
    const request = new Request(url);
    return () => handler({request});
  }
}

export {PrecacheController};
