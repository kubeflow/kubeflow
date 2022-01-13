/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
import { Queue } from './Queue.js';
import './_version.js';
/**
 * A class implementing the `fetchDidFail` lifecycle callback. This makes it
 * easier to add failed requests to a background sync Queue.
 *
 * @memberof module:workbox-background-sync
 */
class BackgroundSyncPlugin {
    /**
     * @param {string} name See the [Queue]{@link module:workbox-background-sync.Queue}
     *     documentation for parameter details.
     * @param {Object} [options] See the
     *     [Queue]{@link module:workbox-background-sync.Queue} documentation for
     *     parameter details.
     */
    constructor(name, options) {
        /**
         * @param {Object} options
         * @param {Request} options.request
         * @private
         */
        this.fetchDidFail = async ({ request }) => {
            await this._queue.pushRequest({ request });
        };
        this._queue = new Queue(name, options);
    }
}
export { BackgroundSyncPlugin };
