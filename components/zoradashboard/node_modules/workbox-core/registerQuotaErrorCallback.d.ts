import './_version.js';
/**
 * Adds a function to the set of quotaErrorCallbacks that will be executed if
 * there's a quota error.
 *
 * @param {Function} callback
 * @memberof module:workbox-core
 */
declare function registerQuotaErrorCallback(callback: Function): void;
export { registerQuotaErrorCallback };
