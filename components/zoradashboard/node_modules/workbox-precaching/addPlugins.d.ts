import { WorkboxPlugin } from 'workbox-core/types.js';
import './_version.js';
/**
 * Adds plugins to precaching.
 *
 * @param {Array<Object>} newPlugins
 *
 * @memberof module:workbox-precaching
 */
declare function addPlugins(newPlugins: WorkboxPlugin[]): void;
export { addPlugins };
