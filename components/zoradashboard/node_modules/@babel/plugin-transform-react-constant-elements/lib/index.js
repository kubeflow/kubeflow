"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _core = require("@babel/core");

var _default = (0, _helperPluginUtils.declare)((api, options) => {
  api.assertVersion(7);
  const {
    allowMutablePropsOnTags
  } = options;

  if (allowMutablePropsOnTags != null && !Array.isArray(allowMutablePropsOnTags)) {
    throw new Error(".allowMutablePropsOnTags must be an array, null, or undefined.");
  }

  const HOISTED = new WeakMap();

  function declares(node, scope) {
    if (_core.types.isJSXIdentifier(node, {
      name: "this"
    }) || _core.types.isJSXIdentifier(node, {
      name: "arguments"
    }) || _core.types.isJSXIdentifier(node, {
      name: "super"
    }) || _core.types.isJSXIdentifier(node, {
      name: "new"
    })) {
      const {
        path
      } = scope;
      return path.isFunctionParent() && !path.isArrowFunctionExpression();
    }

    return scope.hasOwnBinding(node.name);
  }

  function isHoistingScope({
    path
  }) {
    return path.isFunctionParent() || path.isLoop() || path.isProgram();
  }

  function getHoistingScope(scope) {
    while (!isHoistingScope(scope)) scope = scope.parent;

    return scope;
  }

  const analyzer = {
    enter(path, state) {
      const stop = () => {
        state.isImmutable = false;
        path.stop();
      };

      if (path.isJSXClosingElement()) {
        path.skip();
        return;
      }

      if (path.isJSXIdentifier({
        name: "ref"
      }) && path.parentPath.isJSXAttribute({
        name: path.node
      })) {
        return stop();
      }

      if (path.isJSXIdentifier() || path.isJSXMemberExpression() || path.isJSXNamespacedName()) {
        return;
      }

      if (path.isIdentifier()) {
        const binding = path.scope.getBinding(path.node.name);
        if (binding && binding.constant) return;
      }

      if (!path.isImmutable()) {
        if (path.isPure()) {
          const expressionResult = path.evaluate();

          if (expressionResult.confident) {
            const {
              value
            } = expressionResult;
            const isMutable = !state.mutablePropsAllowed && value && typeof value === "object" || typeof value === "function";

            if (!isMutable) {
              path.skip();
              return;
            }
          } else if (_core.types.isIdentifier(expressionResult.deopt)) {
            return;
          }
        }

        stop();
      }
    },

    ReferencedIdentifier(path, state) {
      const {
        node
      } = path;
      let {
        scope
      } = path;

      while (scope) {
        if (scope === state.targetScope) return;
        if (declares(node, scope)) break;
        scope = scope.parent;
      }

      state.targetScope = getHoistingScope(scope);
    }

  };
  return {
    name: "transform-react-constant-elements",
    visitor: {
      JSXElement(path) {
        var _jsxScope;

        if (HOISTED.has(path.node)) return;
        HOISTED.set(path.node, path.scope);
        const name = path.node.openingElement.name;
        let mutablePropsAllowed = false;

        if (allowMutablePropsOnTags != null) {
          let lastSegment = name;

          while (_core.types.isJSXMemberExpression(lastSegment)) {
            lastSegment = lastSegment.property;
          }

          const elementName = lastSegment.name;
          mutablePropsAllowed = allowMutablePropsOnTags.includes(elementName);
        }

        const state = {
          isImmutable: true,
          mutablePropsAllowed,
          targetScope: path.scope.getProgramParent()
        };
        path.traverse(analyzer, state);
        if (!state.isImmutable) return;
        const {
          targetScope
        } = state;
        HOISTED.set(path.node, targetScope);
        let jsxScope;
        let current = path;

        while (!jsxScope && current.parentPath.isJSX()) {
          current = current.parentPath;
          jsxScope = HOISTED.get(current.node);
        }

        (_jsxScope = jsxScope) != null ? _jsxScope : jsxScope = getHoistingScope(path.scope);
        if (targetScope === jsxScope) return;
        const id = path.scope.generateUidBasedOnNode(name);
        targetScope.push({
          id: _core.types.identifier(id)
        });
        let replacement = _core.template.expression.ast`
          ${_core.types.identifier(id)} || (${_core.types.identifier(id)} = ${path.node})
        `;

        if (path.parentPath.isJSXElement() || path.parentPath.isJSXAttribute()) {
          replacement = _core.types.jsxExpressionContainer(replacement);
        }

        path.replaceWith(replacement);
      }

    }
  };
});

exports.default = _default;