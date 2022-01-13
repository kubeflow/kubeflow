"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasDocumentCookie = hasDocumentCookie;
exports.cleanCookies = cleanCookies;
exports.parseCookies = parseCookies;
exports.isParsingCookie = isParsingCookie;
exports.readCookie = readCookie;

var cookie = _interopRequireWildcard(require("cookie"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function hasDocumentCookie() {
  // Can we get/set cookies on document.cookie?
  return (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object' && typeof document.cookie === 'string';
}

function cleanCookies() {
  document.cookie.split(';').forEach(function (c) {
    document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });
}

function parseCookies(cookies, options) {
  if (typeof cookies === 'string') {
    return cookie.parse(cookies, options);
  } else if (_typeof(cookies) === 'object' && cookies !== null) {
    return cookies;
  } else {
    return {};
  }
}

function isParsingCookie(value, doNotParse) {
  if (typeof doNotParse === 'undefined') {
    // We guess if the cookie start with { or [, it has been serialized
    doNotParse = !value || value[0] !== '{' && value[0] !== '[' && value[0] !== '"';
  }

  return !doNotParse;
}

function readCookie(value, options) {
  if (options === void 0) {
    options = {};
  }

  var cleanValue = cleanupCookieValue(value);

  if (isParsingCookie(cleanValue, options.doNotParse)) {
    try {
      return JSON.parse(cleanValue);
    } catch (e) {// At least we tried
    }
  } // Ignore clean value if we failed the deserialization
  // It is not relevant anymore to trim those values


  return value;
}

function cleanupCookieValue(value) {
  // express prepend j: before serializing a cookie
  if (value && value[0] === 'j' && value[1] === ':') {
    return value.substr(2);
  }

  return value;
}