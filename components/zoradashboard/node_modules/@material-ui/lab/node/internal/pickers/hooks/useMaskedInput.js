"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMaskedInput = useMaskedInput;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _rifm = require("rifm");

var _useUtils = require("./useUtils");

var _utils = require("../utils");

var _textFieldHelper = require("../text-field-helper");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useMaskedInput({
  acceptRegex = /[\d]/gi,
  disabled,
  disableMaskedInput,
  ignoreInvalidInputs,
  inputFormat,
  inputProps,
  label,
  mask,
  onChange,
  rawValue,
  readOnly,
  rifmFormatter,
  TextFieldProps,
  validationError
}) {
  const utils = (0, _useUtils.useUtils)();
  const [isFocused, setIsFocused] = React.useState(false);
  const formatHelperText = utils.getFormatHelperText(inputFormat);
  const shouldUseMaskedInput = React.useMemo(() => {
    // formatting of dates is a quite slow thing, so do not make useless .format calls
    if (!mask || disableMaskedInput) {
      return false;
    }

    return (0, _textFieldHelper.checkMaskIsValidForCurrentFormat)(mask, inputFormat, acceptRegex, utils);
  }, [acceptRegex, disableMaskedInput, inputFormat, mask, utils]);
  const formatter = React.useMemo(() => shouldUseMaskedInput && mask ? (0, _textFieldHelper.maskedDateFormatter)(mask, acceptRegex) : st => st, [acceptRegex, mask, shouldUseMaskedInput]); // TODO: Implement with controlled vs unctrolled `rawValue`

  const currentInputValue = (0, _textFieldHelper.getDisplayDate)(utils, rawValue, inputFormat);
  const [innerInputValue, setInnerInputValue] = React.useState(currentInputValue);
  const previousInputValueRef = React.useRef(currentInputValue);
  React.useEffect(() => {
    previousInputValueRef.current = currentInputValue;
  }, [currentInputValue]);
  const notTyping = !isFocused;
  const valueChanged = previousInputValueRef.current !== currentInputValue; // Update the input value only if the value changed outside of typing

  if (notTyping && valueChanged && (rawValue === null || utils.isValid(rawValue))) {
    if (currentInputValue !== innerInputValue) {
      setInnerInputValue(currentInputValue);
    }
  }

  const handleChange = text => {
    const finalString = text === '' || text === mask ? '' : text;
    setInnerInputValue(finalString);
    const date = finalString === null ? null : utils.parse(finalString, inputFormat);

    if (ignoreInvalidInputs && !utils.isValid(date)) {
      return;
    }

    onChange(date, finalString || undefined);
  };

  const rifmProps = (0, _rifm.useRifm)({
    value: innerInputValue,
    onChange: handleChange,
    format: rifmFormatter || formatter
  });
  const inputStateArgs = shouldUseMaskedInput ? rifmProps : {
    value: innerInputValue,
    onChange: event => {
      handleChange(event.currentTarget.value);
    }
  };
  return (0, _extends2.default)({
    label,
    disabled,
    error: validationError,
    inputProps: (0, _extends2.default)({}, inputStateArgs, {
      disabled,
      placeholder: formatHelperText,
      readOnly,
      type: shouldUseMaskedInput ? 'tel' : 'text'
    }, inputProps, {
      onFocus: (0, _utils.createDelegatedEventHandler)(() => {
        setIsFocused(true);
      }, inputProps == null ? void 0 : inputProps.onFocus),
      onBlur: (0, _utils.createDelegatedEventHandler)(() => {
        setIsFocused(false);
      }, inputProps == null ? void 0 : inputProps.onBlur)
    })
  }, TextFieldProps);
}

var _default = useMaskedInput;
exports.default = _default;