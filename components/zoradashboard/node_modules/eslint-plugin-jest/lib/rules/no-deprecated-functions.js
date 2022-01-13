"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports._clearCachedJestVersion = void 0;

var _experimentalUtils = require("@typescript-eslint/experimental-utils");

var _utils = require("./utils");

let cachedJestVersion = null;
/** @internal */

const _clearCachedJestVersion = () => cachedJestVersion = null;

exports._clearCachedJestVersion = _clearCachedJestVersion;

const detectJestVersion = () => {
  if (cachedJestVersion) {
    return cachedJestVersion;
  }

  try {
    const jestPath = require.resolve('jest/package.json', {
      paths: [process.cwd()]
    });

    const jestPackageJson = // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(jestPath);

    if (jestPackageJson.version) {
      const [majorVersion] = jestPackageJson.version.split('.');
      return cachedJestVersion = parseInt(majorVersion, 10);
    }
  } catch {}

  throw new Error('Unable to detect Jest version - please ensure jest package is installed, or otherwise set version explicitly');
};

var _default = (0, _utils.createRule)({
  name: __filename,
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Disallow use of deprecated functions',
      recommended: 'error'
    },
    messages: {
      deprecatedFunction: '`{{ deprecation }}` has been deprecated in favor of `{{ replacement }}`'
    },
    type: 'suggestion',
    schema: [],
    fixable: 'code'
  },
  defaultOptions: [],

  create(context) {
    var _context$settings, _context$settings$jes;

    const jestVersion = ((_context$settings = context.settings) === null || _context$settings === void 0 ? void 0 : (_context$settings$jes = _context$settings.jest) === null || _context$settings$jes === void 0 ? void 0 : _context$settings$jes.version) || detectJestVersion();
    const deprecations = { ...(jestVersion >= 15 && {
        'jest.resetModuleRegistry': 'jest.resetModules'
      }),
      ...(jestVersion >= 17 && {
        'jest.addMatchers': 'expect.extend'
      }),
      ...(jestVersion >= 21 && {
        'require.requireMock': 'jest.requireMock',
        'require.requireActual': 'jest.requireActual'
      }),
      ...(jestVersion >= 22 && {
        'jest.runTimersToTime': 'jest.advanceTimersByTime'
      }),
      ...(jestVersion >= 26 && {
        'jest.genMockFromModule': 'jest.createMockFromModule'
      })
    };
    return {
      CallExpression(node) {
        if (node.callee.type !== _experimentalUtils.AST_NODE_TYPES.MemberExpression) {
          return;
        }

        const deprecation = (0, _utils.getNodeName)(node);

        if (!deprecation || !(deprecation in deprecations)) {
          return;
        }

        const replacement = deprecations[deprecation];
        const {
          callee
        } = node;
        context.report({
          messageId: 'deprecatedFunction',
          data: {
            deprecation,
            replacement
          },
          node,

          fix(fixer) {
            let [name, func] = replacement.split('.');

            if (callee.property.type === _experimentalUtils.AST_NODE_TYPES.Literal) {
              func = `'${func}'`;
            }

            return [fixer.replaceText(callee.object, name), fixer.replaceText(callee.property, func)];
          }

        });
      }

    };
  }

});

exports.default = _default;