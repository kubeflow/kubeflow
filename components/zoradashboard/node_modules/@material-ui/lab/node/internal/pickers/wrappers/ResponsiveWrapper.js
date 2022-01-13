"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponsiveTooltipWrapper = ResponsiveTooltipWrapper;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _useMediaQuery = _interopRequireDefault(require("@material-ui/core/useMediaQuery"));

var _MobileWrapper = _interopRequireDefault(require("./MobileWrapper"));

var _DesktopTooltipWrapper = _interopRequireDefault(require("./DesktopTooltipWrapper"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["cancelText", "clearable", "clearText", "DateInputProps", "desktopModeMediaQuery", "DialogProps", "KeyboardDateInputComponent", "okText", "PopperProps", "PureDateInputComponent", "showTodayButton", "todayText", "TransitionComponent"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ResponsiveTooltipWrapper(props) {
  const {
    cancelText,
    clearable,
    clearText,
    DateInputProps,
    desktopModeMediaQuery = '@media (pointer: fine)',
    DialogProps,
    KeyboardDateInputComponent,
    okText,
    PopperProps,
    PureDateInputComponent,
    showTodayButton,
    todayText,
    TransitionComponent
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const isDesktop = (0, _useMediaQuery.default)(desktopModeMediaQuery);
  return isDesktop ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_DesktopTooltipWrapper.default, (0, _extends2.default)({
    DateInputProps: DateInputProps,
    KeyboardDateInputComponent: KeyboardDateInputComponent,
    PopperProps: PopperProps,
    TransitionComponent: TransitionComponent
  }, other)) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_MobileWrapper.default, (0, _extends2.default)({
    cancelText: cancelText,
    clearable: clearable,
    clearText: clearText,
    DateInputProps: DateInputProps,
    DialogProps: DialogProps,
    okText: okText,
    PureDateInputComponent: PureDateInputComponent,
    showTodayButton: showTodayButton,
    todayText: todayText
  }, other));
}