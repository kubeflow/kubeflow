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

const pluginName = 'postcss-url-parser';
const isUrlFunc = /url/i;
const isImageSetFunc = /^(?:-webkit-)?image-set$/i;
const needParseDecl = /(?:url|(?:-webkit-)?image-set)\(/i;

function getNodeFromUrlFunc(node) {
  return node.nodes && node.nodes[0];
}

function shouldHandleRule(rule, decl, result) {
  // https://www.w3.org/TR/css-syntax-3/#typedef-url-token
  if (rule.url.replace(/^[\s]+|[\s]+$/g, '').length === 0) {
    result.warn(`Unable to find uri in '${decl.toString()}'`, {
      node: decl
    });
    return false;
  }

  if (!(0, _utils.isUrlRequestable)(rule.url)) {
    return false;
  }

  return true;
}

function walkCss(css, result, options, callback) {
  const accumulator = [];
  css.walkDecls(decl => {
    if (!needParseDecl.test(decl.value)) {
      return;
    }

    const parsed = (0, _postcssValueParser.default)(decl.value);
    parsed.walk(node => {
      if (node.type !== 'function') {
        return;
      }

      if (isUrlFunc.test(node.value)) {
        const {
          nodes
        } = node;
        const isStringValue = nodes.length !== 0 && nodes[0].type === 'string';
        const url = isStringValue ? nodes[0].value : _postcssValueParser.default.stringify(nodes);
        const rule = {
          node: getNodeFromUrlFunc(node),
          url,
          needQuotes: false,
          isStringValue
        };

        if (shouldHandleRule(rule, decl, result)) {
          accumulator.push({
            decl,
            rule,
            parsed
          });
        } // Do not traverse inside `url`
        // eslint-disable-next-line consistent-return


        return false;
      } else if (isImageSetFunc.test(node.value)) {
        for (const nNode of node.nodes) {
          const {
            type,
            value
          } = nNode;

          if (type === 'function' && isUrlFunc.test(value)) {
            const {
              nodes
            } = nNode;
            const isStringValue = nodes.length !== 0 && nodes[0].type === 'string';
            const url = isStringValue ? nodes[0].value : _postcssValueParser.default.stringify(nodes);
            const rule = {
              node: getNodeFromUrlFunc(nNode),
              url,
              needQuotes: false,
              isStringValue
            };

            if (shouldHandleRule(rule, decl, result)) {
              accumulator.push({
                decl,
                rule,
                parsed
              });
            }
          } else if (type === 'string') {
            const rule = {
              node: nNode,
              url: value,
              needQuotes: true,
              isStringValue: true
            };

            if (shouldHandleRule(rule, decl, result)) {
              accumulator.push({
                decl,
                rule,
                parsed
              });
            }
          }
        } // Do not traverse inside `image-set`
        // eslint-disable-next-line consistent-return


        return false;
      }
    });
  });
  callback(null, accumulator);
}

const asyncWalkCss = (0, _util.promisify)(walkCss);

var _default = _postcss.default.plugin(pluginName, options => async (css, result) => {
  const parsedResults = await asyncWalkCss(css, result, options);

  if (parsedResults.length === 0) {
    return Promise.resolve();
  }

  const tasks = [];
  const imports = new Map();
  const replacements = new Map();
  let hasUrlImportHelper = false;

  for (const parsedResult of parsedResults) {
    const {
      url,
      isStringValue
    } = parsedResult.rule;
    let normalizedUrl = url;
    let prefix = '';
    const queryParts = normalizedUrl.split('!');

    if (queryParts.length > 1) {
      normalizedUrl = queryParts.pop();
      prefix = queryParts.join('!');
    }

    normalizedUrl = (0, _utils.normalizeUrl)(normalizedUrl, isStringValue);

    if (!options.filter(normalizedUrl)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!hasUrlImportHelper) {
      options.imports.push({
        importName: '___CSS_LOADER_GET_URL_IMPORT___',
        url: options.urlHandler(require.resolve('../runtime/getUrl.js')),
        index: -1
      });
      hasUrlImportHelper = true;
    }

    const splittedUrl = normalizedUrl.split(/(\?)?#/);
    const [pathname, query, hashOrQuery] = splittedUrl;
    let hash = query ? '?' : '';
    hash += hashOrQuery ? `#${hashOrQuery}` : '';
    const request = (0, _utils.requestify)(pathname, options.rootContext);
    tasks.push((async () => {
      const {
        resolver,
        context
      } = options;
      const resolvedUrl = await (0, _utils.resolveRequests)(resolver, context, [...new Set([request, normalizedUrl])]);
      return {
        url: resolvedUrl,
        prefix,
        hash,
        parsedResult
      };
    })());
  }

  const results = await Promise.all(tasks);

  for (let index = 0; index <= results.length - 1; index++) {
    const {
      url,
      prefix,
      hash,
      parsedResult: {
        decl,
        rule,
        parsed
      }
    } = results[index];
    const newUrl = prefix ? `${prefix}!${url}` : url;
    const importKey = newUrl;
    let importName = imports.get(importKey);

    if (!importName) {
      importName = `___CSS_LOADER_URL_IMPORT_${imports.size}___`;
      imports.set(importKey, importName);
      options.imports.push({
        importName,
        url: options.urlHandler(newUrl),
        index
      });
    }

    const {
      needQuotes
    } = rule;
    const replacementKey = JSON.stringify({
      newUrl,
      hash,
      needQuotes
    });
    let replacementName = replacements.get(replacementKey);

    if (!replacementName) {
      replacementName = `___CSS_LOADER_URL_REPLACEMENT_${replacements.size}___`;
      replacements.set(replacementKey, replacementName);
      options.replacements.push({
        replacementName,
        importName,
        hash,
        needQuotes
      });
    } // eslint-disable-next-line no-param-reassign


    rule.node.type = 'word'; // eslint-disable-next-line no-param-reassign

    rule.node.value = replacementName; // eslint-disable-next-line no-param-reassign

    decl.value = parsed.toString();
  }

  return Promise.resolve();
});

exports.default = _default;