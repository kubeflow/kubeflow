"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.KeyboardDateInput = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _InputAdornment = _interopRequireDefault(require("@material-ui/core/InputAdornment"));

var _useUtils = require("./hooks/useUtils");

var _Calendar = _interopRequireDefault(require("../svg-icons/Calendar"));

var _useMaskedInput = require("./hooks/useMaskedInput");

var _textFieldHelper = require("./text-field-helper");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["components", "disableOpenPicker", "getOpenDialogAriaText", "InputAdornmentProps", "InputProps", "inputRef", "openPicker", "OpenPickerButtonProps", "renderInput"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const KeyboardDateInput = /*#__PURE__*/React.forwardRef(function KeyboardDateInput(props, ref) {
  const {
    components = {},
    disableOpenPicker,
    getOpenDialogAriaText = _textFieldHelper.getTextFieldAriaText,
    InputAdornmentProps,
    InputProps,
    inputRef,
    openPicker,
    OpenPickerButtonProps,
    renderInput
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const utils = (0, _useUtils.useUtils)();
  const textFieldProps = (0, _useMaskedInput.useMaskedInput)(other);
  const adornmentPosition = (InputAdornmentProps == null ? void 0 : InputAdornmentProps.position) || 'end';
  const OpenPickerIcon = components.OpenPickerIcon || _Calendar.default;
  return renderInput((0, _extends2.default)({
    ref,
    inputRef
  }, textFieldProps, {
    InputProps: (0, _extends2.default)({}, InputProps, {
      [`${adornmentPosition}Adornment`]: disableOpenPicker ? undefined : /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputAdornment.default, (0, _extends2.default)({
        position: adornmentPosition
      }, InputAdornmentProps, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton.default, (0, _extends2.default)({
          edge: adornmentPosition,
          disabled: other.disabled || other.readOnly,
          "aria-label": getOpenDialogAriaText(other.rawValue, utils)
        }, OpenPickerButtonProps, {
          onClick: openPicker,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(OpenPickerIcon, {})
        }))
      }))
    })
  }));
});
exports.KeyboardDateInput = KeyboardDateInput;
process.env.NODE_ENV !== "production" ? KeyboardDateInput.propTypes = {
  acceptRegex: _propTypes.default.instanceOf(RegExp),
  getOpenDialogAriaText: _propTypes.default.func,
  mask: _propTypes.default.string,
  OpenPickerButtonProps: _propTypes.default.object,
  renderInput: _propTypes.default.func.isRequired,
  rifmFormatter: _propTypes.default.func
} : void 0;
var _default = KeyboardDateInput;
exports.default = _default;