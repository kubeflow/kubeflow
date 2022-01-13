/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {FetchListenerOptions} from './utils/addFetchListener.js';
import {addRoute} from './addRoute.js';
import {precache} from './precache.js';
import {PrecacheEntry} from './_types.js';
import './_version.js';

declare global {
  interface WorkerGlobalScope {
    __WB_MANIFEST: Array<PrecacheEntry|string>;
  }
}

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
function precacheAndRoute(entries: Array<PrecacheEntry|string>, options?: FetchListenerOptions) {
  precache(entries);
  addRoute(options);
}

export {precacheAndRoute}
