"use strict";

/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const objectStringify = require('stringify-object');

const stripComments = require('strip-comments');

module.exports = obj => {
  return objectStringify(obj, {
    transform: (_obj, _prop, str) => typeof _obj[_prop] === 'function' ? stripComments(str) : str
  });
};