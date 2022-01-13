import { RouteHandlerCallback, RouteHandlerCallbackOptions } from 'workbox-core/types.js';
import { StreamSource } from './_types.js';
import './_version.js';
interface StreamsHandlerCallback {
    ({ url, request, event, params }: RouteHandlerCallbackOptions): Promise<StreamSource> | StreamSource;
}
/**
 * A shortcut to create a strategy that could be dropped-in to Workbox's router.
 *
 * On browsers that do not support constructing new `ReadableStream`s, this
 * strategy will automatically wait for all the `sourceFunctions` to complete,
 * and create a final response that concatenates their values together.
 *
 * @param {Array<function({event, request, url, params})>} sourceFunctions
 * An array of functions similar to {@link module:workbox-routing~handlerCallback}
 * but that instead return a {@link module:workbox-streams.StreamSource} (or a
 * Promise which resolves to one).
 * @param {HeadersInit} [headersInit] If there's no `Content-Type` specified,
 * `'text/html'` will be used by default.
 * @return {module:workbox-routing~handlerCallback}
 * @memberof module:workbox-streams
 */
declare function strategy(sourceFunctions: StreamsHandlerCallback[], headersInit: HeadersInit): RouteHandlerCallback;
export { strategy };
