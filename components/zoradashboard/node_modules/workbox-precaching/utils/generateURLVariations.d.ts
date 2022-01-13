import { FetchListenerOptions } from './addFetchListener.js';
import '../_version.js';
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
export declare function generateURLVariations(url: string, { ignoreURLParametersMatching, directoryIndex, cleanURLs, urlManipulation, }?: FetchListenerOptions): Generator<string, void, unknown>;
