/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {logger} from 'workbox-core/_private/logger.js';
import {getOrCreatePrecacheController} from './utils/getOrCreatePrecacheController.js';
import {precachePlugins} from './utils/precachePlugins.js';
import {PrecacheEntry} from './_types.js';
import './_version.js';

declare global {
  interface WorkerGlobalScope {
    __WB_MANIFEST: Array<PrecacheEntry|string>;
  }
}

const installListener = (event: ExtendableEvent) => {
  const precacheController = getOrCreatePrecacheController();
  const plugins = precachePlugins.get();

  event.waitUntil(
      precacheController.install({event, plugins})
          .catch((error: Error) => {
            if (process.env.NODE_ENV !== 'production') {
              logger.error(`Service worker installation failed. It will ` +
              `be retried automatically during the next navigation.`);
            }
            // Re-throw the error to ensure installation fails.
            throw error;
          })
  );
};

const activateListener = (event: ExtendableEvent) => {
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
function precache(entries: Array<PrecacheEntry|string>) {
  const precacheController = getOrCreatePrecacheController();
  precacheController.addToCacheList(entries);

  if (entries.length > 0) {
    // NOTE: these listeners will only be added once (even if the `precache()`
    // method is called multiple times) because event listeners are implemented
    // as a set, where each listener must be unique.
    // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
    self.addEventListener('install', installListener as EventListener);
    self.addEventListener('activate', activateListener as EventListener);
  }
}

export {precache}
