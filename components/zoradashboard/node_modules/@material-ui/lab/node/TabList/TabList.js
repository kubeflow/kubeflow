"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Tabs = _interopRequireDefault(require("@material-ui/core/Tabs"));

var _TabContext = require("../TabContext");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const TabList = /*#__PURE__*/React.forwardRef(function TabList(props, ref) {
  const {
    children: childrenProp
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const context = (0, _TabContext.useTabContext)();

  if (context === null) {
    throw new TypeError('No TabContext provided');
  }

  const children = React.Children.map(childrenProp, child => {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return null;
    }

    return /*#__PURE__*/React.cloneElement(child, {
      // SOMEDAY: `Tabs` will set those themselves
      'aria-controls': (0, _TabContext.getPanelId)(context, child.props.value),
      id: (0, _TabContext.getTabId)(context, child.props.value)
    });
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Tabs.default, (0, _extends2.default)({}, other, {
    ref: ref,
    value: context.value,
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? TabList.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A list of `<Tab />` elements.
   */
  children: _propTypes.default.node
} : void 0;
var _default = TabList;
exports.default = _default;