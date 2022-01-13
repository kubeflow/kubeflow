/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const fs = require('fs');

const getStringHash = require('./get-string-hash');
const errors = require('./errors');

module.exports = (file) => {
  try {
    const buffer = fs.readFileSync(file);
    return getStringHash(buffer);
  } catch (err) {
    throw new Error(errors['unable-to-get-file-hash'] + ` '${err.message}'`);
  }
};
