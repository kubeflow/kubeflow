/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

import {WorkboxPlugin} from 'workbox-core/types.js';
import '../_version.js';


const plugins: WorkboxPlugin[] = [];

export const precachePlugins = {
  /*
   * @return {Array}
   * @private
   */
  get() {
    return plugins;
  },

  /*
   * @param {Array} newPlugins
   * @private
   */
  add(newPlugins: WorkboxPlugin[]) {
    plugins.push(...newPlugins);
  },
};
