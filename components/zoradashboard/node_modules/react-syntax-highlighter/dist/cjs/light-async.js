"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncSyntaxHighlighter = _interopRequireDefault(require("./async-syntax-highlighter"));

var _hljs = _interopRequireDefault(require("./async-languages/hljs"));

var _checkForListedLanguage = _interopRequireDefault(require("./checkForListedLanguage"));

var _default = (0, _asyncSyntaxHighlighter.default)({
  loader: function loader() {
    return Promise.resolve().then(function () {
      return require('lowlight/lib/core');
    }).then(function (module) {
      // Webpack 3 returns module.exports as default as module, but webpack 4 returns module.exports as module.default
      return module.default || module;
    });
  },
  isLanguageRegistered: function isLanguageRegistered(instance, language) {
    return !!(0, _checkForListedLanguage.default)(instance, language);
  },
  languageLoaders: _hljs.default,
  registerLanguage: function registerLanguage(instance, name, language) {
    return instance.registerLanguage(name, language);
  }
});

exports.default = _default;