"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("util");

var _postcss = _interopRequireDefault(require("postcss"));

var _postcssValueParser = _interopRequireDefault(require("postcss-value-parser"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pluginName = 'postcss-import-parser';

function walkAtRules(css, result, options, callback) {
  const accumulator = [];
  css.walkAtRules(/^import$/i, atRule => {
    // Convert only top-level @import
    if (atRule.parent.type !== 'root') {
      return;
    } // Nodes do not exists - `@import url('http://') :root {}`


    if (atRule.nodes) {
      result.warn("It looks like you didn't end your @import statement correctly. Child nodes are attached to it.", {
        node: atRule
      });
      return;
    }

    const {
      nodes: paramsNodes
    } = (0, _postcssValueParser.default)(atRule.params); // No nodes - `@import ;`
    // Invalid type - `@import foo-bar;`

    if (paramsNodes.length === 0 || paramsNodes[0].type !== 'string' && paramsNodes[0].type !== 'function') {
      result.warn(`Unable to find uri in "${atRule.toString()}"`, {
        node: atRule
      });
      return;
    }

    let isStringValue;
    let url;

    if (paramsNodes[0].type === 'string') {
      isStringValue = true;
      url = paramsNodes[0].value;
    } else {
      // Invalid function - `@import nourl(test.css);`
      if (paramsNodes[0].value.toLowerCase() !== 'url') {
        result.warn(`Unable to find uri in "${atRule.toString()}"`, {
          node: atRule
        });
        return;
      }

      isStringValue = paramsNodes[0].nodes.length !== 0 && paramsNodes[0].nodes[0].type === 'string';
      url = isStringValue ? paramsNodes[0].nodes[0].value : _postcssValueParser.default.stringify(paramsNodes[0].nodes);
    } // Empty url - `@import "";` or `@import url();`


    if (url.trim().length === 0) {
      result.warn(`Unable to find uri in "${atRule.toString()}"`, {
        node: atRule
      });
      return;
    }

    accumulator.push({
      atRule,
      url,
      isStringValue,
      mediaNodes: paramsNodes.slice(1)
    });
  });
  callback(null, accumulator);
}

const asyncWalkAtRules = (0, _util.promisify)(walkAtRules);

var _default = _postcss.default.plugin(pluginName, options => async (css, result) => {
  const parsedResults = await asyncWalkAtRules(css, result, options);

  if (parsedResults.length === 0) {
    return Promise.resolve();
  }

  const imports = new Map();
  const tasks = [];

  for (const parsedResult of parsedResults) {
    const {
      atRule,
      url,
      isStringValue,
      mediaNodes
    } = parsedResult;
    let normalizedUrl = url;
    let prefix = '';
    const isRequestable = (0, _utils.isUrlRequestable)(normalizedUrl);

    if (isRequestable) {
      const queryParts = normalizedUrl.split('!');

      if (queryParts.length > 1) {
        normalizedUrl = queryParts.pop();
        prefix = queryParts.join('!');
      }

      normalizedUrl = (0, _utils.normalizeUrl)(normalizedUrl, isStringValue); // Empty url after normalize - `@import '\
      // \
      // \
      // ';

      if (normalizedUrl.trim().length === 0) {
        result.warn(`Unable to find uri in "${atRule.toString()}"`, {
          node: atRule
        }); // eslint-disable-next-line no-continue

        continue;
      }
    }

    let media;

    if (mediaNodes.length > 0) {
      media = _postcssValueParser.default.stringify(mediaNodes).trim().toLowerCase();
    }

    if (options.filter && !options.filter(normalizedUrl, media)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    atRule.remove();

    if (isRequestable) {
      const request = (0, _utils.requestify)(normalizedUrl, options.rootContext);
      tasks.push((async () => {
        const {
          resolver,
          context
        } = options;
        const resolvedUrl = await (0, _utils.resolveRequests)(resolver, context, [...new Set([request, normalizedUrl])]);
        return {
          url: resolvedUrl,
          media,
          prefix,
          isRequestable
        };
      })());
    } else {
      tasks.push({
        url,
        media,
        prefix,
        isRequestable
      });
    }
  }

  const results = await Promise.all(tasks);

  for (let index = 0; index <= results.length - 1; index++) {
    const {
      url,
      isRequestable,
      media
    } = results[index];

    if (isRequestable) {
      const {
        prefix
      } = results[index];
      const newUrl = prefix ? `${prefix}!${url}` : url;
      const importKey = newUrl;
      let importName = imports.get(importKey);

      if (!importName) {
        importName = `___CSS_LOADER_AT_RULE_IMPORT_${imports.size}___`;
        imports.set(importKey, importName);
        options.imports.push({
          importName,
          url: options.urlHandler(newUrl),
          index
        });
      }

      options.api.push({
        importName,
        media,
        index
      }); // eslint-disable-next-line no-continue

      continue;
    }

    options.api.push({
      url,
      media,
      index
    });
  }

  return Promise.resolve();
});

exports.default = _default;