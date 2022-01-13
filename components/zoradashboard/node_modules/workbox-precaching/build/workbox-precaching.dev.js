this.workbox = this.workbox || {};
this.workbox.precaching = (function (exports, cacheNames_js, getFriendlyURL_js, logger_js, assert_js, cacheWrapper_js, fetchWrapper_js, WorkboxError_js, copyResponse_js) {
    'use strict';

    try {
      self['workbox:precaching:5.1.4'] && _();
    } catch (e) {}

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    const plugins = [];
    const precachePlugins = {
      /*
       * @return {Array}
       * @private
       */
      get() {
        return plugins;
      },

      /*
       * @param {Array} newPlugins
       * @private
       */
      add(newPlugins) {
        plugins.push(...newPlugins);
      }

    };

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Adds plugins to precaching.
     *
     * @param {Array<Object>} newPlugins
     *
     * @memberof module:workbox-precaching
     */

    function addPlugins(newPlugins) {
      precachePlugins.add(newPlugins);
    }

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    const REVISION_SEARCH_PARAM = '__WB_REVISION__';
    /**
     * Converts a manifest entry into a versioned URL suitable for precaching.
     *
     * @param {Object|string} entry
     * @return {string} A URL with versioning info.
     *
     * @private
     * @memberof module:workbox-precaching
     */

    function createCacheKey(entry) {
      if (!entry) {
        throw new WorkboxError_js.WorkboxError('add-to-cache-list-unexpected-type', {
          entry
        });
      } // If a precache manifest entry is a string, it's assumed to be a versioned
      // URL, like '/app.abcd1234.js'. Return as-is.


      if (typeof entry === 'string') {
        const urlObject = new URL(entry, location.href);
        return {
          cacheKey: urlObject.href,
          url: urlObject.href
        };
      }

      const {
        revision,
        url
      } = entry;

      if (!url) {
        throw new WorkboxError_js.WorkboxError('add-to-cache-list-unexpected-type', {
          entry
        });
      } // If there's just a URL and no revision, then it's also assumed to be a
      // versioned URL.


      if (!revision) {
        const urlObject = new URL(url, location.href);
        return {
          cacheKey: urlObject.href,
          url: urlObject.href
        };
      } // Otherwise, construct a properly versioned URL using the custom Workbox
      // search parameter along with the revision info.


      const cacheKeyURL = new URL(url, location.href);
      const originalURL = new URL(url, location.href);
      cacheKeyURL.searchParams.set(REVISION_SEARCH_PARAM, revision);
      return {
        cacheKey: cacheKeyURL.href,
        url: originalURL.href
      };
    }

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * @param {string} groupTitle
     * @param {Array<string>} deletedURLs
     *
     * @private
     */

    const logGroup = (groupTitle, deletedURLs) => {
      logger_js.logger.groupCollapsed(groupTitle);

      for (const url of deletedURLs) {
        logger_js.logger.log(url);
      }

      logger_js.logger.groupEnd();
    };
    /**
     * @param {Array<string>} deletedURLs
     *
     * @private
     * @memberof module:workbox-precaching
     */


    function printCleanupDetails(deletedURLs) {
      const deletionCount = deletedURLs.length;

      if (deletionCount > 0) {
        logger_js.logger.groupCollapsed(`During precaching cleanup, ` + `${deletionCount} cached ` + `request${deletionCount === 1 ? ' was' : 's were'} deleted.`);
        logGroup('Deleted Cache Requests', deletedURLs);
        logger_js.logger.groupEnd();
      }
    }

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * @param {string} groupTitle
     * @param {Array<string>} urls
     *
     * @private
     */

    function _nestedGroup(groupTitle, urls) {
      if (urls.length === 0) {
        return;
      }

      logger_js.logger.groupCollapsed(groupTitle);

      for (const url of urls) {
        logger_js.logger.log(url);
      }

      logger_js.logger.groupEnd();
    }
    /**
     * @param {Array<string>} urlsToPrecache
     * @param {Array<string>} urlsAlreadyPrecached
     *
     * @private
     * @memberof module:workbox-precaching
     */


    function printInstallDetails(urlsToPrecache, urlsAlreadyPrecached) {
      const precachedCount = urlsToPrecache.length;
      const alreadyPrecachedCount = urlsAlreadyPrecached.length;

      if (precachedCount || alreadyPrecachedCount) {
        let message = `Precaching ${precachedCount} file${precachedCount === 1 ? '' : 's'}.`;

        if (alreadyPrecachedCount > 0) {
          message += ` ${alreadyPrecachedCount} ` + `file${alreadyPrecachedCount === 1 ? ' is' : 's are'} already cached.`;
        }

        logger_js.logger.groupCollapsed(message);

        _nestedGroup(`View newly precached URLs.`, urlsToPrecache);

        _nestedGroup(`View previously precached URLs.`, urlsAlreadyPrecached);

        logger_js.logger.groupEnd();
      }
    }

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Performs efficient precaching of assets.
     *
     * @memberof module:workbox-precaching
     */

    class PrecacheController {
      /**
       * Create a new PrecacheController.
       *
       * @param {string} [cacheName] An optional name for the cache, to override
       * the default precache name.
       */
      constructor(cacheName) {
        this._cacheName = cacheNames_js.cacheNames.getPrecacheName(cacheName);
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


      addToCacheList(entries) {
        {
          assert_js.assert.isArray(entries, {
            moduleName: 'workbox-precaching',
            className: 'PrecacheController',
            funcName: 'addToCacheList',
            paramName: 'entries'
          });
        }

        const urlsToWarnAbout = [];

        for (const entry of entries) {
          // See https://github.com/GoogleChrome/workbox/issues/2259
          if (typeof entry === 'string') {
            urlsToWarnAbout.push(entry);
          } else if (entry && entry.revision === undefined) {
            urlsToWarnAbout.push(entry.url);
          }

          const {
            cacheKey,
            url
          } = createCacheKey(entry);
          const cacheMode = typeof entry !== 'string' && entry.revision ? 'reload' : 'default';

          if (this._urlsToCacheKeys.has(url) && this._urlsToCacheKeys.get(url) !== cacheKey) {
            throw new WorkboxError_js.WorkboxError('add-to-cache-list-conflicting-entries', {
              firstEntry: this._urlsToCacheKeys.get(url),
              secondEntry: cacheKey
            });
          }

          if (typeof entry !== 'string' && entry.integrity) {
            if (this._cacheKeysToIntegrities.has(cacheKey) && this._cacheKeysToIntegrities.get(cacheKey) !== entry.integrity) {
              throw new WorkboxError_js.WorkboxError('add-to-cache-list-conflicting-integrities', {
                url
              });
            }

            this._cacheKeysToIntegrities.set(cacheKey, entry.integrity);
          }

          this._urlsToCacheKeys.set(url, cacheKey);

          this._urlsToCacheModes.set(url, cacheMode);

          if (urlsToWarnAbout.length > 0) {
            const warningMessage = `Workbox is precaching URLs without revision ` + `info: ${urlsToWarnAbout.join(', ')}\nThis is generally NOT safe. ` + `Learn more at https://bit.ly/wb-precache`;

            {
              logger_js.logger.warn(warningMessage);
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


      async install({
        event,
        plugins
      } = {}) {
        {
          if (plugins) {
            assert_js.assert.isArray(plugins, {
              moduleName: 'workbox-precaching',
              className: 'PrecacheController',
              funcName: 'install',
              paramName: 'plugins'
            });
          }
        }

        const toBePrecached = [];
        const alreadyPrecached = [];
        const cache = await self.caches.open(this._cacheName);
        const alreadyCachedRequests = await cache.keys();
        const existingCacheKeys = new Set(alreadyCachedRequests.map(request => request.url));

        for (const [url, cacheKey] of this._urlsToCacheKeys) {
          if (existingCacheKeys.has(cacheKey)) {
            alreadyPrecached.push(url);
          } else {
            toBePrecached.push({
              cacheKey,
              url
            });
          }
        }

        const precacheRequests = toBePrecached.map(({
          cacheKey,
          url
        }) => {
          const integrity = this._cacheKeysToIntegrities.get(cacheKey);

          const cacheMode = this._urlsToCacheModes.get(url);

          return this._addURLToCache({
            cacheKey,
            cacheMode,
            event,
            integrity,
            plugins,
            url
          });
        });
        await Promise.all(precacheRequests);
        const updatedURLs = toBePrecached.map(item => item.url);

        {
          printInstallDetails(updatedURLs, alreadyPrecached);
        }

        return {
          updatedURLs,
          notUpdatedURLs: alreadyPrecached
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

        {
          printCleanupDetails(deletedURLs);
        }

        return {
          deletedURLs
        };
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


      async _addURLToCache({
        cacheKey,
        url,
        cacheMode,
        event,
        plugins,
        integrity
      }) {
        const request = new Request(url, {
          integrity,
          cache: cacheMode,
          credentials: 'same-origin'
        });
        let response = await fetchWrapper_js.fetchWrapper.fetch({
          event,
          plugins,
          request
        }); // Allow developers to override the default logic about what is and isn't
        // valid by passing in a plugin implementing cacheWillUpdate(), e.g.
        // a `CacheableResponsePlugin` instance.

        let cacheWillUpdatePlugin;

        for (const plugin of plugins || []) {
          if ('cacheWillUpdate' in plugin) {
            cacheWillUpdatePlugin = plugin;
          }
        }

        const isValidResponse = cacheWillUpdatePlugin ? // Use a callback if provided. It returns a truthy value if valid.
        // NOTE: invoke the method on the plugin instance so the `this` context
        // is correct.
        await cacheWillUpdatePlugin.cacheWillUpdate({
          event,
          request,
          response
        }) : // Otherwise, default to considering any response status under 400 valid.
        // This includes, by default, considering opaque responses valid.
        response.status < 400; // Consider this a failure, leading to the `install` handler failing, if
        // we get back an invalid response.

        if (!isValidResponse) {
          throw new WorkboxError_js.WorkboxError('bad-precaching-response', {
            url,
            status: response.status
          });
        } // Redirected responses cannot be used to satisfy a navigation request, so
        // any redirected response must be "copied" rather than cloned, so the new
        // response doesn't contain the `redirected` flag. See:
        // https://bugs.chromium.org/p/chromium/issues/detail?id=669363&desc=2#c1


        if (response.redirected) {
          response = await copyResponse_js.copyResponse(response);
        }

        await cacheWrapper_js.cacheWrapper.put({
          event,
          plugins,
          response,
          // `request` already uses `url`. We may be able to reuse it.
          request: cacheKey === url ? request : new Request(cacheKey),
          cacheName: this._cacheName,
          matchOptions: {
            ignoreSearch: true
          }
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


      getCacheKeyForURL(url) {
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


      async matchPrecache(request) {
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


      createHandler(fallbackToNetwork = true) {
        return async ({
          request
        }) => {
          try {
            const response = await this.matchPrecache(request);

            if (response) {
              return response;
            } // This shouldn't normally happen, but there are edge cases:
            // https://github.com/GoogleChrome/workbox/issues/1441


            throw new WorkboxError_js.WorkboxError('missing-precache-entry', {
              cacheName: this._cacheName,
              url: request instanceof Request ? request.url : request
            });
          } catch (error) {
            if (fallbackToNetwork) {
              {
                logger_js.logger.debug(`Unable to respond with precached response. ` + `Falling back to network.`, error);
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


      createHandlerBoundToURL(url, fallbackToNetwork = true) {
        const cacheKey = this.getCacheKeyForURL(url);

        if (!cacheKey) {
          throw new WorkboxError_js.WorkboxError('non-precached-url', {
            url
          });
        }

        const handler = this.createHandler(fallbackToNetwork);
        const request = new Request(url);
        return () => handler({
          request
        });
      }

    }

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    let precacheController;
    /**
     * @return {PrecacheController}
     * @private
     */

    const getOrCreatePrecacheController = () => {
      if (!precacheController) {
        precacheController = new PrecacheController();
      }

      return precacheController;
    };

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Removes any URL search parameters that should be ignored.
     *
     * @param {URL} urlObject The original URL.
     * @param {Array<RegExp>} ignoreURLParametersMatching RegExps to test against
     * each search parameter name. Matches mean that the search parameter should be
     * ignored.
     * @return {URL} The URL with any ignored search parameters removed.
     *
     * @private
     * @memberof module:workbox-precaching
     */

    function removeIgnoredSearchParams(urlObject, ignoreURLParametersMatching = []) {
      // Convert the iterable into an array at the start of the loop to make sure
      // deletion doesn't mess up iteration.
      for (const paramName of [...urlObject.searchParams.keys()]) {
        if (ignoreURLParametersMatching.some(regExp => regExp.test(paramName))) {
          urlObject.searchParams.delete(paramName);
        }
      }

      return urlObject;
    }

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Generator function that yields possible variations on the original URL to
     * check, one at a time.
     *
     * @param {string} url
     * @param {Object} options
     *
     * @private
     * @memberof module:workbox-precaching
     */

    function* generateURLVariations(url, {
      ignoreURLParametersMatching,
      directoryIndex,
      cleanURLs,
      urlManipulation
    } = {}) {
      const urlObject = new URL(url, location.href);
      urlObject.hash = '';
      yield urlObject.href;
      const urlWithoutIgnoredParams = removeIgnoredSearchParams(urlObject, ignoreURLParametersMatching);
      yield urlWithoutIgnoredParams.href;

      if (directoryIndex && urlWithoutIgnoredParams.pathname.endsWith('/')) {
        const directoryURL = new URL(urlWithoutIgnoredParams.href);
        directoryURL.pathname += directoryIndex;
        yield directoryURL.href;
      }

      if (cleanURLs) {
        const cleanURL = new URL(urlWithoutIgnoredParams.href);
        cleanURL.pathname += '.html';
        yield cleanURL.href;
      }

      if (urlManipulation) {
        const additionalURLs = urlManipulation({
          url: urlObject
        });

        for (const urlToAttempt of additionalURLs) {
          yield urlToAttempt.href;
        }
      }
    }

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * This function will take the request URL and manipulate it based on the
     * configuration options.
     *
     * @param {string} url
     * @param {Object} options
     * @return {string} Returns the URL in the cache that matches the request,
     * if possible.
     *
     * @private
     */

    const getCacheKeyForURL = (url, options) => {
      const precacheController = getOrCreatePrecacheController();
      const urlsToCacheKeys = precacheController.getURLsToCacheKeys();

      for (const possibleURL of generateURLVariations(url, options)) {
        const possibleCacheKey = urlsToCacheKeys.get(possibleURL);

        if (possibleCacheKey) {
          return possibleCacheKey;
        }
      }
    };

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Adds a `fetch` listener to the service worker that will
     * respond to
     * [network requests]{@link https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Custom_responses_to_requests}
     * with precached assets.
     *
     * Requests for assets that aren't precached, the `FetchEvent` will not be
     * responded to, allowing the event to fall through to other `fetch` event
     * listeners.
     *
     * NOTE: when called more than once this method will replace the previously set
     * configuration options. Calling it more than once is not recommended outside
     * of tests.
     *
     * @private
     * @param {Object} [options]
     * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
     * check cache entries for a URLs ending with '/' to see if there is a hit when
     * appending the `directoryIndex` value.
     * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/]] An
     * array of regex's to remove search params when looking for a cache match.
     * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
     * check the cache for the URL with a `.html` added to the end of the end.
     * @param {workbox.precaching~urlManipulation} [options.urlManipulation]
     * This is a function that should take a URL and return an array of
     * alternative URLs that should be checked for precache matches.
     */

    const addFetchListener = ({
      ignoreURLParametersMatching = [/^utm_/],
      directoryIndex = 'index.html',
      cleanURLs = true,
      urlManipulation
    } = {}) => {
      const cacheName = cacheNames_js.cacheNames.getPrecacheName(); // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705

      self.addEventListener('fetch', event => {
        const precachedURL = getCacheKeyForURL(event.request.url, {
          cleanURLs,
          directoryIndex,
          ignoreURLParametersMatching,
          urlManipulation
        });

        if (!precachedURL) {
          {
            logger_js.logger.debug(`Precaching did not find a match for ` + getFriendlyURL_js.getFriendlyURL(event.request.url));
          }

          return;
        }

        let responsePromise = self.caches.open(cacheName).then(cache => {
          return cache.match(precachedURL);
        }).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          } // Fall back to the network if we don't have a cached response
          // (perhaps due to manual cache cleanup).


          {
            logger_js.logger.warn(`The precached response for ` + `${getFriendlyURL_js.getFriendlyURL(precachedURL)} in ${cacheName} was not found. ` + `Falling back to the network instead.`);
          }

          return fetch(precachedURL);
        });

        {
          responsePromise = responsePromise.then(response => {
            // Workbox is going to handle the route.
            // print the routing details to the console.
            logger_js.logger.groupCollapsed(`Precaching is responding to: ` + getFriendlyURL_js.getFriendlyURL(event.request.url));
            logger_js.logger.log(`Serving the precached url: ${precachedURL}`);
            logger_js.logger.groupCollapsed(`View request details here.`);
            logger_js.logger.log(event.request);
            logger_js.logger.groupEnd();
            logger_js.logger.groupCollapsed(`View response details here.`);
            logger_js.logger.log(response);
            logger_js.logger.groupEnd();
            logger_js.logger.groupEnd();
            return response;
          });
        }

        event.respondWith(responsePromise);
      });
    };

    /*
      Copyright 2019 Google LLC
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    let listenerAdded = false;
    /**
     * Add a `fetch` listener to the service worker that will
     * respond to
     * [network requests]{@link https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Custom_responses_to_requests}
     * with precached assets.
     *
     * Requests for assets that aren't precached, the `FetchEvent` will not be
     * responded to, allowing the event to fall through to other `fetch` event
     * listeners.
     *
     * @param {Object} [options]
     * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
     * check cache entries for a URLs ending with '/' to see if there is a hit when
     * appending the `directoryIndex` value.
     * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/]] An
     * array of regex's to remove search params when looking for a cache match.
     * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
     * check the cache for the URL with a `.html` added to the end of the end.
     * @param {module:workbox-precaching~urlManipulation} [options.urlManipulation]
     * This is a function that should take a URL and return an array of
     * alternative URLs that should be checked for precache matches.
     *
     * @memberof module:workbox-precaching
     */

    function addRoute(options) {
      if (!listenerAdded) {
        addFetchListener(options);
        listenerAdded = true;
      }
    }

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    const SUBSTRING_TO_FIND = '-precache-';
    /**
     * Cleans up incompatible precaches that were created by older versions of
     * Workbox, by a service worker registered under the current scope.
     *
     * This is meant to be called as part of the `activate` event.
     *
     * This should be safe to use as long as you don't include `substringToFind`
     * (defaulting to `-precache-`) in your non-precache cache names.
     *
     * @param {string} currentPrecacheName The cache name currently in use for
     * precaching. This cache won't be deleted.
     * @param {string} [substringToFind='-precache-'] Cache names which include this
     * substring will be deleted (excluding `currentPrecacheName`).
     * @return {Array<string>} A list of all the cache names that were deleted.
     *
     * @private
     * @memberof module:workbox-precaching
     */

    const deleteOutdatedCaches = async (currentPrecacheName, substringToFind = SUBSTRING_TO_FIND) => {
      const cacheNames = await self.caches.keys();
      const cacheNamesToDelete = cacheNames.filter(cacheName => {
        return cacheName.includes(substringToFind) && cacheName.includes(self.registration.scope) && cacheName !== currentPrecacheName;
      });
      await Promise.all(cacheNamesToDelete.map(cacheName => self.caches.delete(cacheName)));
      return cacheNamesToDelete;
    };

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Adds an `activate` event listener which will clean up incompatible
     * precaches that were created by older versions of Workbox.
     *
     * @memberof module:workbox-precaching
     */

    function cleanupOutdatedCaches() {
      // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
      self.addEventListener('activate', event => {
        const cacheName = cacheNames_js.cacheNames.getPrecacheName();
        event.waitUntil(deleteOutdatedCaches(cacheName).then(cachesDeleted => {
          {
            if (cachesDeleted.length > 0) {
              logger_js.logger.log(`The following out-of-date precaches were cleaned up ` + `automatically:`, cachesDeleted);
            }
          }
        }));
      });
    }

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Helper function that calls
     * {@link PrecacheController#createHandler} on the default
     * {@link PrecacheController} instance.
     *
     * If you are creating your own {@link PrecacheController}, then call the
     * {@link PrecacheController#createHandler} on that instance,
     * instead of using this function.
     *
     * @param {boolean} [fallbackToNetwork=true] Whether to attempt to get the
     * response from the network if there's a precache miss.
     * @return {module:workbox-routing~handlerCallback}
     *
     * @memberof module:workbox-precaching
     */

    function createHandler(fallbackToNetwork = true) {
      const precacheController = getOrCreatePrecacheController();
      return precacheController.createHandler(fallbackToNetwork);
    }

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Helper function that calls
     * {@link PrecacheController#createHandlerBoundToURL} on the default
     * {@link PrecacheController} instance.
     *
     * If you are creating your own {@link PrecacheController}, then call the
     * {@link PrecacheController#createHandlerBoundToURL} on that instance,
     * instead of using this function.
     *
     * @param {string} url The precached URL which will be used to lookup the
     * `Response`.
     * @param {boolean} [fallbackToNetwork=true] Whether to attempt to get the
     * response from the network if there's a precache miss.
     * @return {module:workbox-routing~handlerCallback}
     *
     * @memberof module:workbox-precaching
     */

    function createHandlerBoundToURL(url) {
      const precacheController = getOrCreatePrecacheController();
      return precacheController.createHandlerBoundToURL(url);
    }

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Takes in a URL, and returns the corresponding URL that could be used to
     * lookup the entry in the precache.
     *
     * If a relative URL is provided, the location of the service worker file will
     * be used as the base.
     *
     * For precached entries without revision information, the cache key will be the
     * same as the original URL.
     *
     * For precached entries with revision information, the cache key will be the
     * original URL with the addition of a query parameter used for keeping track of
     * the revision info.
     *
     * @param {string} url The URL whose cache key to look up.
     * @return {string} The cache key that corresponds to that URL.
     *
     * @memberof module:workbox-precaching
     */

    function getCacheKeyForURL$1(url) {
      const precacheController = getOrCreatePrecacheController();
      return precacheController.getCacheKeyForURL(url);
    }

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Helper function that calls
     * {@link PrecacheController#matchPrecache} on the default
     * {@link PrecacheController} instance.
     *
     * If you are creating your own {@link PrecacheController}, then call
     * {@link PrecacheController#matchPrecache} on that instance,
     * instead of using this function.
     *
     * @param {string|Request} request The key (without revisioning parameters)
     * to look up in the precache.
     * @return {Promise<Response|undefined>}
     *
     * @memberof module:workbox-precaching
     */

    function matchPrecache(request) {
      const precacheController = getOrCreatePrecacheController();
      return precacheController.matchPrecache(request);
    }

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    const installListener = event => {
      const precacheController = getOrCreatePrecacheController();
      const plugins = precachePlugins.get();
      event.waitUntil(precacheController.install({
        event,
        plugins
      }).catch(error => {
        {
          logger_js.logger.error(`Service worker installation failed. It will ` + `be retried automatically during the next navigation.`);
        } // Re-throw the error to ensure installation fails.


        throw error;
      }));
    };

    const activateListener = event => {
      const precacheController = getOrCreatePrecacheController();
      event.waitUntil(precacheController.activate());
    };
    /**
     * Adds items to the precache list, removing any duplicates and
     * stores the files in the
     * ["precache cache"]{@link module:workbox-core.cacheNames} when the service
     * worker installs.
     *
     * This method can be called multiple times.
     *
     * Please note: This method **will not** serve any of the cached files for you.
     * It only precaches files. To respond to a network request you call
     * [addRoute()]{@link module:workbox-precaching.addRoute}.
     *
     * If you have a single array of files to precache, you can just call
     * [precacheAndRoute()]{@link module:workbox-precaching.precacheAndRoute}.
     *
     * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
     *
     * @memberof module:workbox-precaching
     */


    function precache(entries) {
      const precacheController = getOrCreatePrecacheController();
      precacheController.addToCacheList(entries);

      if (entries.length > 0) {
        // NOTE: these listeners will only be added once (even if the `precache()`
        // method is called multiple times) because event listeners are implemented
        // as a set, where each listener must be unique.
        // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
        self.addEventListener('install', installListener);
        self.addEventListener('activate', activateListener);
      }
    }

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * This method will add entries to the precache list and add a route to
     * respond to fetch events.
     *
     * This is a convenience method that will call
     * [precache()]{@link module:workbox-precaching.precache} and
     * [addRoute()]{@link module:workbox-precaching.addRoute} in a single call.
     *
     * @param {Array<Object|string>} entries Array of entries to precache.
     * @param {Object} [options] See
     * [addRoute() options]{@link module:workbox-precaching.addRoute}.
     *
     * @memberof module:workbox-precaching
     */

    function precacheAndRoute(entries, options) {
      precache(entries);
      addRoute(options);
    }

    exports.PrecacheController = PrecacheController;
    exports.addPlugins = addPlugins;
    exports.addRoute = addRoute;
    exports.cleanupOutdatedCaches = cleanupOutdatedCaches;
    exports.createHandler = createHandler;
    exports.createHandlerBoundToURL = createHandlerBoundToURL;
    exports.getCacheKeyForURL = getCacheKeyForURL$1;
    exports.matchPrecache = matchPrecache;
    exports.precache = precache;
    exports.precacheAndRoute = precacheAndRoute;

    return exports;

}({}, workbox.core._private, workbox.core._private, workbox.core._private, workbox.core._private, workbox.core._private, workbox.core._private, workbox.core._private, workbox.core));
//# sourceMappingURL=workbox-precaching.dev.js.map
