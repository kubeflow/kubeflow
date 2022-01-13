this.workbox = this.workbox || {};
this.workbox.core = (function (exports) {
    'use strict';

    try {
      self['workbox:core:5.1.4'] && _();
    } catch (e) {}

    /*
      Copyright 2019 Google LLC
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    const logger =  (() => {
      // Don't overwrite this value if it's already set.
      // See https://github.com/GoogleChrome/workbox/pull/2284#issuecomment-560470923
      if (!('__WB_DISABLE_DEV_LOGS' in self)) {
        self.__WB_DISABLE_DEV_LOGS = false;
      }

      let inGroup = false;
      const methodToColorMap = {
        debug: `#7f8c8d`,
        log: `#2ecc71`,
        warn: `#f39c12`,
        error: `#c0392b`,
        groupCollapsed: `#3498db`,
        groupEnd: null
      };

      const print = function (method, args) {
        if (self.__WB_DISABLE_DEV_LOGS) {
          return;
        }

        if (method === 'groupCollapsed') {
          // Safari doesn't print all console.groupCollapsed() arguments:
          // https://bugs.webkit.org/show_bug.cgi?id=182754
          if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            console[method](...args);
            return;
          }
        }

        const styles = [`background: ${methodToColorMap[method]}`, `border-radius: 0.5em`, `color: white`, `font-weight: bold`, `padding: 2px 0.5em`]; // When in a group, the workbox prefix is not displayed.

        const logPrefix = inGroup ? [] : ['%cworkbox', styles.join(';')];
        console[method](...logPrefix, ...args);

        if (method === 'groupCollapsed') {
          inGroup = true;
        }

        if (method === 'groupEnd') {
          inGroup = false;
        }
      };

      const api = {};
      const loggerMethods = Object.keys(methodToColorMap);

      for (const key of loggerMethods) {
        const method = key;

        api[method] = (...args) => {
          print(method, args);
        };
      }

      return api;
    })();

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    const messages = {
      'invalid-value': ({
        paramName,
        validValueDescription,
        value
      }) => {
        if (!paramName || !validValueDescription) {
          throw new Error(`Unexpected input to 'invalid-value' error.`);
        }

        return `The '${paramName}' parameter was given a value with an ` + `unexpected value. ${validValueDescription} Received a value of ` + `${JSON.stringify(value)}.`;
      },
      'not-an-array': ({
        moduleName,
        className,
        funcName,
        paramName
      }) => {
        if (!moduleName || !className || !funcName || !paramName) {
          throw new Error(`Unexpected input to 'not-an-array' error.`);
        }

        return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className}.${funcName}()' must be an array.`;
      },
      'incorrect-type': ({
        expectedType,
        paramName,
        moduleName,
        className,
        funcName
      }) => {
        if (!expectedType || !paramName || !moduleName || !funcName) {
          throw new Error(`Unexpected input to 'incorrect-type' error.`);
        }

        return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className ? className + '.' : ''}` + `${funcName}()' must be of type ${expectedType}.`;
      },
      'incorrect-class': ({
        expectedClass,
        paramName,
        moduleName,
        className,
        funcName,
        isReturnValueProblem
      }) => {
        if (!expectedClass || !moduleName || !funcName) {
          throw new Error(`Unexpected input to 'incorrect-class' error.`);
        }

        if (isReturnValueProblem) {
          return `The return value from ` + `'${moduleName}.${className ? className + '.' : ''}${funcName}()' ` + `must be an instance of class ${expectedClass.name}.`;
        }

        return `The parameter '${paramName}' passed into ` + `'${moduleName}.${className ? className + '.' : ''}${funcName}()' ` + `must be an instance of class ${expectedClass.name}.`;
      },
      'missing-a-method': ({
        expectedMethod,
        paramName,
        moduleName,
        className,
        funcName
      }) => {
        if (!expectedMethod || !paramName || !moduleName || !className || !funcName) {
          throw new Error(`Unexpected input to 'missing-a-method' error.`);
        }

        return `${moduleName}.${className}.${funcName}() expected the ` + `'${paramName}' parameter to expose a '${expectedMethod}' method.`;
      },
      'add-to-cache-list-unexpected-type': ({
        entry
      }) => {
        return `An unexpected entry was passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' The entry ` + `'${JSON.stringify(entry)}' isn't supported. You must supply an array of ` + `strings with one or more characters, objects with a url property or ` + `Request objects.`;
      },
      'add-to-cache-list-conflicting-entries': ({
        firstEntry,
        secondEntry
      }) => {
        if (!firstEntry || !secondEntry) {
          throw new Error(`Unexpected input to ` + `'add-to-cache-list-duplicate-entries' error.`);
        }

        return `Two of the entries passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` + `${firstEntry._entryId} but different revision details. Workbox is ` + `unable to cache and version the asset correctly. Please remove one ` + `of the entries.`;
      },
      'plugin-error-request-will-fetch': ({
        thrownError
      }) => {
        if (!thrownError) {
          throw new Error(`Unexpected input to ` + `'plugin-error-request-will-fetch', error.`);
        }

        return `An error was thrown by a plugins 'requestWillFetch()' method. ` + `The thrown error message was: '${thrownError.message}'.`;
      },
      'invalid-cache-name': ({
        cacheNameId,
        value
      }) => {
        if (!cacheNameId) {
          throw new Error(`Expected a 'cacheNameId' for error 'invalid-cache-name'`);
        }

        return `You must provide a name containing at least one character for ` + `setCacheDetails({${cacheNameId}: '...'}). Received a value of ` + `'${JSON.stringify(value)}'`;
      },
      'unregister-route-but-not-found-with-method': ({
        method
      }) => {
        if (!method) {
          throw new Error(`Unexpected input to ` + `'unregister-route-but-not-found-with-method' error.`);
        }

        return `The route you're trying to unregister was not  previously ` + `registered for the method type '${method}'.`;
      },
      'unregister-route-route-not-registered': () => {
        return `The route you're trying to unregister was not previously ` + `registered.`;
      },
      'queue-replay-failed': ({
        name
      }) => {
        return `Replaying the background sync queue '${name}' failed.`;
      },
      'duplicate-queue-name': ({
        name
      }) => {
        return `The Queue name '${name}' is already being used. ` + `All instances of backgroundSync.Queue must be given unique names.`;
      },
      'expired-test-without-max-age': ({
        methodName,
        paramName
      }) => {
        return `The '${methodName}()' method can only be used when the ` + `'${paramName}' is used in the constructor.`;
      },
      'unsupported-route-type': ({
        moduleName,
        className,
        funcName,
        paramName
      }) => {
        return `The supplied '${paramName}' parameter was an unsupported type. ` + `Please check the docs for ${moduleName}.${className}.${funcName} for ` + `valid input types.`;
      },
      'not-array-of-class': ({
        value,
        expectedClass,
        moduleName,
        className,
        funcName,
        paramName
      }) => {
        return `The supplied '${paramName}' parameter must be an array of ` + `'${expectedClass}' objects. Received '${JSON.stringify(value)},'. ` + `Please check the call to ${moduleName}.${className}.${funcName}() ` + `to fix the issue.`;
      },
      'max-entries-or-age-required': ({
        moduleName,
        className,
        funcName
      }) => {
        return `You must define either config.maxEntries or config.maxAgeSeconds` + `in ${moduleName}.${className}.${funcName}`;
      },
      'statuses-or-headers-required': ({
        moduleName,
        className,
        funcName
      }) => {
        return `You must define either config.statuses or config.headers` + `in ${moduleName}.${className}.${funcName}`;
      },
      'invalid-string': ({
        moduleName,
        funcName,
        paramName
      }) => {
        if (!paramName || !moduleName || !funcName) {
          throw new Error(`Unexpected input to 'invalid-string' error.`);
        }

        return `When using strings, the '${paramName}' parameter must start with ` + `'http' (for cross-origin matches) or '/' (for same-origin matches). ` + `Please see the docs for ${moduleName}.${funcName}() for ` + `more info.`;
      },
      'channel-name-required': () => {
        return `You must provide a channelName to construct a ` + `BroadcastCacheUpdate instance.`;
      },
      'invalid-responses-are-same-args': () => {
        return `The arguments passed into responsesAreSame() appear to be ` + `invalid. Please ensure valid Responses are used.`;
      },
      'expire-custom-caches-only': () => {
        return `You must provide a 'cacheName' property when using the ` + `expiration plugin with a runtime caching strategy.`;
      },
      'unit-must-be-bytes': ({
        normalizedRangeHeader
      }) => {
        if (!normalizedRangeHeader) {
          throw new Error(`Unexpected input to 'unit-must-be-bytes' error.`);
        }

        return `The 'unit' portion of the Range header must be set to 'bytes'. ` + `The Range header provided was "${normalizedRangeHeader}"`;
      },
      'single-range-only': ({
        normalizedRangeHeader
      }) => {
        if (!normalizedRangeHeader) {
          throw new Error(`Unexpected input to 'single-range-only' error.`);
        }

        return `Multiple ranges are not supported. Please use a  single start ` + `value, and optional end value. The Range header provided was ` + `"${normalizedRangeHeader}"`;
      },
      'invalid-range-values': ({
        normalizedRangeHeader
      }) => {
        if (!normalizedRangeHeader) {
          throw new Error(`Unexpected input to 'invalid-range-values' error.`);
        }

        return `The Range header is missing both start and end values. At least ` + `one of those values is needed. The Range header provided was ` + `"${normalizedRangeHeader}"`;
      },
      'no-range-header': () => {
        return `No Range header was found in the Request provided.`;
      },
      'range-not-satisfiable': ({
        size,
        start,
        end
      }) => {
        return `The start (${start}) and end (${end}) values in the Range are ` + `not satisfiable by the cached response, which is ${size} bytes.`;
      },
      'attempt-to-cache-non-get-request': ({
        url,
        method
      }) => {
        return `Unable to cache '${url}' because it is a '${method}' request and ` + `only 'GET' requests can be cached.`;
      },
      'cache-put-with-no-response': ({
        url
      }) => {
        return `There was an attempt to cache '${url}' but the response was not ` + `defined.`;
      },
      'no-response': ({
        url,
        error
      }) => {
        let message = `The strategy could not generate a response for '${url}'.`;

        if (error) {
          message += ` The underlying error is ${error}.`;
        }

        return message;
      },
      'bad-precaching-response': ({
        url,
        status
      }) => {
        return `The precaching request for '${url}' failed with an HTTP ` + `status of ${status}.`;
      },
      'non-precached-url': ({
        url
      }) => {
        return `createHandlerBoundToURL('${url}') was called, but that URL is ` + `not precached. Please pass in a URL that is precached instead.`;
      },
      'add-to-cache-list-conflicting-integrities': ({
        url
      }) => {
        return `Two of the entries passed to ` + `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` + `${url} with different integrity values. Please remove one of them.`;
      },
      'missing-precache-entry': ({
        cacheName,
        url
      }) => {
        return `Unable to find a precached response in ${cacheName} for ${url}.`;
      }
    };

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    const generatorFunction = (code, details = {}) => {
      const message = messages[code];

      if (!message) {
        throw new Error(`Unable to find message for code '${code}'.`);
      }

      return message(details);
    };

    const messageGenerator =  generatorFunction;

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Workbox errors should be thrown with this class.
     * This allows use to ensure the type easily in tests,
     * helps developers identify errors from workbox
     * easily and allows use to optimise error
     * messages correctly.
     *
     * @private
     */

    class WorkboxError extends Error {
      /**
       *
       * @param {string} errorCode The error code that
       * identifies this particular error.
       * @param {Object=} details Any relevant arguments
       * that will help developers identify issues should
       * be added as a key on the context object.
       */
      constructor(errorCode, details) {
        const message = messageGenerator(errorCode, details);
        super(message);
        this.name = errorCode;
        this.details = details;
      }

    }

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /*
     * This method throws if the supplied value is not an array.
     * The destructed values are required to produce a meaningful error for users.
     * The destructed and restructured object is so it's clear what is
     * needed.
     */

    const isArray = (value, details) => {
      if (!Array.isArray(value)) {
        throw new WorkboxError('not-an-array', details);
      }
    };

    const hasMethod = (object, expectedMethod, details) => {
      const type = typeof object[expectedMethod];

      if (type !== 'function') {
        details['expectedMethod'] = expectedMethod;
        throw new WorkboxError('missing-a-method', details);
      }
    };

    const isType = (object, expectedType, details) => {
      if (typeof object !== expectedType) {
        details['expectedType'] = expectedType;
        throw new WorkboxError('incorrect-type', details);
      }
    };

    const isInstance = (object, expectedClass, details) => {
      if (!(object instanceof expectedClass)) {
        details['expectedClass'] = expectedClass;
        throw new WorkboxError('incorrect-class', details);
      }
    };

    const isOneOf = (value, validValues, details) => {
      if (!validValues.includes(value)) {
        details['validValueDescription'] = `Valid values are ${JSON.stringify(validValues)}.`;
        throw new WorkboxError('invalid-value', details);
      }
    };

    const isArrayOfClass = (value, expectedClass, details) => {
      const error = new WorkboxError('not-array-of-class', details);

      if (!Array.isArray(value)) {
        throw error;
      }

      for (const item of value) {
        if (!(item instanceof expectedClass)) {
          throw error;
        }
      }
    };

    const finalAssertExports =  {
      hasMethod,
      isArray,
      isInstance,
      isOneOf,
      isType,
      isArrayOfClass
    };

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    const quotaErrorCallbacks = new Set();

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Adds a function to the set of quotaErrorCallbacks that will be executed if
     * there's a quota error.
     *
     * @param {Function} callback
     * @memberof module:workbox-core
     */

    function registerQuotaErrorCallback(callback) {
      {
        finalAssertExports.isType(callback, 'function', {
          moduleName: 'workbox-core',
          funcName: 'register',
          paramName: 'callback'
        });
      }

      quotaErrorCallbacks.add(callback);

      {
        logger.log('Registered a callback to respond to quota errors.', callback);
      }
    }

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    const _cacheNameDetails = {
      googleAnalytics: 'googleAnalytics',
      precache: 'precache-v2',
      prefix: 'workbox',
      runtime: 'runtime',
      suffix: typeof registration !== 'undefined' ? registration.scope : ''
    };

    const _createCacheName = cacheName => {
      return [_cacheNameDetails.prefix, cacheName, _cacheNameDetails.suffix].filter(value => value && value.length > 0).join('-');
    };

    const eachCacheNameDetail = fn => {
      for (const key of Object.keys(_cacheNameDetails)) {
        fn(key);
      }
    };

    const cacheNames = {
      updateDetails: details => {
        eachCacheNameDetail(key => {
          if (typeof details[key] === 'string') {
            _cacheNameDetails[key] = details[key];
          }
        });
      },
      getGoogleAnalyticsName: userCacheName => {
        return userCacheName || _createCacheName(_cacheNameDetails.googleAnalytics);
      },
      getPrecacheName: userCacheName => {
        return userCacheName || _createCacheName(_cacheNameDetails.precache);
      },
      getPrefix: () => {
        return _cacheNameDetails.prefix;
      },
      getRuntimeName: userCacheName => {
        return userCacheName || _createCacheName(_cacheNameDetails.runtime);
      },
      getSuffix: () => {
        return _cacheNameDetails.suffix;
      }
    };

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Runs all of the callback functions, one at a time sequentially, in the order
     * in which they were registered.
     *
     * @memberof module:workbox-core
     * @private
     */

    async function executeQuotaErrorCallbacks() {
      {
        logger.log(`About to run ${quotaErrorCallbacks.size} ` + `callbacks to clean up caches.`);
      }

      for (const callback of quotaErrorCallbacks) {
        await callback();

        {
          logger.log(callback, 'is complete.');
        }
      }

      {
        logger.log('Finished running callbacks.');
      }
    }

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    const getFriendlyURL = url => {
      const urlObj = new URL(String(url), location.href); // See https://github.com/GoogleChrome/workbox/issues/2323
      // We want to include everything, except for the origin if it's same-origin.

      return urlObj.href.replace(new RegExp(`^${location.origin}`), '');
    };

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    const pluginUtils = {
      filter: (plugins, callbackName) => {
        return plugins.filter(plugin => callbackName in plugin);
      }
    };

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Checks the list of plugins for the cacheKeyWillBeUsed callback, and
     * executes any of those callbacks found in sequence. The final `Request` object
     * returned by the last plugin is treated as the cache key for cache reads
     * and/or writes.
     *
     * @param {Object} options
     * @param {Request} options.request
     * @param {string} options.mode
     * @param {Array<Object>} [options.plugins=[]]
     * @return {Promise<Request>}
     *
     * @private
     * @memberof module:workbox-core
     */

    const _getEffectiveRequest = async ({
      request,
      mode,
      plugins = []
    }) => {
      const cacheKeyWillBeUsedPlugins = pluginUtils.filter(plugins, "cacheKeyWillBeUsed"
      /* CACHE_KEY_WILL_BE_USED */
      );
      let effectiveRequest = request;

      for (const plugin of cacheKeyWillBeUsedPlugins) {
        effectiveRequest = await plugin["cacheKeyWillBeUsed"
        /* CACHE_KEY_WILL_BE_USED */
        ].call(plugin, {
          mode,
          request: effectiveRequest
        });

        if (typeof effectiveRequest === 'string') {
          effectiveRequest = new Request(effectiveRequest);
        }

        {
          finalAssertExports.isInstance(effectiveRequest, Request, {
            moduleName: 'Plugin',
            funcName: "cacheKeyWillBeUsed"
            /* CACHE_KEY_WILL_BE_USED */
            ,
            isReturnValueProblem: true
          });
        }
      }

      return effectiveRequest;
    };
    /**
     * This method will call cacheWillUpdate on the available plugins (or use
     * status === 200) to determine if the Response is safe and valid to cache.
     *
     * @param {Object} options
     * @param {Request} options.request
     * @param {Response} options.response
     * @param {Event} [options.event]
     * @param {Array<Object>} [options.plugins=[]]
     * @return {Promise<Response>}
     *
     * @private
     * @memberof module:workbox-core
     */


    const _isResponseSafeToCache = async ({
      request,
      response,
      event,
      plugins = []
    }) => {
      let responseToCache = response;
      let pluginsUsed = false;

      for (const plugin of plugins) {
        if ("cacheWillUpdate"
        /* CACHE_WILL_UPDATE */
        in plugin) {
          pluginsUsed = true;
          const pluginMethod = plugin["cacheWillUpdate"
          /* CACHE_WILL_UPDATE */
          ];
          responseToCache = await pluginMethod.call(plugin, {
            request,
            response: responseToCache,
            event
          });

          {
            if (responseToCache) {
              finalAssertExports.isInstance(responseToCache, Response, {
                moduleName: 'Plugin',
                funcName: "cacheWillUpdate"
                /* CACHE_WILL_UPDATE */
                ,
                isReturnValueProblem: true
              });
            }
          }

          if (!responseToCache) {
            break;
          }
        }
      }

      if (!pluginsUsed) {
        {
          if (responseToCache) {
            if (responseToCache.status !== 200) {
              if (responseToCache.status === 0) {
                logger.warn(`The response for '${request.url}' is an opaque ` + `response. The caching strategy that you're using will not ` + `cache opaque responses by default.`);
              } else {
                logger.debug(`The response for '${request.url}' returned ` + `a status code of '${response.status}' and won't be cached as a ` + `result.`);
              }
            }
          }
        }

        responseToCache = responseToCache && responseToCache.status === 200 ? responseToCache : undefined;
      }

      return responseToCache ? responseToCache : null;
    };
    /**
     * This is a wrapper around cache.match().
     *
     * @param {Object} options
     * @param {string} options.cacheName Name of the cache to match against.
     * @param {Request} options.request The Request that will be used to look up
     *     cache entries.
     * @param {Event} [options.event] The event that prompted the action.
     * @param {Object} [options.matchOptions] Options passed to cache.match().
     * @param {Array<Object>} [options.plugins=[]] Array of plugins.
     * @return {Response} A cached response if available.
     *
     * @private
     * @memberof module:workbox-core
     */


    const matchWrapper = async ({
      cacheName,
      request,
      event,
      matchOptions,
      plugins = []
    }) => {
      const cache = await self.caches.open(cacheName);
      const effectiveRequest = await _getEffectiveRequest({
        plugins,
        request,
        mode: 'read'
      });
      let cachedResponse = await cache.match(effectiveRequest, matchOptions);

      {
        if (cachedResponse) {
          logger.debug(`Found a cached response in '${cacheName}'.`);
        } else {
          logger.debug(`No cached response found in '${cacheName}'.`);
        }
      }

      for (const plugin of plugins) {
        if ("cachedResponseWillBeUsed"
        /* CACHED_RESPONSE_WILL_BE_USED */
        in plugin) {
          const pluginMethod = plugin["cachedResponseWillBeUsed"
          /* CACHED_RESPONSE_WILL_BE_USED */
          ];
          cachedResponse = await pluginMethod.call(plugin, {
            cacheName,
            event,
            matchOptions,
            cachedResponse,
            request: effectiveRequest
          });

          {
            if (cachedResponse) {
              finalAssertExports.isInstance(cachedResponse, Response, {
                moduleName: 'Plugin',
                funcName: "cachedResponseWillBeUsed"
                /* CACHED_RESPONSE_WILL_BE_USED */
                ,
                isReturnValueProblem: true
              });
            }
          }
        }
      }

      return cachedResponse;
    };
    /**
     * Wrapper around cache.put().
     *
     * Will call `cacheDidUpdate` on plugins if the cache was updated, using
     * `matchOptions` when determining what the old entry is.
     *
     * @param {Object} options
     * @param {string} options.cacheName
     * @param {Request} options.request
     * @param {Response} options.response
     * @param {Event} [options.event]
     * @param {Array<Object>} [options.plugins=[]]
     * @param {Object} [options.matchOptions]
     *
     * @private
     * @memberof module:workbox-core
     */


    const putWrapper = async ({
      cacheName,
      request,
      response,
      event,
      plugins = [],
      matchOptions
    }) => {
      {
        if (request.method && request.method !== 'GET') {
          throw new WorkboxError('attempt-to-cache-non-get-request', {
            url: getFriendlyURL(request.url),
            method: request.method
          });
        }
      }

      const effectiveRequest = await _getEffectiveRequest({
        plugins,
        request,
        mode: 'write'
      });

      if (!response) {
        {
          logger.error(`Cannot cache non-existent response for ` + `'${getFriendlyURL(effectiveRequest.url)}'.`);
        }

        throw new WorkboxError('cache-put-with-no-response', {
          url: getFriendlyURL(effectiveRequest.url)
        });
      }

      const responseToCache = await _isResponseSafeToCache({
        event,
        plugins,
        response,
        request: effectiveRequest
      });

      if (!responseToCache) {
        {
          logger.debug(`Response '${getFriendlyURL(effectiveRequest.url)}' will ` + `not be cached.`, responseToCache);
        }

        return;
      }

      const cache = await self.caches.open(cacheName);
      const updatePlugins = pluginUtils.filter(plugins, "cacheDidUpdate"
      /* CACHE_DID_UPDATE */
      );
      const oldResponse = updatePlugins.length > 0 ? await matchWrapper({
        cacheName,
        matchOptions,
        request: effectiveRequest
      }) : null;

      {
        logger.debug(`Updating the '${cacheName}' cache with a new Response for ` + `${getFriendlyURL(effectiveRequest.url)}.`);
      }

      try {
        await cache.put(effectiveRequest, responseToCache);
      } catch (error) {
        // See https://developer.mozilla.org/en-US/docs/Web/API/DOMException#exception-QuotaExceededError
        if (error.name === 'QuotaExceededError') {
          await executeQuotaErrorCallbacks();
        }

        throw error;
      }

      for (const plugin of updatePlugins) {
        await plugin["cacheDidUpdate"
        /* CACHE_DID_UPDATE */
        ].call(plugin, {
          cacheName,
          event,
          oldResponse,
          newResponse: responseToCache,
          request: effectiveRequest
        });
      }
    };

    const cacheWrapper = {
      put: putWrapper,
      match: matchWrapper
    };

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    let supportStatus;
    /**
     * A utility function that determines whether the current browser supports
     * constructing a [`ReadableStream`](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/ReadableStream)
     * object.
     *
     * @return {boolean} `true`, if the current browser can successfully
     *     construct a `ReadableStream`, `false` otherwise.
     *
     * @private
     */

    function canConstructReadableStream() {
      if (supportStatus === undefined) {
        // See https://github.com/GoogleChrome/workbox/issues/1473
        try {
          new ReadableStream({
            start() {}

          });
          supportStatus = true;
        } catch (error) {
          supportStatus = false;
        }
      }

      return supportStatus;
    }

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    let supportStatus$1;
    /**
     * A utility function that determines whether the current browser supports
     * constructing a new `Response` from a `response.body` stream.
     *
     * @return {boolean} `true`, if the current browser can successfully
     *     construct a `Response` from a `response.body` stream, `false` otherwise.
     *
     * @private
     */

    function canConstructResponseFromBodyStream() {
      if (supportStatus$1 === undefined) {
        const testResponse = new Response('');

        if ('body' in testResponse) {
          try {
            new Response(testResponse.body);
            supportStatus$1 = true;
          } catch (error) {
            supportStatus$1 = false;
          }
        }

        supportStatus$1 = false;
      }

      return supportStatus$1;
    }

    /*
      Copyright 2019 Google LLC
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * A helper function that prevents a promise from being flagged as unused.
     *
     * @private
     **/

    function dontWaitFor(promise) {
      // Effective no-op.
      promise.then(() => {});
    }

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * A class that wraps common IndexedDB functionality in a promise-based API.
     * It exposes all the underlying power and functionality of IndexedDB, but
     * wraps the most commonly used features in a way that's much simpler to use.
     *
     * @private
     */

    class DBWrapper {
      /**
       * @param {string} name
       * @param {number} version
       * @param {Object=} [callback]
       * @param {!Function} [callbacks.onupgradeneeded]
       * @param {!Function} [callbacks.onversionchange] Defaults to
       *     DBWrapper.prototype._onversionchange when not specified.
       * @private
       */
      constructor(name, version, {
        onupgradeneeded,
        onversionchange
      } = {}) {
        this._db = null;
        this._name = name;
        this._version = version;
        this._onupgradeneeded = onupgradeneeded;

        this._onversionchange = onversionchange || (() => this.close());
      }
      /**
       * Returns the IDBDatabase instance (not normally needed).
       * @return {IDBDatabase|undefined}
       *
       * @private
       */


      get db() {
        return this._db;
      }
      /**
       * Opens a connected to an IDBDatabase, invokes any onupgradedneeded
       * callback, and added an onversionchange callback to the database.
       *
       * @return {IDBDatabase}
       * @private
       */


      async open() {
        if (this._db) return;
        this._db = await new Promise((resolve, reject) => {
          // This flag is flipped to true if the timeout callback runs prior
          // to the request failing or succeeding. Note: we use a timeout instead
          // of an onblocked handler since there are cases where onblocked will
          // never never run. A timeout better handles all possible scenarios:
          // https://github.com/w3c/IndexedDB/issues/223
          let openRequestTimedOut = false;
          setTimeout(() => {
            openRequestTimedOut = true;
            reject(new Error('The open request was blocked and timed out'));
          }, this.OPEN_TIMEOUT);
          const openRequest = indexedDB.open(this._name, this._version);

          openRequest.onerror = () => reject(openRequest.error);

          openRequest.onupgradeneeded = evt => {
            if (openRequestTimedOut) {
              openRequest.transaction.abort();
              openRequest.result.close();
            } else if (typeof this._onupgradeneeded === 'function') {
              this._onupgradeneeded(evt);
            }
          };

          openRequest.onsuccess = () => {
            const db = openRequest.result;

            if (openRequestTimedOut) {
              db.close();
            } else {
              db.onversionchange = this._onversionchange.bind(this);
              resolve(db);
            }
          };
        });
        return this;
      }
      /**
       * Polyfills the native `getKey()` method. Note, this is overridden at
       * runtime if the browser supports the native method.
       *
       * @param {string} storeName
       * @param {*} query
       * @return {Array}
       * @private
       */


      async getKey(storeName, query) {
        return (await this.getAllKeys(storeName, query, 1))[0];
      }
      /**
       * Polyfills the native `getAll()` method. Note, this is overridden at
       * runtime if the browser supports the native method.
       *
       * @param {string} storeName
       * @param {*} query
       * @param {number} count
       * @return {Array}
       * @private
       */


      async getAll(storeName, query, count) {
        return await this.getAllMatching(storeName, {
          query,
          count
        });
      }
      /**
       * Polyfills the native `getAllKeys()` method. Note, this is overridden at
       * runtime if the browser supports the native method.
       *
       * @param {string} storeName
       * @param {*} query
       * @param {number} count
       * @return {Array}
       * @private
       */


      async getAllKeys(storeName, query, count) {
        const entries = await this.getAllMatching(storeName, {
          query,
          count,
          includeKeys: true
        });
        return entries.map(entry => entry.key);
      }
      /**
       * Supports flexible lookup in an object store by specifying an index,
       * query, direction, and count. This method returns an array of objects
       * with the signature .
       *
       * @param {string} storeName
       * @param {Object} [opts]
       * @param {string} [opts.index] The index to use (if specified).
       * @param {*} [opts.query]
       * @param {IDBCursorDirection} [opts.direction]
       * @param {number} [opts.count] The max number of results to return.
       * @param {boolean} [opts.includeKeys] When true, the structure of the
       *     returned objects is changed from an array of values to an array of
       *     objects in the form {key, primaryKey, value}.
       * @return {Array}
       * @private
       */


      async getAllMatching(storeName, {
        index,
        query = null,
        // IE/Edge errors if query === `undefined`.
        direction = 'next',
        count,
        includeKeys = false
      } = {}) {
        return await this.transaction([storeName], 'readonly', (txn, done) => {
          const store = txn.objectStore(storeName);
          const target = index ? store.index(index) : store;
          const results = [];
          const request = target.openCursor(query, direction);

          request.onsuccess = () => {
            const cursor = request.result;

            if (cursor) {
              results.push(includeKeys ? cursor : cursor.value);

              if (count && results.length >= count) {
                done(results);
              } else {
                cursor.continue();
              }
            } else {
              done(results);
            }
          };
        });
      }
      /**
       * Accepts a list of stores, a transaction type, and a callback and
       * performs a transaction. A promise is returned that resolves to whatever
       * value the callback chooses. The callback holds all the transaction logic
       * and is invoked with two arguments:
       *   1. The IDBTransaction object
       *   2. A `done` function, that's used to resolve the promise when
       *      when the transaction is done, if passed a value, the promise is
       *      resolved to that value.
       *
       * @param {Array<string>} storeNames An array of object store names
       *     involved in the transaction.
       * @param {string} type Can be `readonly` or `readwrite`.
       * @param {!Function} callback
       * @return {*} The result of the transaction ran by the callback.
       * @private
       */


      async transaction(storeNames, type, callback) {
        await this.open();
        return await new Promise((resolve, reject) => {
          const txn = this._db.transaction(storeNames, type);

          txn.onabort = () => reject(txn.error);

          txn.oncomplete = () => resolve();

          callback(txn, value => resolve(value));
        });
      }
      /**
       * Delegates async to a native IDBObjectStore method.
       *
       * @param {string} method The method name.
       * @param {string} storeName The object store name.
       * @param {string} type Can be `readonly` or `readwrite`.
       * @param {...*} args The list of args to pass to the native method.
       * @return {*} The result of the transaction.
       * @private
       */


      async _call(method, storeName, type, ...args) {
        const callback = (txn, done) => {
          const objStore = txn.objectStore(storeName); // TODO(philipwalton): Fix this underlying TS2684 error.
          // @ts-ignore

          const request = objStore[method].apply(objStore, args);

          request.onsuccess = () => done(request.result);
        };

        return await this.transaction([storeName], type, callback);
      }
      /**
       * Closes the connection opened by `DBWrapper.open()`. Generally this method
       * doesn't need to be called since:
       *   1. It's usually better to keep a connection open since opening
       *      a new connection is somewhat slow.
       *   2. Connections are automatically closed when the reference is
       *      garbage collected.
       * The primary use case for needing to close a connection is when another
       * reference (typically in another tab) needs to upgrade it and would be
       * blocked by the current, open connection.
       *
       * @private
       */


      close() {
        if (this._db) {
          this._db.close();

          this._db = null;
        }
      }

    } // Exposed on the prototype to let users modify the default timeout on a
    // per-instance or global basis.

    DBWrapper.prototype.OPEN_TIMEOUT = 2000; // Wrap native IDBObjectStore methods according to their mode.

    const methodsToWrap = {
      readonly: ['get', 'count', 'getKey', 'getAll', 'getAllKeys'],
      readwrite: ['add', 'put', 'clear', 'delete']
    };

    for (const [mode, methods] of Object.entries(methodsToWrap)) {
      for (const method of methods) {
        if (method in IDBObjectStore.prototype) {
          // Don't use arrow functions here since we're outside of the class.
          DBWrapper.prototype[method] = async function (storeName, ...args) {
            return await this._call(method, storeName, mode, ...args);
          };
        }
      }
    }

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * The Deferred class composes Promises in a way that allows for them to be
     * resolved or rejected from outside the constructor. In most cases promises
     * should be used directly, but Deferreds can be necessary when the logic to
     * resolve a promise must be separate.
     *
     * @private
     */

    class Deferred {
      /**
       * Creates a promise and exposes its resolve and reject functions as methods.
       */
      constructor() {
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
      }

    }

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Deletes the database.
     * Note: this is exported separately from the DBWrapper module because most
     * usages of IndexedDB in workbox dont need deleting, and this way it can be
     * reused in tests to delete databases without creating DBWrapper instances.
     *
     * @param {string} name The database name.
     * @private
     */

    const deleteDatabase = async name => {
      await new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(name);

        request.onerror = () => {
          reject(request.error);
        };

        request.onblocked = () => {
          reject(new Error('Delete blocked'));
        };

        request.onsuccess = () => {
          resolve();
        };
      });
    };

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Wrapper around the fetch API.
     *
     * Will call requestWillFetch on available plugins.
     *
     * @param {Object} options
     * @param {Request|string} options.request
     * @param {Object} [options.fetchOptions]
     * @param {ExtendableEvent} [options.event]
     * @param {Array<Object>} [options.plugins=[]]
     * @return {Promise<Response>}
     *
     * @private
     * @memberof module:workbox-core
     */

    const wrappedFetch = async ({
      request,
      fetchOptions,
      event,
      plugins = []
    }) => {
      if (typeof request === 'string') {
        request = new Request(request);
      } // We *should* be able to call `await event.preloadResponse` even if it's
      // undefined, but for some reason, doing so leads to errors in our Node unit
      // tests. To work around that, explicitly check preloadResponse's value first.


      if (event instanceof FetchEvent && event.preloadResponse) {
        const possiblePreloadResponse = await event.preloadResponse;

        if (possiblePreloadResponse) {
          {
            logger.log(`Using a preloaded navigation response for ` + `'${getFriendlyURL(request.url)}'`);
          }

          return possiblePreloadResponse;
        }
      }

      {
        finalAssertExports.isInstance(request, Request, {
          paramName: 'request',
          expectedClass: Request,
          moduleName: 'workbox-core',
          className: 'fetchWrapper',
          funcName: 'wrappedFetch'
        });
      }

      const failedFetchPlugins = pluginUtils.filter(plugins, "fetchDidFail"
      /* FETCH_DID_FAIL */
      ); // If there is a fetchDidFail plugin, we need to save a clone of the
      // original request before it's either modified by a requestWillFetch
      // plugin or before the original request's body is consumed via fetch().

      const originalRequest = failedFetchPlugins.length > 0 ? request.clone() : null;

      try {
        for (const plugin of plugins) {
          if ("requestWillFetch"
          /* REQUEST_WILL_FETCH */
          in plugin) {
            const pluginMethod = plugin["requestWillFetch"
            /* REQUEST_WILL_FETCH */
            ];
            const requestClone = request.clone();
            request = await pluginMethod.call(plugin, {
              request: requestClone,
              event
            });

            if ("dev" !== 'production') {
              if (request) {
                finalAssertExports.isInstance(request, Request, {
                  moduleName: 'Plugin',
                  funcName: "cachedResponseWillBeUsed"
                  /* CACHED_RESPONSE_WILL_BE_USED */
                  ,
                  isReturnValueProblem: true
                });
              }
            }
          }
        }
      } catch (err) {
        throw new WorkboxError('plugin-error-request-will-fetch', {
          thrownError: err
        });
      } // The request can be altered by plugins with `requestWillFetch` making
      // the original request (Most likely from a `fetch` event) to be different
      // to the Request we make. Pass both to `fetchDidFail` to aid debugging.


      const pluginFilteredRequest = request.clone();

      try {
        let fetchResponse; // See https://github.com/GoogleChrome/workbox/issues/1796

        if (request.mode === 'navigate') {
          fetchResponse = await fetch(request);
        } else {
          fetchResponse = await fetch(request, fetchOptions);
        }

        if ("dev" !== 'production') {
          logger.debug(`Network request for ` + `'${getFriendlyURL(request.url)}' returned a response with ` + `status '${fetchResponse.status}'.`);
        }

        for (const plugin of plugins) {
          if ("fetchDidSucceed"
          /* FETCH_DID_SUCCEED */
          in plugin) {
            fetchResponse = await plugin["fetchDidSucceed"
            /* FETCH_DID_SUCCEED */
            ].call(plugin, {
              event,
              request: pluginFilteredRequest,
              response: fetchResponse
            });

            if ("dev" !== 'production') {
              if (fetchResponse) {
                finalAssertExports.isInstance(fetchResponse, Response, {
                  moduleName: 'Plugin',
                  funcName: "fetchDidSucceed"
                  /* FETCH_DID_SUCCEED */
                  ,
                  isReturnValueProblem: true
                });
              }
            }
          }
        }

        return fetchResponse;
      } catch (error) {
        {
          logger.error(`Network request for ` + `'${getFriendlyURL(request.url)}' threw an error.`, error);
        }

        for (const plugin of failedFetchPlugins) {
          await plugin["fetchDidFail"
          /* FETCH_DID_FAIL */
          ].call(plugin, {
            error,
            event,
            originalRequest: originalRequest.clone(),
            request: pluginFilteredRequest.clone()
          });
        }

        throw error;
      }
    };

    const fetchWrapper = {
      fetch: wrappedFetch
    };

    /*
      Copyright 2019 Google LLC
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Returns a promise that resolves and the passed number of milliseconds.
     * This utility is an async/await-friendly version of `setTimeout`.
     *
     * @param {number} ms
     * @return {Promise}
     * @private
     */

    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    /*
      Copyright 2019 Google LLC
      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    const MAX_RETRY_TIME = 2000;
    /**
     * Returns a promise that resolves to a window client matching the passed
     * `resultingClientId`. For browsers that don't support `resultingClientId`
     * or if waiting for the resulting client to apper takes too long, resolve to
     * `undefined`.
     *
     * @param {string} [resultingClientId]
     * @return {Promise<Client|undefined>}
     * @private
     */

    async function resultingClientExists(resultingClientId) {
      if (!resultingClientId) {
        return;
      }

      let existingWindows = await self.clients.matchAll({
        type: 'window'
      });
      const existingWindowIds = new Set(existingWindows.map(w => w.id));
      let resultingWindow;
      const startTime = performance.now(); // Only wait up to `MAX_RETRY_TIME` to find a matching client.

      while (performance.now() - startTime < MAX_RETRY_TIME) {
        existingWindows = await self.clients.matchAll({
          type: 'window'
        });
        resultingWindow = existingWindows.find(w => {
          if (resultingClientId) {
            // If we have a `resultingClientId`, we can match on that.
            return w.id === resultingClientId;
          } else {
            // Otherwise match on finding a window not in `existingWindowIds`.
            return !existingWindowIds.has(w.id);
          }
        });

        if (resultingWindow) {
          break;
        } // Sleep for 100ms and retry.


        await timeout(100);
      }

      return resultingWindow;
    }

    /*
      Copyright 2018 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */

    var _private = /*#__PURE__*/Object.freeze({
        __proto__: null,
        assert: finalAssertExports,
        cacheNames: cacheNames,
        cacheWrapper: cacheWrapper,
        canConstructReadableStream: canConstructReadableStream,
        canConstructResponseFromBodyStream: canConstructResponseFromBodyStream,
        dontWaitFor: dontWaitFor,
        DBWrapper: DBWrapper,
        Deferred: Deferred,
        deleteDatabase: deleteDatabase,
        executeQuotaErrorCallbacks: executeQuotaErrorCallbacks,
        fetchWrapper: fetchWrapper,
        getFriendlyURL: getFriendlyURL,
        logger: logger,
        resultingClientExists: resultingClientExists,
        timeout: timeout,
        WorkboxError: WorkboxError
    });

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Get the current cache names and prefix/suffix used by Workbox.
     *
     * `cacheNames.precache` is used for precached assets,
     * `cacheNames.googleAnalytics` is used by `workbox-google-analytics` to
     * store `analytics.js`, and `cacheNames.runtime` is used for everything else.
     *
     * `cacheNames.prefix` can be used to retrieve just the current prefix value.
     * `cacheNames.suffix` can be used to retrieve just the current suffix value.
     *
     * @return {Object} An object with `precache`, `runtime`, `prefix`, and
     *     `googleAnalytics` properties.
     *
     * @memberof module:workbox-core
     */

    const cacheNames$1 = {
      get googleAnalytics() {
        return cacheNames.getGoogleAnalyticsName();
      },

      get precache() {
        return cacheNames.getPrecacheName();
      },

      get prefix() {
        return cacheNames.getPrefix();
      },

      get runtime() {
        return cacheNames.getRuntimeName();
      },

      get suffix() {
        return cacheNames.getSuffix();
      }

    };

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Allows developers to copy a response and modify its `headers`, `status`,
     * or `statusText` values (the values settable via a
     * [`ResponseInit`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#Syntax}
     * object in the constructor).
     * To modify these values, pass a function as the second argument. That
     * function will be invoked with a single object with the response properties
     * `{headers, status, statusText}`. The return value of this function will
     * be used as the `ResponseInit` for the new `Response`. To change the values
     * either modify the passed parameter(s) and return it, or return a totally
     * new object.
     *
     * @param {Response} response
     * @param {Function} modifier
     * @memberof module:workbox-core
     */

    async function copyResponse(response, modifier) {
      const clonedResponse = response.clone(); // Create a fresh `ResponseInit` object by cloning the headers.

      const responseInit = {
        headers: new Headers(clonedResponse.headers),
        status: clonedResponse.status,
        statusText: clonedResponse.statusText
      }; // Apply any user modifications.

      const modifiedResponseInit = modifier ? modifier(responseInit) : responseInit; // Create the new response from the body stream and `ResponseInit`
      // modifications. Note: not all browsers support the Response.body stream,
      // so fall back to reading the entire body into memory as a blob.

      const body = canConstructResponseFromBodyStream() ? clonedResponse.body : await clonedResponse.blob();
      return new Response(body, modifiedResponseInit);
    }

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Claim any currently available clients once the service worker
     * becomes active. This is normally used in conjunction with `skipWaiting()`.
     *
     * @memberof module:workbox-core
     */

    function clientsClaim() {
      self.addEventListener('activate', () => self.clients.claim());
    }

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Modifies the default cache names used by the Workbox packages.
     * Cache names are generated as `<prefix>-<Cache Name>-<suffix>`.
     *
     * @param {Object} details
     * @param {Object} [details.prefix] The string to add to the beginning of
     *     the precache and runtime cache names.
     * @param {Object} [details.suffix] The string to add to the end of
     *     the precache and runtime cache names.
     * @param {Object} [details.precache] The cache name to use for precache
     *     caching.
     * @param {Object} [details.runtime] The cache name to use for runtime caching.
     * @param {Object} [details.googleAnalytics] The cache name to use for
     *     `workbox-google-analytics` caching.
     *
     * @memberof module:workbox-core
     */

    function setCacheNameDetails(details) {
      {
        Object.keys(details).forEach(key => {
          finalAssertExports.isType(details[key], 'string', {
            moduleName: 'workbox-core',
            funcName: 'setCacheNameDetails',
            paramName: `details.${key}`
          });
        });

        if ('precache' in details && details['precache'].length === 0) {
          throw new WorkboxError('invalid-cache-name', {
            cacheNameId: 'precache',
            value: details['precache']
          });
        }

        if ('runtime' in details && details['runtime'].length === 0) {
          throw new WorkboxError('invalid-cache-name', {
            cacheNameId: 'runtime',
            value: details['runtime']
          });
        }

        if ('googleAnalytics' in details && details['googleAnalytics'].length === 0) {
          throw new WorkboxError('invalid-cache-name', {
            cacheNameId: 'googleAnalytics',
            value: details['googleAnalytics']
          });
        }
      }

      cacheNames.updateDetails(details);
    }

    /*
      Copyright 2019 Google LLC

      Use of this source code is governed by an MIT-style
      license that can be found in the LICENSE file or at
      https://opensource.org/licenses/MIT.
    */
    /**
     * Force a service worker to activate immediately, instead of
     * [waiting](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#waiting)
     * for existing clients to close.
     *
     * @memberof module:workbox-core
     */

    function skipWaiting() {
      // We need to explicitly call `self.skipWaiting()` here because we're
      // shadowing `skipWaiting` with this local function.
      self.addEventListener('install', () => self.skipWaiting());
    }

    exports._private = _private;
    exports.cacheNames = cacheNames$1;
    exports.clientsClaim = clientsClaim;
    exports.copyResponse = copyResponse;
    exports.registerQuotaErrorCallback = registerQuotaErrorCallback;
    exports.setCacheNameDetails = setCacheNameDetails;
    exports.skipWaiting = skipWaiting;

    return exports;

}({}));
//# sourceMappingURL=workbox-core.dev.js.map
