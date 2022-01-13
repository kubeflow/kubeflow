import { Handler, HandlerObject } from '../_types.js';
import '../_version.js';
/**
 * @param {function()|Object} handler Either a function, or an object with a
 * 'handle' method.
 * @return {Object} An object with a handle method.
 *
 * @private
 */
export declare const normalizeHandler: (handler: Handler) => HandlerObject;
