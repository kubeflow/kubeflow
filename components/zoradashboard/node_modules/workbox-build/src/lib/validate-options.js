/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

module.exports = (options, schema) => {
  const {value, error} = schema.validate(options, {
    language: {
      object: {
        allowUnknown: 'is not a supported parameter.',
      },
    },
  });

  if (error) {
    throw error;
  }

  return value;
};
