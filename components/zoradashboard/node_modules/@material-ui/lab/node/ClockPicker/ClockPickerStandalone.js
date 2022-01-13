"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _ClockPicker = _interopRequireDefault(require("./ClockPicker"));

var _PickerView = _interopRequireDefault(require("../internal/pickers/Picker/PickerView"));

var _useViews = require("../internal/pickers/hooks/useViews");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["view", "openTo", "className", "onViewChange", "views"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Wrapping public API for better standalone usage of './ClockPicker'
 * @ignore - internal component.
 */
var _default = /*#__PURE__*/React.forwardRef(function ClockPickerStandalone(props, ref) {
  const {
    view,
    openTo,
    className,
    onViewChange,
    views = ['hours', 'minutes']
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    openView,
    setOpenView,
    nextView,
    previousView
  } = (0, _useViews.useViews)({
    view,
    views,
    openTo,
    onViewChange,
    onChange: other.onChange
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickerView.default, {
    className: className,
    ref: ref,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ClockPicker.default, (0, _extends2.default)({
      view: openView,
      nextViewAvailable: Boolean(nextView),
      previousViewAvailable: Boolean(previousView),
      openNextView: () => setOpenView(nextView),
      openPreviousView: () => setOpenView(previousView)
    }, other))
  });
});

exports.default = _default;