"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var cookie = _interopRequireWildcard(require("cookie"));

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var Cookies =
/** @class */
function () {
  function Cookies(cookies, options) {
    var _this = this;

    this.changeListeners = [];
    this.HAS_DOCUMENT_COOKIE = false;
    this.cookies = (0, _utils.parseCookies)(cookies, options);
    new Promise(function () {
      _this.HAS_DOCUMENT_COOKIE = (0, _utils.hasDocumentCookie)();
    })["catch"](function () {});
  }

  Cookies.prototype._updateBrowserValues = function (parseOptions) {
    if (!this.HAS_DOCUMENT_COOKIE) {
      return;
    }

    this.cookies = cookie.parse(document.cookie, parseOptions);
  };

  Cookies.prototype._emitChange = function (params) {
    for (var i = 0; i < this.changeListeners.length; ++i) {
      this.changeListeners[i](params);
    }
  };

  Cookies.prototype.get = function (name, options, parseOptions) {
    if (options === void 0) {
      options = {};
    }

    this._updateBrowserValues(parseOptions);

    return (0, _utils.readCookie)(this.cookies[name], options);
  };

  Cookies.prototype.getAll = function (options, parseOptions) {
    if (options === void 0) {
      options = {};
    }

    this._updateBrowserValues(parseOptions);

    var result = {};

    for (var name_1 in this.cookies) {
      result[name_1] = (0, _utils.readCookie)(this.cookies[name_1], options);
    }

    return result;
  };

  Cookies.prototype.set = function (name, value, options) {
    var _a;

    if (_typeof(value) === 'object') {
      value = JSON.stringify(value);
    }

    this.cookies = __assign(__assign({}, this.cookies), (_a = {}, _a[name] = value, _a));

    if (this.HAS_DOCUMENT_COOKIE) {
      document.cookie = cookie.serialize(name, value, options);
    }

    this._emitChange({
      name: name,
      value: value,
      options: options
    });
  };

  Cookies.prototype.remove = function (name, options) {
    var finalOptions = options = __assign(__assign({}, options), {
      expires: new Date(1970, 1, 1, 0, 0, 1),
      maxAge: 0
    });

    this.cookies = __assign({}, this.cookies);
    delete this.cookies[name];

    if (this.HAS_DOCUMENT_COOKIE) {
      document.cookie = cookie.serialize(name, '', finalOptions);
    }

    this._emitChange({
      name: name,
      value: undefined,
      options: options
    });
  };

  Cookies.prototype.addChangeListener = function (callback) {
    this.changeListeners.push(callback);
  };

  Cookies.prototype.removeChangeListener = function (callback) {
    var idx = this.changeListeners.indexOf(callback);

    if (idx >= 0) {
      this.changeListeners.splice(idx, 1);
    }
  };

  return Cookies;
}();

var _default = Cookies;
exports["default"] = _default;
module.exports = exports.default;