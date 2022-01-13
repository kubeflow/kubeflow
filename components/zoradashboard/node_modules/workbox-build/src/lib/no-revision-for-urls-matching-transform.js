/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const errors = require('./errors');

module.exports = (regexp) => {
  if (!(regexp instanceof RegExp)) {
    throw new Error(errors['invalid-dont-cache-bust']);
  }

  return (originalManifest) => {
    const manifest = originalManifest.map((entry) => {
      if (typeof entry.url !== 'string') {
        throw new Error(errors['manifest-entry-bad-url']);
      }

      if (entry.url.match(regexp)) {
        entry.revision = null;
      }

      return entry;
    });

    return {manifest};
  };
};
