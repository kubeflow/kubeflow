(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.UniversalCookie = factory());
}(this, (function () { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	/*!
	 * cookie
	 * Copyright(c) 2012-2014 Roman Shtylman
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	/**
	 * Module exports.
	 * @public
	 */

	var parse_1 = parse;
	var serialize_1 = serialize;

	/**
	 * Module variables.
	 * @private
	 */

	var decode = decodeURIComponent;
	var encode = encodeURIComponent;
	var pairSplitRegExp = /; */;

	/**
	 * RegExp to match field-content in RFC 7230 sec 3.2
	 *
	 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
	 * field-vchar   = VCHAR / obs-text
	 * obs-text      = %x80-FF
	 */

	var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

	/**
	 * Parse a cookie header.
	 *
	 * Parse the given cookie header string into an object
	 * The object has the various cookies as keys(names) => values
	 *
	 * @param {string} str
	 * @param {object} [options]
	 * @return {object}
	 * @public
	 */

	function parse(str, options) {
	  if (typeof str !== 'string') {
	    throw new TypeError('argument str must be a string');
	  }

	  var obj = {};
	  var opt = options || {};
	  var pairs = str.split(pairSplitRegExp);
	  var dec = opt.decode || decode;

	  for (var i = 0; i < pairs.length; i++) {
	    var pair = pairs[i];
	    var eq_idx = pair.indexOf('=');

	    // skip things that don't look like key=value
	    if (eq_idx < 0) {
	      continue;
	    }

	    var key = pair.substr(0, eq_idx).trim();
	    var val = pair.substr(++eq_idx, pair.length).trim();

	    // quoted values
	    if ('"' == val[0]) {
	      val = val.slice(1, -1);
	    }

	    // only assign once
	    if (undefined == obj[key]) {
	      obj[key] = tryDecode(val, dec);
	    }
	  }

	  return obj;
	}

	/**
	 * Serialize data into a cookie header.
	 *
	 * Serialize the a name value pair into a cookie string suitable for
	 * http headers. An optional options object specified cookie parameters.
	 *
	 * serialize('foo', 'bar', { httpOnly: true })
	 *   => "foo=bar; httpOnly"
	 *
	 * @param {string} name
	 * @param {string} val
	 * @param {object} [options]
	 * @return {string}
	 * @public
	 */

	function serialize(name, val, options) {
	  var opt = options || {};
	  var enc = opt.encode || encode;

	  if (typeof enc !== 'function') {
	    throw new TypeError('option encode is invalid');
	  }

	  if (!fieldContentRegExp.test(name)) {
	    throw new TypeError('argument name is invalid');
	  }

	  var value = enc(val);

	  if (value && !fieldContentRegExp.test(value)) {
	    throw new TypeError('argument val is invalid');
	  }

	  var str = name + '=' + value;

	  if (null != opt.maxAge) {
	    var maxAge = opt.maxAge - 0;
	    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
	    str += '; Max-Age=' + Math.floor(maxAge);
	  }

	  if (opt.domain) {
	    if (!fieldContentRegExp.test(opt.domain)) {
	      throw new TypeError('option domain is invalid');
	    }

	    str += '; Domain=' + opt.domain;
	  }

	  if (opt.path) {
	    if (!fieldContentRegExp.test(opt.path)) {
	      throw new TypeError('option path is invalid');
	    }

	    str += '; Path=' + opt.path;
	  }

	  if (opt.expires) {
	    if (typeof opt.expires.toUTCString !== 'function') {
	      throw new TypeError('option expires is invalid');
	    }

	    str += '; Expires=' + opt.expires.toUTCString();
	  }

	  if (opt.httpOnly) {
	    str += '; HttpOnly';
	  }

	  if (opt.secure) {
	    str += '; Secure';
	  }

	  if (opt.sameSite) {
	    var sameSite = typeof opt.sameSite === 'string'
	      ? opt.sameSite.toLowerCase() : opt.sameSite;

	    switch (sameSite) {
	      case true:
	        str += '; SameSite=Strict';
	        break;
	      case 'lax':
	        str += '; SameSite=Lax';
	        break;
	      case 'strict':
	        str += '; SameSite=Strict';
	        break;
	      case 'none':
	        str += '; SameSite=None';
	        break;
	      default:
	        throw new TypeError('option sameSite is invalid');
	    }
	  }

	  return str;
	}

	/**
	 * Try decoding a string using a decoding function.
	 *
	 * @param {string} str
	 * @param {function} decode
	 * @private
	 */

	function tryDecode(str, decode) {
	  try {
	    return decode(str);
	  } catch (e) {
	    return str;
	  }
	}

	var cookie = {
		parse: parse_1,
		serialize: serialize_1
	};

	var utils = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.hasDocumentCookie = hasDocumentCookie;
	exports.cleanCookies = cleanCookies;
	exports.parseCookies = parseCookies;
	exports.isParsingCookie = isParsingCookie;
	exports.readCookie = readCookie;

	var cookie$1 = _interopRequireWildcard(cookie);

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
	    return cookie$1.parse(cookies, options);
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
	});

	unwrapExports(utils);
	var utils_1 = utils.hasDocumentCookie;
	var utils_2 = utils.cleanCookies;
	var utils_3 = utils.parseCookies;
	var utils_4 = utils.isParsingCookie;
	var utils_5 = utils.readCookie;

	var Cookies_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var cookie$1 = _interopRequireWildcard(cookie);



	function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

	function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

	var __assign =  function () {
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
	    this.cookies = (0, utils.parseCookies)(cookies, options);
	    new Promise(function () {
	      _this.HAS_DOCUMENT_COOKIE = (0, utils.hasDocumentCookie)();
	    })["catch"](function () {});
	  }

	  Cookies.prototype._updateBrowserValues = function (parseOptions) {
	    if (!this.HAS_DOCUMENT_COOKIE) {
	      return;
	    }

	    this.cookies = cookie$1.parse(document.cookie, parseOptions);
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

	    return (0, utils.readCookie)(this.cookies[name], options);
	  };

	  Cookies.prototype.getAll = function (options, parseOptions) {
	    if (options === void 0) {
	      options = {};
	    }

	    this._updateBrowserValues(parseOptions);

	    var result = {};

	    for (var name_1 in this.cookies) {
	      result[name_1] = (0, utils.readCookie)(this.cookies[name_1], options);
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
	      document.cookie = cookie$1.serialize(name, value, options);
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
	      document.cookie = cookie$1.serialize(name, '', finalOptions);
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
	});

	unwrapExports(Cookies_1);

	var cjs = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = void 0;

	var _Cookies = _interopRequireDefault(Cookies_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _default = _Cookies["default"];
	exports["default"] = _default;
	module.exports = exports.default;
	});

	var index = unwrapExports(cjs);

	return index;

})));
