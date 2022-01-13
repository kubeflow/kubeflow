/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const crypto = require('crypto');

module.exports = (string) => {
  const md5 = crypto.createHash('md5');
  md5.update(string);
  return md5.digest('hex');
};
