/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const errors = require('./errors');
const escapeRegExp = require('./escape-regexp');

module.exports = (modifyURLPrefix) => {
  if (!modifyURLPrefix ||
      typeof modifyURLPrefix !== 'object' ||
      Array.isArray(modifyURLPrefix)) {
    throw new Error(errors['modify-url-prefix-bad-prefixes']);
  }

  // If there are no entries in modifyURLPrefix, just return an identity
  // function as a shortcut.
  if (Object.keys(modifyURLPrefix).length === 0) {
    return (entry) => entry;
  }

  Object.keys(modifyURLPrefix).forEach((key) => {
    if (typeof modifyURLPrefix[key] !== 'string') {
      throw new Error(errors['modify-url-prefix-bad-prefixes']);
    }
  });

  // Escape the user input so it's safe to use in a regex.
  const safeModifyURLPrefixes = Object.keys(modifyURLPrefix).map(escapeRegExp);
  // Join all the `modifyURLPrefix` keys so a single regex can be used.
  const prefixMatchesStrings = safeModifyURLPrefixes.join('|');
  // Add `^` to the front the prefix matches so it only matches the start of
  // a string.
  const modifyRegex = new RegExp(`^(${prefixMatchesStrings})`);

  return (originalManifest) => {
    const manifest = originalManifest.map((entry) => {
      if (typeof entry.url !== 'string') {
        throw new Error(errors['manifest-entry-bad-url']);
      }

      entry.url = entry.url.replace(modifyRegex, (match) => {
        return modifyURLPrefix[match];
      });

      return entry;
    });

    return {manifest};
  };
};
