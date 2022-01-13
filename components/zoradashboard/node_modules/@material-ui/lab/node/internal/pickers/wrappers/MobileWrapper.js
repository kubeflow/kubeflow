"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _WrapperVariantContext = require("./WrapperVariantContext");

var _PickersModalDialog = _interopRequireDefault(require("../PickersModalDialog"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["cancelText", "children", "clearable", "clearText", "DateInputProps", "DialogProps", "okText", "onAccept", "onClear", "onDismiss", "onSetToday", "open", "PureDateInputComponent", "showTodayButton", "todayText"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function MobileWrapper(props) {
  const {
    cancelText,
    children,
    clearable,
    clearText,
    DateInputProps,
    DialogProps,
    okText,
    onAccept,
    onClear,
    onDismiss,
    onSetToday,
    open,
    PureDateInputComponent,
    showTodayButton,
    todayText
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_WrapperVariantContext.WrapperVariantContext.Provider, {
    value: "mobile",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(PureDateInputComponent, (0, _extends2.default)({}, other, DateInputProps)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersModalDialog.default, {
      cancelText: cancelText,
      clearable: clearable,
      clearText: clearText,
      DialogProps: DialogProps,
      okText: okText,
      onAccept: onAccept,
      onClear: onClear,
      onDismiss: onDismiss,
      onSetToday: onSetToday,
      open: open,
      showTodayButton: showTodayButton,
      todayText: todayText,
      children: children
    })]
  });
}

var _default = MobileWrapper;
exports.default = _default;