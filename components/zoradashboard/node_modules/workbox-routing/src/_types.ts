/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {
  RouteHandler,
  RouteHandlerObject,
  RouteHandlerCallback,
  RouteHandlerCallbackOptions,
  RouteMatchCallback,
  RouteMatchCallbackOptions
} from 'workbox-core/types.js';
import './_version.js';

 export {
  RouteHandler as Handler,
  RouteHandlerObject as HandlerObject,
  RouteHandlerCallback as HandlerCallback,
  RouteHandlerCallbackOptions as HandlerCallbackOptions,
  RouteMatchCallback as MatchCallback,
  RouteMatchCallbackOptions as MatchCallbackOptions,
}

// * * * IMPORTANT! * * *
// ------------------------------------------------------------------------- //
// jdsoc type definitions cannot be declared above TypeScript definitions or
// they'll be stripped from the built `.js` files, and they'll only be in the
// `d.ts` files, which aren't read by the jsdoc generator. As a result we
// have to put declare them below.

/**
 * The "match" callback is used to determine if a `Route` should apply for a
 * particular URL. When matching occurs in response to a fetch event from the
 * client, the `event` and `request` objects are supplied in addition to the
 * URL. However, since the match callback can be invoked outside of a fetch
 * event, matching logic should not assume the `event` or `request` objects
 * will always be available (unlike URL, which is always available).
 * If the match callback returns a truthy value, the matching route's
 * [handler callback]{@link module:workbox-routing~handlerCallback} will be
 * invoked immediately. If the value returned is a non-empty array or object,
 * that value will be set on the handler's `context.params` argument.
 *
 * @callback ~matchCallback
 * @param {Object} context
 * @param {URL} context.url The request's URL.
 * @param {Request} [context.request] The corresponding request,
 *     if available.
 * @param {FetchEvent} [context.event] The corresponding event that triggered
 *     the request, if available.
 * @return {*} To signify a match, return a truthy value.
 *
 * @memberof module:workbox-routing
 */

/**
 * The "handler" callback is invoked whenever a `Router` matches a URL to a
 * `Route` via its [match]{@link module:workbox-routing~handlerCallback}
 * callback. This callback should return a Promise that resolves with a
 * `Response`.
 *
 * If a non-empty array or object is returned by the
 * [match callback]{@link module:workbox-routing~matchCallback} it
 * will be passed in as the handler's `context.params` argument.
 *
 * @callback ~handlerCallback
 * @param {Object} context
 * @param {Request|string} context.request The corresponding request.
 * @param {URL} [context.url] The URL that matched, if available.
 * @param {FetchEvent} [context.event] The corresponding event that triggered
 *     the request, if available.
 * @param {Object} [context.params] Array or Object parameters returned by the
 *     Route's [match callback]{@link module:workbox-routing~matchCallback}.
 *     This will be undefined if an empty array or object were returned.
 * @return {Promise<Response>} The response that will fulfill the request.
 *
 * @memberof module:workbox-routing
 */
