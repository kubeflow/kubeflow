import { addPlugins } from './addPlugins.js';
import { addRoute } from './addRoute.js';
import { cleanupOutdatedCaches } from './cleanupOutdatedCaches.js';
import { createHandler } from './createHandler.js';
import { createHandlerBoundToURL } from './createHandlerBoundToURL.js';
import { getCacheKeyForURL } from './getCacheKeyForURL.js';
import { matchPrecache } from './matchPrecache.js';
import { precache } from './precache.js';
import { precacheAndRoute } from './precacheAndRoute.js';
import { PrecacheController } from './PrecacheController.js';
import './_version.js';
/**
 * Most consumers of this module will want to use the
 * [precacheAndRoute()]{@link module:workbox-precaching.precacheAndRoute}
 * method to add assets to the Cache and respond to network requests with these
 * cached assets.
 *
 * If you require finer grained control, you can use the
 * [PrecacheController]{@link module:workbox-precaching.PrecacheController}
 * to determine when performed.
 *
 * @module workbox-precaching
 */
export { addPlugins, addRoute, cleanupOutdatedCaches, createHandler, createHandlerBoundToURL, getCacheKeyForURL, matchPrecache, precache, precacheAndRoute, PrecacheController, };
