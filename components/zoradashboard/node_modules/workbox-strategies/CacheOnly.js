/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
import { assert } from 'workbox-core/_private/assert.js';
import { cacheNames } from 'workbox-core/_private/cacheNames.js';
import { cacheWrapper } from 'workbox-core/_private/cacheWrapper.js';
import { logger } from 'workbox-core/_private/logger.js';
import { WorkboxError } from 'workbox-core/_private/WorkboxError.js';
import { messages } from './utils/messages.js';
import './_version.js';
/**
 * An implementation of a
 * [cache-only]{@link https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-only}
 * request strategy.
 *
 * This class is useful if you want to take advantage of any
 * [Workbox plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}.
 *
 * If there is no cache match, this will throw a `WorkboxError` exception.
 *
 * @memberof module:workbox-strategies
 */
class CacheOnly {
    /**
     * @param {Object} options
     * @param {string} options.cacheName Cache name to store and retrieve
     * requests. Defaults to cache names provided by
     * [workbox-core]{@link module:workbox-core.cacheNames}.
     * @param {Array<Object>} options.plugins [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} options.matchOptions [`CacheQueryOptions`](https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions)
     */
    constructor(options = {}) {
        this._cacheName = cacheNames.getRuntimeName(options.cacheName);
        this._plugins = options.plugins || [];
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
    async handle({ event, request }) {
        if (typeof request === 'string') {
            request = new Request(request);
        }
        if (process.env.NODE_ENV !== 'production') {
            assert.isInstance(request, Request, {
                moduleName: 'workbox-strategies',
                className: 'CacheOnly',
                funcName: 'makeRequest',
                paramName: 'request',
            });
        }
        const response = await cacheWrapper.match({
            cacheName: this._cacheName,
            request,
            event,
            matchOptions: this._matchOptions,
            plugins: this._plugins,
        });
        if (process.env.NODE_ENV !== 'production') {
            logger.groupCollapsed(messages.strategyStart('CacheOnly', request));
            if (response) {
                logger.log(`Found a cached response in the '${this._cacheName}'` +
                    ` cache.`);
                messages.printFinalResponse(response);
            }
            else {
                logger.log(`No response found in the '${this._cacheName}' cache.`);
            }
            logger.groupEnd();
        }
        if (!response) {
            throw new WorkboxError('no-response', { url: request.url });
        }
        return response;
    }
}
export { CacheOnly };
