"use strict";

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const upath = require('upath');

const resolveWebpackURL = require('./resolve-webpack-url');

module.exports = (compilation, chunkNames) => {
  const {
    chunks
  } = compilation.getStats().toJson({
    chunks: true
  });
  const {
    publicPath
  } = compilation.options.output;
  const scriptFiles = new Set();

  for (const chunkName of chunkNames) {
    const chunk = chunks.find(chunk => chunk.names.includes(chunkName));

    if (chunk) {
      for (const file of chunk.files) {
        // See https://github.com/GoogleChrome/workbox/issues/2161
        if (upath.extname(file) === '.js') {
          scriptFiles.add(resolveWebpackURL(publicPath, file));
        }
      }
    } else {
      compilation.warnings.push(`${chunkName} was provided to ` + `importScriptsViaChunks, but didn't match any named chunks.`);
    }
  }

  if (scriptFiles.size === 0) {
    compilation.warnings.push(`There were no assets matching ` + `importScriptsViaChunks: [${chunkNames}].`);
  }

  return Array.from(scriptFiles);
};