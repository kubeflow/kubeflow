"use strict";

/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/
const {
  rollup
} = require('rollup');

const {
  terser
} = require('rollup-plugin-terser');

const {
  writeFile
} = require('fs-extra');

const babel = require('rollup-plugin-babel');

const omt = require('@surma/rollup-plugin-off-main-thread');

const upath = require('upath');

const presetEnv = require('@babel/preset-env');

const replace = require('@rollup/plugin-replace');

const resolve = require('@rollup/plugin-node-resolve');

const tempy = require('tempy');

module.exports = async ({
  babelPresetEnvTargets,
  inlineWorkboxRuntime,
  mode,
  sourcemap,
  swDest,
  unbundledCode
}) => {
  // We need to write this to the "real" file system, as Rollup won't read from
  // a custom file system.
  const {
    dir,
    base
  } = upath.parse(swDest);
  const temporaryFile = tempy.file({
    name: base
  });
  await writeFile(temporaryFile, unbundledCode);
  const plugins = [resolve(), replace({
    'process.env.NODE_ENV': JSON.stringify(mode)
  }), babel({
    // Disable the logic that checks for local Babel config files:
    // https://github.com/GoogleChrome/workbox/issues/2111
    babelrc: false,
    configFile: false,
    presets: [[presetEnv, {
      targets: {
        browsers: babelPresetEnvTargets
      },
      loose: true
    }]]
  })];

  if (mode === 'production') {
    plugins.push(terser({
      mangle: {
        toplevel: true,
        properties: {
          regex: /(^_|_$)/
        }
      }
    }));
  }

  const rollupConfig = {
    plugins,
    input: temporaryFile
  }; // Rollup will inline the runtime by default. If we don't want that, we need
  // to add in some additional config.

  if (!inlineWorkboxRuntime) {
    rollupConfig.plugins.unshift(omt());

    rollupConfig.manualChunks = id => {
      return id.includes('workbox') ? 'workbox' : undefined;
    };
  }

  const bundle = await rollup(rollupConfig);
  const {
    output
  } = await bundle.generate({
    sourcemap,
    // Using an external Workbox runtime requires 'amd'.
    format: inlineWorkboxRuntime ? 'es' : 'amd'
  });
  const files = [];

  for (const chunkOrAsset of output) {
    if (chunkOrAsset.isAsset) {
      files.push({
        name: chunkOrAsset.fileName,
        contents: chunkOrAsset.source
      });
    } else {
      let code = chunkOrAsset.code;

      if (chunkOrAsset.map) {
        const sourceMapFile = chunkOrAsset.fileName + '.map';
        code += `//# sourceMappingURL=${sourceMapFile}\n`;
        files.push({
          name: sourceMapFile,
          contents: chunkOrAsset.map.toString()
        });
      }

      files.push({
        name: chunkOrAsset.fileName,
        contents: code
      });
    }
  } // Make sure that if there was a directory portion included in swDest, it's
  // preprended to all of the generated files.


  return files.map(file => {
    file.name = upath.format({
      dir,
      base: file.name
    });
    return file;
  });
};