import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { onSpaceOrEnter } from './utils';
import { useUtils } from './hooks/useUtils';
import { getDisplayDate, getTextFieldAriaText } from './text-field-helper'; // make `variant` optional.

// TODO: why is this called "Pure*" when it's not memoized? Does "Pure" mean "readonly"?
export var PureDateInput = /*#__PURE__*/React.forwardRef(function PureDateInput(props, ref) {
  var disabled = props.disabled,
      _props$getOpenDialogA = props.getOpenDialogAriaText,
      getOpenDialogAriaText = _props$getOpenDialogA === void 0 ? getTextFieldAriaText : _props$getOpenDialogA,
      inputFormat = props.inputFormat,
      InputProps = props.InputProps,
      inputRef = props.inputRef,
      label = props.label,
      onOpen = props.openPicker,
      rawValue = props.rawValue,
      renderInput = props.renderInput,
      _props$TextFieldProps = props.TextFieldProps,
      TextFieldProps = _props$TextFieldProps === void 0 ? {} : _props$TextFieldProps,
      validationError = props.validationError;
  var utils = useUtils();
  var PureDateInputProps = React.useMemo(function () {
    return _extends({}, InputProps, {
      readOnly: true
    });
  }, [InputProps]);
  var inputValue = getDisplayDate(utils, rawValue, inputFormat);
  return renderInput(_extends({
    label: label,
    disabled: disabled,
    ref: ref,
    inputRef: inputRef,
    error: validationError,
    InputProps: PureDateInputProps,
    inputProps: {
      disabled: disabled,
      readOnly: true,
      'aria-readonly': true,
      'aria-label': getOpenDialogAriaText(rawValue, utils),
      value: inputValue,
      onClick: onOpen,
      onKeyDown: onSpaceOrEnter(onOpen)
    }
  }, TextFieldProps));
});
PureDateInput.propTypes = {
  getOpenDialogAriaText: PropTypes.func,
  renderInput: PropTypes.func.isRequired
};