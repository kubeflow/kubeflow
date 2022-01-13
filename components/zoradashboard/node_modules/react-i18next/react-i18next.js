(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.ReactI18next = {}, global.React));
}(this, function (exports, React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var voidElements = {
    "area": true,
    "base": true,
    "br": true,
    "col": true,
    "embed": true,
    "hr": true,
    "img": true,
    "input": true,
    "link": true,
    "meta": true,
    "param": true,
    "source": true,
    "track": true,
    "wbr": true
  };

  var t = /\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;

  function n(n) {
    var r = {
      type: "tag",
      name: "",
      voidElement: !1,
      attrs: {},
      children: []
    },
        i = n.match(/<\/?([^\s]+?)[/\s>]/);

    if (i && (r.name = i[1], (voidElements[i[1]] || "/" === n.charAt(n.length - 2)) && (r.voidElement = !0), r.name.startsWith("!--"))) {
      var s = n.indexOf("--\x3e");
      return {
        type: "comment",
        comment: -1 !== s ? n.slice(4, s) : ""
      };
    }

    for (var a = new RegExp(t), c = null; null !== (c = a.exec(n));) {
      if (c[0].trim()) if (c[1]) {
        var o = c[1].trim(),
            l = [o, ""];
        o.indexOf("=") > -1 && (l = o.split("=")), r.attrs[l[0]] = l[1], a.lastIndex--;
      } else c[2] && (r.attrs[c[2]] = c[3].trim().substring(1, c[3].length - 1));
    }

    return r;
  }

  var r = /<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g,
      i = /^\s*$/,
      s = Object.create(null);

  function a(e, t) {
    switch (t.type) {
      case "text":
        return e + t.content;

      case "tag":
        return e += "<" + t.name + (t.attrs ? function (e) {
          var t = [];

          for (var n in e) {
            t.push(n + '="' + e[n] + '"');
          }

          return t.length ? " " + t.join(" ") : "";
        }(t.attrs) : "") + (t.voidElement ? "/>" : ">"), t.voidElement ? e : e + t.children.reduce(a, "") + "</" + t.name + ">";

      case "comment":
        return e + "\x3c!--" + t.comment + "--\x3e";
    }
  }

  var c = {
    parse: function parse(e, t) {
      t || (t = {}), t.components || (t.components = s);
      var a,
          c = [],
          o = [],
          l = -1,
          m = !1;

      if (0 !== e.indexOf("<")) {
        var u = e.indexOf("<");
        c.push({
          type: "text",
          content: -1 === u ? e : e.substring(0, u)
        });
      }

      return e.replace(r, function (r, s) {
        if (m) {
          if (r !== "</" + a.name + ">") return;
          m = !1;
        }

        var u,
            f = "/" !== r.charAt(1),
            h = r.startsWith("\x3c!--"),
            p = s + r.length,
            d = e.charAt(p);

        if (h) {
          var v = n(r);
          return l < 0 ? (c.push(v), c) : ((u = o[l]).children.push(v), c);
        }

        if (f && (l++, "tag" === (a = n(r)).type && t.components[a.name] && (a.type = "component", m = !0), a.voidElement || m || !d || "<" === d || a.children.push({
          type: "text",
          content: e.slice(p, e.indexOf("<", p))
        }), 0 === l && c.push(a), (u = o[l - 1]) && u.children.push(a), o[l] = a), (!f || a.voidElement) && (l > -1 && (a.voidElement || a.name === r.slice(2, -1)) && (l--, a = -1 === l ? c : o[l]), !m && "<" !== d && d)) {
          u = -1 === l ? c : o[l].children;
          var x = e.indexOf("<", p),
              g = e.slice(p, -1 === x ? void 0 : x);
          i.test(g) && (g = " "), (x > -1 && l + u.length >= 0 || " " !== g) && u.push({
            type: "text",
            content: g
          });
        }
      }), c;
    },
    stringify: function stringify(e) {
      return e.reduce(function (e, t) {
        return e + a("", t);
      }, "");
    }
  };

  var defaultOptions = {
    bindI18n: 'languageChanged',
    bindI18nStore: '',
    transEmptyNodeValue: '',
    transSupportBasicHtmlNodes: true,
    transWrapTextNodes: '',
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
    useSuspense: true
  };
  var i18nInstance;
  var I18nContext = React__default.createContext();
  function setDefaults() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    defaultOptions = _objectSpread2(_objectSpread2({}, defaultOptions), options);
  }
  function getDefaults() {
    return defaultOptions;
  }
  var ReportNamespaces = function () {
    function ReportNamespaces() {
      _classCallCheck(this, ReportNamespaces);

      this.usedNamespaces = {};
    }

    _createClass(ReportNamespaces, [{
      key: "addUsedNamespaces",
      value: function addUsedNamespaces(namespaces) {
        var _this = this;

        namespaces.forEach(function (ns) {
          if (!_this.usedNamespaces[ns]) _this.usedNamespaces[ns] = true;
        });
      }
    }, {
      key: "getUsedNamespaces",
      value: function getUsedNamespaces() {
        return Object.keys(this.usedNamespaces);
      }
    }]);

    return ReportNamespaces;
  }();
  function setI18n(instance) {
    i18nInstance = instance;
  }
  function getI18n() {
    return i18nInstance;
  }
  var initReactI18next = {
    type: '3rdParty',
    init: function init(instance) {
      setDefaults(instance.options.react);
      setI18n(instance);
    }
  };
  function composeInitialProps(ForComponent) {
    return function (ctx) {
      return new Promise(function (resolve) {
        var i18nInitialProps = getInitialProps();

        if (ForComponent.getInitialProps) {
          ForComponent.getInitialProps(ctx).then(function (componentsInitialProps) {
            resolve(_objectSpread2(_objectSpread2({}, componentsInitialProps), i18nInitialProps));
          });
        } else {
          resolve(i18nInitialProps);
        }
      });
    };
  }
  function getInitialProps() {
    var i18n = getI18n();
    var namespaces = i18n.reportNamespaces ? i18n.reportNamespaces.getUsedNamespaces() : [];
    var ret = {};
    var initialI18nStore = {};
    i18n.languages.forEach(function (l) {
      initialI18nStore[l] = {};
      namespaces.forEach(function (ns) {
        initialI18nStore[l][ns] = i18n.getResourceBundle(l, ns) || {};
      });
    });
    ret.initialI18nStore = initialI18nStore;
    ret.initialLanguage = i18n.language;
    return ret;
  }

  function warn() {
    if (console && console.warn) {
      var _console;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (typeof args[0] === 'string') args[0] = "react-i18next:: ".concat(args[0]);

      (_console = console).warn.apply(_console, args);
    }
  }
  var alreadyWarned = {};
  function warnOnce() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (typeof args[0] === 'string' && alreadyWarned[args[0]]) return;
    if (typeof args[0] === 'string') alreadyWarned[args[0]] = new Date();
    warn.apply(void 0, args);
  }
  function loadNamespaces(i18n, ns, cb) {
    i18n.loadNamespaces(ns, function () {
      if (i18n.isInitialized) {
        cb();
      } else {
        var initialized = function initialized() {
          setTimeout(function () {
            i18n.off('initialized', initialized);
          }, 0);
          cb();
        };

        i18n.on('initialized', initialized);
      }
    });
  }
  function hasLoadedNamespace(ns, i18n) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (!i18n.languages || !i18n.languages.length) {
      warnOnce('i18n.languages were undefined or empty', i18n.languages);
      return true;
    }

    var lng = i18n.languages[0];
    var fallbackLng = i18n.options ? i18n.options.fallbackLng : false;
    var lastLng = i18n.languages[i18n.languages.length - 1];
    if (lng.toLowerCase() === 'cimode') return true;

    var loadNotPending = function loadNotPending(l, n) {
      var loadState = i18n.services.backendConnector.state["".concat(l, "|").concat(n)];
      return loadState === -1 || loadState === 2;
    };

    if (options.bindI18n && options.bindI18n.indexOf('languageChanging') > -1 && i18n.services.backendConnector.backend && i18n.isLanguageChangingTo && !loadNotPending(i18n.isLanguageChangingTo, ns)) return false;
    if (i18n.hasResourceBundle(lng, ns)) return true;
    if (!i18n.services.backendConnector.backend) return true;
    if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
    return false;
  }
  function getDisplayName(Component) {
    return Component.displayName || Component.name || (typeof Component === 'string' && Component.length > 0 ? Component : 'Unknown');
  }

  var _excluded = ["format"],
      _excluded2 = ["children", "count", "parent", "i18nKey", "tOptions", "values", "defaults", "components", "ns", "i18n", "t"];

  function hasChildren(node, checkLength) {
    if (!node) return false;
    var base = node.props ? node.props.children : node.children;
    if (checkLength) return base.length > 0;
    return !!base;
  }

  function getChildren(node) {
    if (!node) return [];
    return node && node.children ? node.children : node.props && node.props.children;
  }

  function hasValidReactChildren(children) {
    if (Object.prototype.toString.call(children) !== '[object Array]') return false;
    return children.every(function (child) {
      return React__default.isValidElement(child);
    });
  }

  function getAsArray(data) {
    return Array.isArray(data) ? data : [data];
  }

  function mergeProps(source, target) {
    var newTarget = _objectSpread2({}, target);

    newTarget.props = Object.assign(source.props, target.props);
    return newTarget;
  }

  function nodesToString(children, i18nOptions) {
    if (!children) return '';
    var stringNode = '';
    var childrenArray = getAsArray(children);
    var keepArray = i18nOptions.transKeepBasicHtmlNodesFor || [];
    childrenArray.forEach(function (child, childIndex) {
      if (typeof child === 'string') {
        stringNode += "".concat(child);
      } else if (React__default.isValidElement(child)) {
        var childPropsCount = Object.keys(child.props).length;
        var shouldKeepChild = keepArray.indexOf(child.type) > -1;
        var childChildren = child.props.children;

        if (!childChildren && shouldKeepChild && childPropsCount === 0) {
          stringNode += "<".concat(child.type, "/>");
        } else if (!childChildren && (!shouldKeepChild || childPropsCount !== 0)) {
          stringNode += "<".concat(childIndex, "></").concat(childIndex, ">");
        } else if (child.props.i18nIsDynamicList) {
          stringNode += "<".concat(childIndex, "></").concat(childIndex, ">");
        } else if (shouldKeepChild && childPropsCount === 1 && typeof childChildren === 'string') {
          stringNode += "<".concat(child.type, ">").concat(childChildren, "</").concat(child.type, ">");
        } else {
          var content = nodesToString(childChildren, i18nOptions);
          stringNode += "<".concat(childIndex, ">").concat(content, "</").concat(childIndex, ">");
        }
      } else if (child === null) {
        warn("Trans: the passed in value is invalid - seems you passed in a null child.");
      } else if (_typeof(child) === 'object') {
        var format = child.format,
            clone = _objectWithoutProperties(child, _excluded);

        var keys = Object.keys(clone);

        if (keys.length === 1) {
          var value = format ? "".concat(keys[0], ", ").concat(format) : keys[0];
          stringNode += "{{".concat(value, "}}");
        } else {
          warn("react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.", child);
        }
      } else {
        warn("Trans: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.", child);
      }
    });
    return stringNode;
  }

  function renderNodes(children, targetString, i18n, i18nOptions, combinedTOpts) {
    if (targetString === '') return [];
    var keepArray = i18nOptions.transKeepBasicHtmlNodesFor || [];
    var emptyChildrenButNeedsHandling = targetString && new RegExp(keepArray.join('|')).test(targetString);
    if (!children && !emptyChildrenButNeedsHandling) return [targetString];
    var data = {};

    function getData(childs) {
      var childrenArray = getAsArray(childs);
      childrenArray.forEach(function (child) {
        if (typeof child === 'string') return;
        if (hasChildren(child)) getData(getChildren(child));else if (_typeof(child) === 'object' && !React__default.isValidElement(child)) Object.assign(data, child);
      });
    }

    getData(children);
    var ast = c.parse("<0>".concat(targetString, "</0>"));

    var opts = _objectSpread2(_objectSpread2({}, data), combinedTOpts);

    function renderInner(child, node, rootReactNode) {
      var childs = getChildren(child);
      var mappedChildren = mapAST(childs, node.children, rootReactNode);
      return hasValidReactChildren(childs) && mappedChildren.length === 0 ? childs : mappedChildren;
    }

    function pushTranslatedJSX(child, inner, mem, i, isVoid) {
      if (child.dummy) child.children = inner;
      mem.push(React__default.cloneElement(child, _objectSpread2(_objectSpread2({}, child.props), {}, {
        key: i
      }), isVoid ? undefined : inner));
    }

    function mapAST(reactNode, astNode, rootReactNode) {
      var reactNodes = getAsArray(reactNode);
      var astNodes = getAsArray(astNode);
      return astNodes.reduce(function (mem, node, i) {
        var translationContent = node.children && node.children[0] && node.children[0].content && i18n.services.interpolator.interpolate(node.children[0].content, opts, i18n.language);

        if (node.type === 'tag') {
          var tmp = reactNodes[parseInt(node.name, 10)];
          if (!tmp && rootReactNode.length === 1 && rootReactNode[0][node.name]) tmp = rootReactNode[0][node.name];
          if (!tmp) tmp = {};
          var child = Object.keys(node.attrs).length !== 0 ? mergeProps({
            props: node.attrs
          }, tmp) : tmp;
          var isElement = React__default.isValidElement(child);
          var isValidTranslationWithChildren = isElement && hasChildren(node, true) && !node.voidElement;
          var isEmptyTransWithHTML = emptyChildrenButNeedsHandling && _typeof(child) === 'object' && child.dummy && !isElement;
          var isKnownComponent = _typeof(children) === 'object' && children !== null && Object.hasOwnProperty.call(children, node.name);

          if (typeof child === 'string') {
            var value = i18n.services.interpolator.interpolate(child, opts, i18n.language);
            mem.push(value);
          } else if (hasChildren(child) || isValidTranslationWithChildren) {
              var inner = renderInner(child, node, rootReactNode);
              pushTranslatedJSX(child, inner, mem, i);
            } else if (isEmptyTransWithHTML) {
            var _inner = mapAST(reactNodes, node.children, rootReactNode);

            mem.push(React__default.cloneElement(child, _objectSpread2(_objectSpread2({}, child.props), {}, {
              key: i
            }), _inner));
          } else if (Number.isNaN(parseFloat(node.name))) {
            if (isKnownComponent) {
              var _inner2 = renderInner(child, node, rootReactNode);

              pushTranslatedJSX(child, _inner2, mem, i, node.voidElement);
            } else if (i18nOptions.transSupportBasicHtmlNodes && keepArray.indexOf(node.name) > -1) {
              if (node.voidElement) {
                mem.push(React__default.createElement(node.name, {
                  key: "".concat(node.name, "-").concat(i)
                }));
              } else {
                var _inner3 = mapAST(reactNodes, node.children, rootReactNode);

                mem.push(React__default.createElement(node.name, {
                  key: "".concat(node.name, "-").concat(i)
                }, _inner3));
              }
            } else if (node.voidElement) {
              mem.push("<".concat(node.name, " />"));
            } else {
              var _inner4 = mapAST(reactNodes, node.children, rootReactNode);

              mem.push("<".concat(node.name, ">").concat(_inner4, "</").concat(node.name, ">"));
            }
          } else if (_typeof(child) === 'object' && !isElement) {
            var content = node.children[0] ? translationContent : null;
            if (content) mem.push(content);
          } else if (node.children.length === 1 && translationContent) {
            mem.push(React__default.cloneElement(child, _objectSpread2(_objectSpread2({}, child.props), {}, {
              key: i
            }), translationContent));
          } else {
            mem.push(React__default.cloneElement(child, _objectSpread2(_objectSpread2({}, child.props), {}, {
              key: i
            })));
          }
        } else if (node.type === 'text') {
          var wrapTextNodes = i18nOptions.transWrapTextNodes;

          var _content = i18n.services.interpolator.interpolate(node.content, opts, i18n.language);

          if (wrapTextNodes) {
            mem.push(React__default.createElement(wrapTextNodes, {
              key: "".concat(node.name, "-").concat(i)
            }, _content));
          } else {
            mem.push(_content);
          }
        }

        return mem;
      }, []);
    }

    var result = mapAST([{
      dummy: true,
      children: children
    }], ast, getAsArray(children || []));
    return getChildren(result[0]);
  }

  function Trans(_ref) {
    var children = _ref.children,
        count = _ref.count,
        parent = _ref.parent,
        i18nKey = _ref.i18nKey,
        _ref$tOptions = _ref.tOptions,
        tOptions = _ref$tOptions === void 0 ? {} : _ref$tOptions,
        values = _ref.values,
        defaults = _ref.defaults,
        components = _ref.components,
        ns = _ref.ns,
        i18nFromProps = _ref.i18n,
        tFromProps = _ref.t,
        additionalProps = _objectWithoutProperties(_ref, _excluded2);

    var _ref2 = React.useContext(I18nContext) || {},
        i18nFromContext = _ref2.i18n,
        defaultNSFromContext = _ref2.defaultNS;

    var i18n = i18nFromProps || i18nFromContext || getI18n();

    if (!i18n) {
      warnOnce('You will need to pass in an i18next instance by using i18nextReactModule');
      return children;
    }

    var t = tFromProps || i18n.t.bind(i18n) || function (k) {
      return k;
    };

    var reactI18nextOptions = _objectSpread2(_objectSpread2({}, getDefaults()), i18n.options && i18n.options.react);

    var namespaces = ns || t.ns || defaultNSFromContext || i18n.options && i18n.options.defaultNS;
    namespaces = typeof namespaces === 'string' ? [namespaces] : namespaces || ['translation'];
    var defaultValue = defaults || nodesToString(children, reactI18nextOptions) || reactI18nextOptions.transEmptyNodeValue || i18nKey;
    var hashTransKey = reactI18nextOptions.hashTransKey;
    var key = i18nKey || (hashTransKey ? hashTransKey(defaultValue) : defaultValue);
    var interpolationOverride = values ? tOptions.interpolation : {
      interpolation: _objectSpread2(_objectSpread2({}, tOptions.interpolation), {}, {
        prefix: '#$?',
        suffix: '?$#'
      })
    };

    var combinedTOpts = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, tOptions), {}, {
      count: count
    }, values), interpolationOverride), {}, {
      defaultValue: defaultValue,
      ns: namespaces
    });

    var translation = key ? t(key, combinedTOpts) : defaultValue;
    var content = renderNodes(components || children, translation, i18n, reactI18nextOptions, combinedTOpts);
    var useAsParent = parent !== undefined ? parent : reactI18nextOptions.defaultTransParent;
    return useAsParent ? React__default.createElement(useAsParent, additionalProps, content) : content;
  }

  function useTranslation(ns) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var i18nFromProps = props.i18n;

    var _ref = React.useContext(I18nContext) || {},
        i18nFromContext = _ref.i18n,
        defaultNSFromContext = _ref.defaultNS;

    var i18n = i18nFromProps || i18nFromContext || getI18n();
    if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new ReportNamespaces();

    if (!i18n) {
      warnOnce('You will need to pass in an i18next instance by using initReactI18next');

      var notReadyT = function notReadyT(k) {
        return Array.isArray(k) ? k[k.length - 1] : k;
      };

      var retNotReady = [notReadyT, {}, false];
      retNotReady.t = notReadyT;
      retNotReady.i18n = {};
      retNotReady.ready = false;
      return retNotReady;
    }

    if (i18n.options.react && i18n.options.react.wait !== undefined) warnOnce('It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.');

    var i18nOptions = _objectSpread2(_objectSpread2(_objectSpread2({}, getDefaults()), i18n.options.react), props);

    var useSuspense = i18nOptions.useSuspense;
    var namespaces = ns || defaultNSFromContext || i18n.options && i18n.options.defaultNS;
    namespaces = typeof namespaces === 'string' ? [namespaces] : namespaces || ['translation'];
    if (i18n.reportNamespaces.addUsedNamespaces) i18n.reportNamespaces.addUsedNamespaces(namespaces);
    var ready = (i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every(function (n) {
      return hasLoadedNamespace(n, i18n, i18nOptions);
    });

    function getT() {
      return i18n.getFixedT(null, i18nOptions.nsMode === 'fallback' ? namespaces : namespaces[0]);
    }

    var _useState = React.useState(getT),
        _useState2 = _slicedToArray(_useState, 2),
        t = _useState2[0],
        setT = _useState2[1];

    var isMounted = React.useRef(true);
    React.useEffect(function () {
      var bindI18n = i18nOptions.bindI18n,
          bindI18nStore = i18nOptions.bindI18nStore;
      isMounted.current = true;

      if (!ready && !useSuspense) {
        loadNamespaces(i18n, namespaces, function () {
          if (isMounted.current) setT(getT);
        });
      }

      function boundReset() {
        if (isMounted.current) setT(getT);
      }

      if (bindI18n && i18n) i18n.on(bindI18n, boundReset);
      if (bindI18nStore && i18n) i18n.store.on(bindI18nStore, boundReset);
      return function () {
        isMounted.current = false;
        if (bindI18n && i18n) bindI18n.split(' ').forEach(function (e) {
          return i18n.off(e, boundReset);
        });
        if (bindI18nStore && i18n) bindI18nStore.split(' ').forEach(function (e) {
          return i18n.store.off(e, boundReset);
        });
      };
    }, [i18n, namespaces.join()]);
    var isInitial = React.useRef(true);
    React.useEffect(function () {
      if (isMounted.current && !isInitial.current) {
        setT(getT);
      }

      isInitial.current = false;
    }, [i18n]);
    var ret = [t, i18n, ready];
    ret.t = t;
    ret.i18n = i18n;
    ret.ready = ready;
    if (ready) return ret;
    if (!ready && !useSuspense) return ret;
    throw new Promise(function (resolve) {
      loadNamespaces(i18n, namespaces, function () {
        resolve();
      });
    });
  }

  var _excluded$1 = ["forwardedRef"];
  function withTranslation(ns) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return function Extend(WrappedComponent) {
      function I18nextWithTranslation(_ref) {
        var forwardedRef = _ref.forwardedRef,
            rest = _objectWithoutProperties(_ref, _excluded$1);

        var _useTranslation = useTranslation(ns, rest),
            _useTranslation2 = _slicedToArray(_useTranslation, 3),
            t = _useTranslation2[0],
            i18n = _useTranslation2[1],
            ready = _useTranslation2[2];

        var passDownProps = _objectSpread2(_objectSpread2({}, rest), {}, {
          t: t,
          i18n: i18n,
          tReady: ready
        });

        if (options.withRef && forwardedRef) {
          passDownProps.ref = forwardedRef;
        } else if (!options.withRef && forwardedRef) {
          passDownProps.forwardedRef = forwardedRef;
        }

        return React__default.createElement(WrappedComponent, passDownProps);
      }

      I18nextWithTranslation.displayName = "withI18nextTranslation(".concat(getDisplayName(WrappedComponent), ")");
      I18nextWithTranslation.WrappedComponent = WrappedComponent;

      var forwardRef = function forwardRef(props, ref) {
        return React__default.createElement(I18nextWithTranslation, Object.assign({}, props, {
          forwardedRef: ref
        }));
      };

      return options.withRef ? React__default.forwardRef(forwardRef) : I18nextWithTranslation;
    };
  }

  var _excluded$2 = ["ns", "children"];
  function Translation(props) {
    var ns = props.ns,
        children = props.children,
        options = _objectWithoutProperties(props, _excluded$2);

    var _useTranslation = useTranslation(ns, options),
        _useTranslation2 = _slicedToArray(_useTranslation, 3),
        t = _useTranslation2[0],
        i18n = _useTranslation2[1],
        ready = _useTranslation2[2];

    return children(t, {
      i18n: i18n,
      lng: i18n.language
    }, ready);
  }

  function I18nextProvider(_ref) {
    var i18n = _ref.i18n,
        defaultNS = _ref.defaultNS,
        children = _ref.children;
    var value = React.useMemo(function () {
      return {
        i18n: i18n,
        defaultNS: defaultNS
      };
    }, [i18n, defaultNS]);
    return React.createElement(I18nContext.Provider, {
      value: value
    }, children);
  }

  function useSSR(initialI18nStore, initialLanguage) {
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var i18nFromProps = props.i18n;

    var _ref = React.useContext(I18nContext) || {},
        i18nFromContext = _ref.i18n;

    var i18n = i18nFromProps || i18nFromContext || getI18n();
    if (i18n.options && i18n.options.isClone) return;

    if (initialI18nStore && !i18n.initializedStoreOnce) {
      i18n.services.resourceStore.data = initialI18nStore;
      i18n.options.ns = Object.values(initialI18nStore).reduce(function (mem, lngResources) {
        Object.keys(lngResources).forEach(function (ns) {
          if (mem.indexOf(ns) < 0) mem.push(ns);
        });
        return mem;
      }, i18n.options.ns);
      i18n.initializedStoreOnce = true;
      i18n.isInitialized = true;
    }

    if (initialLanguage && !i18n.initializedLanguageOnce) {
      i18n.changeLanguage(initialLanguage);
      i18n.initializedLanguageOnce = true;
    }
  }

  var _excluded$3 = ["initialI18nStore", "initialLanguage"];
  function withSSR() {
    return function Extend(WrappedComponent) {
      function I18nextWithSSR(_ref) {
        var initialI18nStore = _ref.initialI18nStore,
            initialLanguage = _ref.initialLanguage,
            rest = _objectWithoutProperties(_ref, _excluded$3);

        useSSR(initialI18nStore, initialLanguage);
        return React__default.createElement(WrappedComponent, _objectSpread2({}, rest));
      }

      I18nextWithSSR.getInitialProps = composeInitialProps(WrappedComponent);
      I18nextWithSSR.displayName = "withI18nextSSR(".concat(getDisplayName(WrappedComponent), ")");
      I18nextWithSSR.WrappedComponent = WrappedComponent;
      return I18nextWithSSR;
    };
  }

  var date = function date() {
    return '';
  };
  var time = function time() {
    return '';
  };
  var number = function number() {
    return '';
  };
  var select = function select() {
    return '';
  };
  var plural = function plural() {
    return '';
  };
  var selectOrdinal = function selectOrdinal() {
    return '';
  };

  exports.I18nContext = I18nContext;
  exports.I18nextProvider = I18nextProvider;
  exports.Trans = Trans;
  exports.Translation = Translation;
  exports.composeInitialProps = composeInitialProps;
  exports.date = date;
  exports.getDefaults = getDefaults;
  exports.getI18n = getI18n;
  exports.getInitialProps = getInitialProps;
  exports.initReactI18next = initReactI18next;
  exports.number = number;
  exports.plural = plural;
  exports.select = select;
  exports.selectOrdinal = selectOrdinal;
  exports.setDefaults = setDefaults;
  exports.setI18n = setI18n;
  exports.time = time;
  exports.useSSR = useSSR;
  exports.useTranslation = useTranslation;
  exports.withSSR = withSSR;
  exports.withTranslation = withTranslation;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
