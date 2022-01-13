/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {assert} from 'workbox-core/_private/assert.js';
import {cacheNames} from 'workbox-core/_private/cacheNames.js';
import {cacheWrapper} from 'workbox-core/_private/cacheWrapper.js';
import {fetchWrapper} from 'workbox-core/_private/fetchWrapper.js';
import {getFriendlyURL} from 'workbox-core/_private/getFriendlyURL.js';
import {logger} from 'workbox-core/_private/logger.js';
import {WorkboxError} from 'workbox-core/_private/WorkboxError.js';
import {RouteHandlerObject, RouteHandlerCallbackOptions, WorkboxPlugin} from 'workbox-core/types.js';
import {messages} from './utils/messages.js';
import {cacheOkAndOpaquePlugin} from './plugins/cacheOkAndOpaquePlugin.js';
import './_version.js';


interface NetworkFirstOptions {
  cacheName?: string;
  plugins?: WorkboxPlugin[];
  fetchOptions?: RequestInit;
  matchOptions?: CacheQueryOptions;
  networkTimeoutSeconds?: number;
}

/**
 * An implementation of a
 * [network first]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache}
 * request strategy.
 *
 * By default, this strategy will cache responses with a 200 status code as
 * well as [opaque responses]{@link https://developers.google.com/web/tools/workbox/guides/handle-third-party-requests}.
 * Opaque responses are are cross-origin requests where the response doesn't
 * support [CORS]{@link https://enable-cors.org/}.
 *
 * If the network request fails, and there is no cache match, this will throw
 * a `WorkboxError` exception.
 *
 * @memberof module:workbox-strategies
 */
class NetworkFirst implements RouteHandlerObject {
  private readonly _cacheName: string;
  private readonly _plugins: WorkboxPlugin[];
  private readonly _fetchOptions?: RequestInit;
  private readonly _matchOptions?: CacheQueryOptions;
  private readonly _networkTimeoutSeconds: number;

  /**
   * @param {Object} options
   * @param {string} options.cacheName Cache name to store and retrieve
   * requests. Defaults to cache names provided by
   * [workbox-core]{@link module:workbox-core.cacheNames}.
   * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} options.fetchOptions Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of all fetch() requests made by this strategy.
   * @param {Object} options.matchOptions [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
   * @param {number} options.networkTimeoutSeconds If set, any network requests
   * that fail to respond within the timeout will fallback to the cache.
   *
   * This option can be used to combat
   * "[lie-fi]{@link https://developers.google.com/web/fundamentals/performance/poor-connectivity/#lie-fi}"
   * scenarios.
   */
  constructor(options: NetworkFirstOptions = {}) {
    this._cacheName = cacheNames.getRuntimeName(options.cacheName);

    if (options.plugins) {
      const isUsingCacheWillUpdate =
        options.plugins.some((plugin) => !!plugin.cacheWillUpdate);
      this._plugins = isUsingCacheWillUpdate ?
        options.plugins : [cacheOkAndOpaquePlugin, ...options.plugins];
    } else {
      // No plugins passed in, use the default plugin.
      this._plugins = [cacheOkAndOpaquePlugin];
    }

    this._networkTimeoutSeconds = options.networkTimeoutSeconds || 0;
    if (process.env.NODE_ENV !== 'production') {
      if (this._networkTimeoutSeconds) {
        assert!.isType(this._networkTimeoutSeconds, 'number', {
          moduleName: 'workbox-strategies',
          className: 'NetworkFirst',
          funcName: 'constructor',
          paramName: 'networkTimeoutSeconds',
        });
      }
    }

    this._fetchOptions = options.fetchOptions;
    this._matchOptions = options.matchOptions;
  }

  /**
   * This method will perform a request strategy and follows an API that
   * will work with the
   * [Workbox Router]{@link module:workbox-routing.Router}.
   *
   * @param {Object} options
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {Event} [options.event] The event that triggered the request.
   * @return {Promise<Response>}
   */
  async handle({event, request}: RouteHandlerCallbackOptions): Promise<Response> {
    const logs: any[] = [];
   
    if (typeof request === 'string') {
      request = new Request(request);
    }

    if (process.env.NODE_ENV !== 'production') {
      assert!.isInstance(request, Request, {
        moduleName: 'workbox-strategies',
        className: 'NetworkFirst',
        funcName: 'handle',
        paramName: 'makeRequest',
      });
    }

    const promises = [];
    let timeoutId: number | undefined;

    if (this._networkTimeoutSeconds) {
      const {id, promise} = this._getTimeoutPromise({request, event, logs});
      timeoutId = id;
      promises.push(promise);
    }

    const networkPromise =
        this._getNetworkPromise({timeoutId, request, event, logs});
    promises.push(networkPromise);

    // Promise.race() will resolve as soon as the first promise resolves.
    let response = await Promise.race(promises);
    // If Promise.race() resolved with null, it might be due to a network
    // timeout + a cache miss. If that were to happen, we'd rather wait until
    // the networkPromise resolves instead of returning null.
    // Note that it's fine to await an already-resolved promise, so we don't
    // have to check to see if it's still "in flight".
    if (!response) {
      response = await networkPromise;
    }

    if (process.env.NODE_ENV !== 'production') {
      logger.groupCollapsed(
          messages.strategyStart('NetworkFirst', request));
      for (const log of logs) {
        logger.log(log);
      }
      messages.printFinalResponse(response);
      logger.groupEnd();
    }

    if (!response) {
      throw new WorkboxError('no-response', {url: request.url});
    }
    return response;
  }

  /**
   * @param {Object} options
   * @param {Request} options.request
   * @param {Array} options.logs A reference to the logs array
   * @param {Event} [options.event]
   * @return {Promise<Response>}
   *
   * @private
   */
  private _getTimeoutPromise({request, logs, event}: {
    request: Request;
    logs: any[];
    event?: ExtendableEvent;
  }): {promise: Promise<Response | undefined>; id?: number} {
    let timeoutId;
    const timeoutPromise: Promise<Response | undefined> = new Promise((resolve) => {
      const onNetworkTimeout = async () => {
        if (process.env.NODE_ENV !== 'production') {
          logs.push(`Timing out the network response at ` +
            `${this._networkTimeoutSeconds} seconds.`);
        }

        resolve(await this._respondFromCache({request, event}));
      };

      timeoutId = setTimeout(
          onNetworkTimeout,
          this._networkTimeoutSeconds * 1000,
      );
    });

    return {
      promise: timeoutPromise,
      id: timeoutId,
    };
  }

  /**
   * @param {Object} options
   * @param {number|undefined} options.timeoutId
   * @param {Request} options.request
   * @param {Array} options.logs A reference to the logs Array.
   * @param {Event} [options.event]
   * @return {Promise<Response>}
   *
   * @private
   */
  async _getNetworkPromise({timeoutId, request, logs, event}: {
    request: Request;
    logs: any[];
    timeoutId?: number;
    event?: ExtendableEvent;
  }): Promise<Response> {
    let error;
    let response;
    try {
      response = await fetchWrapper.fetch({
        request,
        event,
        fetchOptions: this._fetchOptions,
        plugins: this._plugins,
      });
    } catch (err) {
      error = err;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (process.env.NODE_ENV !== 'production') {
      if (response) {
        logs.push(`Got response from network.`);
      } else {
        logs.push(`Unable to get a response from the network. Will respond ` +
          `with a cached response.`);
      }
    }

    if (error || !response) {
      response = await this._respondFromCache({request, event});
      if (process.env.NODE_ENV !== 'production') {
        if (response) {
          logs.push(`Found a cached response in the '${this._cacheName}'` +
            ` cache.`);
        } else {
          logs.push(`No response found in the '${this._cacheName}' cache.`);
        }
      }
    } else {
      // Keep the service worker alive while we put the request in the cache
      const responseClone = response.clone();
      const cachePut = cacheWrapper.put({
        cacheName: this._cacheName,
        request,
        response: responseClone,
        event,
        plugins: this._plugins,
      });

      if (event) {
        try {
          // The event has been responded to so we can keep the SW alive to
          // respond to the request
          event.waitUntil(cachePut);
        } catch (err) {
          if (process.env.NODE_ENV !== 'production') {
            logger.warn(`Unable to ensure service worker stays alive when ` +
              `updating cache for '${getFriendlyURL(request.url)}'.`);
          }
        }
      }
    }

    return response;
  }

  /**
   * Used if the network timeouts or fails to make the request.
   *
   * @param {Object} options
   * @param {Request} request The request to match in the cache
   * @param {Event} [options.event]
   * @return {Promise<Object>}
   *
   * @private
   */
  private _respondFromCache({event, request}: {
    request: Request;
    event?: ExtendableEvent;
  }): Promise<Response | undefined> {
    return cacheWrapper.match({
      cacheName: this._cacheName,
      request,
      event,
      matchOptions: this._matchOptions,
      plugins: this._plugins,
    });
  }
}

export {NetworkFirst};
