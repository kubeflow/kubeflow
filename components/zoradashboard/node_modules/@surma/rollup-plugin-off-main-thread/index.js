/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { readFileSync } = require("fs");
const { join } = require("path");
const ejs = require("ejs");
const MagicString = require("magic-string");

const defaultOpts = {
  // A string containing the EJS template for the amd loader. If `undefined`,
  // OMT will use `loader.ejs`.
  loader: readFileSync(join(__dirname, "/loader.ejs"), "utf8"),
  // Use `fetch()` + `eval()` to load dependencies instead of `<script>` tags
  // and `importScripts()`. _This is not CSP compliant, but is required if you
  // want to use dynamic imports in ServiceWorker_.
  useEval: false,
  // A RegExp to find `new Workers()` calls. The second capture group _must_
  // capture the provided file name without the quotes.
  workerRegexp: /new Worker\((["'])(.+?)\1(,[^)]+)?\)/g,
  // Function name to use instead of AMD’s `define`.
  amdFunctionName: "define",
  // A function that determines whether the loader code should be prepended to a
  // certain chunk. Should return true if the load is supposed to be prepended.
  prependLoader: (chunk, workerFiles) =>
    chunk.isEntry || workerFiles.includes(chunk.facadeModuleId),
  // The scheme used when importing workers as a URL.
  urlLoaderScheme: "omt",
  // Silence the warning about ESM being badly supported in workers.
  silenceESMWorkerWarning: false,
};

module.exports = function(opts = {}) {
  opts = Object.assign({}, defaultOpts, opts);

  opts.loader = ejs.render(opts.loader, opts);

  const urlLoaderPrefix = opts.urlLoaderScheme + ":";

  let workerFiles;
  let isEsmOutput = false;
  return {
    name: "off-main-thread",

    async buildStart(options) {
      workerFiles = [];
    },

    outputOptions({ format }) {
      if ((format === "esm" || format === "es") && !opts.silenceESMWorkerWarning) {
        this.warn(
          'Very few browsers support ES modules in Workers. If you want to your code to run in all browsers, set `output.format = "amd";`'
        );
        // In ESM, we never prepend a loader.
        isEsmOutput = true;
      } else if (format !== "amd") {
        this.error(
          `\`output.format\` must either be "amd" or "esm", got "${format}"`
        );
      }
    },

    async resolveId(id, importer) {
      if (!id.startsWith(urlLoaderPrefix)) return;

      const path = id.slice(urlLoaderPrefix.length);
      const resolved = await this.resolve(path, importer);
      if (!resolved) throw Error(`Cannot find module '${path}' from '${importer}'`);
      const newId = resolved.id;

      return urlLoaderPrefix + newId;
    },

    load(id) {
      if (!id.startsWith(urlLoaderPrefix)) return;

      const realId = id.slice(urlLoaderPrefix.length);
      const chunkRef = this.emitFile({ id: realId, type: "chunk" });
      return `export default import.meta.ROLLUP_FILE_URL_${chunkRef};`;
    },

    async transform(code, id) {
      // Copy the regexp as they are stateful and this hook is async.
      const workerRegexp = new RegExp(
        opts.workerRegexp.source,
        opts.workerRegexp.flags
      );
      if (!workerRegexp.test(code)) {
        return;
      }

      const ms = new MagicString(code);
      // Reset the regexp
      workerRegexp.lastIndex = 0;
      while (true) {
        const match = workerRegexp.exec(code);
        if (!match) {
          break;
        }

        const workerFile = match[2];
        let optionsObject = {};
        // Parse the optional options object
        if (match[3] && match[3].length > 0) {
          // FIXME: ooooof!
          optionsObject = new Function(`return ${match[3].slice(1)};`)();
        }
        if (!isEsmOutput) {
          delete optionsObject.type;
        }

        if (!new RegExp("^.*/").test(workerFile)) {
          this.warn(
            `Paths passed to the Worker constructor must be relative or absolute, i.e. start with /, ./ or ../ (just like dynamic import!). Ignoring "${workerFile}".`
          );
          continue;
        }

        const resolvedWorkerFile = (await this.resolve(workerFile, id)).id;
        workerFiles.push(resolvedWorkerFile);
        const chunkRefId = this.emitFile({
          id: resolvedWorkerFile,
          type: "chunk"
        });

        const workerParametersStartIndex = match.index + "new Worker(".length;
        const workerParametersEndIndex =
          match.index + match[0].length - ")".length;

        ms.overwrite(
          workerParametersStartIndex,
          workerParametersEndIndex,
          `import.meta.ROLLUP_FILE_URL_${chunkRefId}, ${JSON.stringify(
            optionsObject
          )}`
        );
      }

      return {
        code: ms.toString(),
        map: ms.generateMap({ hires: true })
      };
    },

    resolveFileUrl(chunk) {
      return `"./${chunk.fileName}"`;
    },

    renderChunk(code, chunk, outputOptions) {
      // We don’t need to do any loader processing when targeting ESM format.
      if (isEsmOutput) {
        return;
      }
      if (outputOptions.banner && outputOptions.banner.length > 0) {
        this.error(
          "OMT currently doesn’t work with `banner`. Feel free to submit a PR at https://github.com/surma/rollup-plugin-off-main-thread"
        );
        return;
      }
      const ms = new MagicString(code);

      // Mangle define() call
      const id = `./${chunk.fileName}`;
      ms.remove(0, "define(".length);
      // If the module does not have any dependencies, it’s technically okay
      // to skip the dependency array. But our minimal loader expects it, so
      // we add it back in.
      if (!code.startsWith("define([")) {
        ms.prepend("[],");
      }
      ms.prepend(`${opts.amdFunctionName}("${id}",`);

      // Prepend loader if it’s an entry point or a worker file
      if (opts.prependLoader(chunk, workerFiles)) {
        ms.prepend(opts.loader);
      }

      return {
        code: ms.toString(),
        map: ms.generateMap({ hires: true })
      };
    }
  };
};
