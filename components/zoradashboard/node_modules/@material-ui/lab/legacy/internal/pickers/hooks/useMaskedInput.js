import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useRifm } from 'rifm';
import { useUtils } from './useUtils';
import { createDelegatedEventHandler } from '../utils';
import { maskedDateFormatter, getDisplayDate, checkMaskIsValidForCurrentFormat } from '../text-field-helper';
export function useMaskedInput(_ref) {
  var _ref$acceptRegex = _ref.acceptRegex,
      acceptRegex = _ref$acceptRegex === void 0 ? /[\d]/gi : _ref$acceptRegex,
      disabled = _ref.disabled,
      disableMaskedInput = _ref.disableMaskedInput,
      ignoreInvalidInputs = _ref.ignoreInvalidInputs,
      inputFormat = _ref.inputFormat,
      inputProps = _ref.inputProps,
      label = _ref.label,
      mask = _ref.mask,
      onChange = _ref.onChange,
      rawValue = _ref.rawValue,
      readOnly = _ref.readOnly,
      rifmFormatter = _ref.rifmFormatter,
      TextFieldProps = _ref.TextFieldProps,
      validationError = _ref.validationError;
  var utils = useUtils();

  var _React$useState = React.useState(false),
      isFocused = _React$useState[0],
      setIsFocused = _React$useState[1];

  var formatHelperText = utils.getFormatHelperText(inputFormat);
  var shouldUseMaskedInput = React.useMemo(function () {
    // formatting of dates is a quite slow thing, so do not make useless .format calls
    if (!mask || disableMaskedInput) {
      return false;
    }

    return checkMaskIsValidForCurrentFormat(mask, inputFormat, acceptRegex, utils);
  }, [acceptRegex, disableMaskedInput, inputFormat, mask, utils]);
  var formatter = React.useMemo(function () {
    return shouldUseMaskedInput && mask ? maskedDateFormatter(mask, acceptRegex) : function (st) {
      return st;
    };
  }, [acceptRegex, mask, shouldUseMaskedInput]); // TODO: Implement with controlled vs unctrolled `rawValue`

  var currentInputValue = getDisplayDate(utils, rawValue, inputFormat);

  var _React$useState2 = React.useState(currentInputValue),
      innerInputValue = _React$useState2[0],
      setInnerInputValue = _React$useState2[1];

  var previousInputValueRef = React.useRef(currentInputValue);
  React.useEffect(function () {
    previousInputValueRef.current = currentInputValue;
  }, [currentInputValue]);
  var notTyping = !isFocused;
  var valueChanged = previousInputValueRef.current !== currentInputValue; // Update the input value only if the value changed outside of typing

  if (notTyping && valueChanged && (rawValue === null || utils.isValid(rawValue))) {
    if (currentInputValue !== innerInputValue) {
      setInnerInputValue(currentInputValue);
    }
  }

  var handleChange = function handleChange(text) {
    var finalString = text === '' || text === mask ? '' : text;
    setInnerInputValue(finalString);
    var date = finalString === null ? null : utils.parse(finalString, inputFormat);

    if (ignoreInvalidInputs && !utils.isValid(date)) {
      return;
    }

    onChange(date, finalString || undefined);
  };

  var rifmProps = useRifm({
    value: innerInputValue,
    onChange: handleChange,
    format: rifmFormatter || formatter
  });
  var inputStateArgs = shouldUseMaskedInput ? rifmProps : {
    value: innerInputValue,
    onChange: function onChange(event) {
      handleChange(event.currentTarget.value);
    }
  };
  return _extends({
    label: label,
    disabled: disabled,
    error: validationError,
    inputProps: _extends({}, inputStateArgs, {
      disabled: disabled,
      placeholder: formatHelperText,
      readOnly: readOnly,
      type: shouldUseMaskedInput ? 'tel' : 'text'
    }, inputProps, {
      onFocus: createDelegatedEventHandler(function () {
        setIsFocused(true);
      }, inputProps == null ? void 0 : inputProps.onFocus),
      onBlur: createDelegatedEventHandler(function () {
        setIsFocused(false);
      }, inputProps == null ? void 0 : inputProps.onBlur)
    })
  }, TextFieldProps);
}
export default useMaskedInput;