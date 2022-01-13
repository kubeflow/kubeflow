"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PureDateInput = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("./utils");

var _useUtils = require("./hooks/useUtils");

var _textFieldHelper = require("./text-field-helper");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// TODO: why is this called "Pure*" when it's not memoized? Does "Pure" mean "readonly"?
const PureDateInput = /*#__PURE__*/React.forwardRef(function PureDateInput(props, ref) {
  const {
    disabled,
    getOpenDialogAriaText = _textFieldHelper.getTextFieldAriaText,
    inputFormat,
    InputProps,
    inputRef,
    label,
    openPicker: onOpen,
    rawValue,
    renderInput,
    TextFieldProps = {},
    validationError
  } = props;
  const utils = (0, _useUtils.useUtils)();
  const PureDateInputProps = React.useMemo(() => (0, _extends2.default)({}, InputProps, {
    readOnly: true
  }), [InputProps]);
  const inputValue = (0, _textFieldHelper.getDisplayDate)(utils, rawValue, inputFormat);
  return renderInput((0, _extends2.default)({
    label,
    disabled,
    ref,
    inputRef,
    error: validationError,
    InputProps: PureDateInputProps,
    inputProps: {
      disabled,
      readOnly: true,
      'aria-readonly': true,
      'aria-label': getOpenDialogAriaText(rawValue, utils),
      value: inputValue,
      onClick: onOpen,
      onKeyDown: (0, _utils.onSpaceOrEnter)(onOpen)
    }
  }, TextFieldProps));
});
exports.PureDateInput = PureDateInput;
PureDateInput.propTypes = {
  getOpenDialogAriaText: _propTypes.default.func,
  renderInput: _propTypes.default.func.isRequired
};