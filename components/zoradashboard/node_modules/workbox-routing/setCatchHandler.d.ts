import { Handler } from './_types.js';
import './_version.js';
/**
 * If a Route throws an error while handling a request, this `handler`
 * will be called and given a chance to provide a response.
 *
 * @param {module:workbox-routing~handlerCallback} handler A callback
 * function that returns a Promise resulting in a Response.
 *
 * @memberof module:workbox-routing
 */
declare function setCatchHandler(handler: Handler): void;
export { setCatchHandler };
