"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncSyntaxHighlighter = _interopRequireDefault(require("./async-syntax-highlighter"));

var _prism = _interopRequireDefault(require("./async-languages/prism"));

var _default = (0, _asyncSyntaxHighlighter.default)({
  loader: function loader() {
    return Promise.resolve().then(function () {
      return require('refractor/core');
    }).then(function (module) {
      // Webpack 3 returns module.exports as default as module, but webpack 4 returns module.exports as module.default
      return module.default || module;
    });
  },
  isLanguageRegistered: function isLanguageRegistered(instance, language) {
    return instance.registered(language);
  },
  languageLoaders: _prism.default,
  registerLanguage: function registerLanguage(instance, name, language) {
    return instance.register(language);
  }
});

exports.default = _default;