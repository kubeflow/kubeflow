import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { onSpaceOrEnter } from './utils';
import { useUtils } from './hooks/useUtils';
import { getDisplayDate, getTextFieldAriaText } from './text-field-helper'; // make `variant` optional.

// TODO: why is this called "Pure*" when it's not memoized? Does "Pure" mean "readonly"?
export const PureDateInput = /*#__PURE__*/React.forwardRef(function PureDateInput(props, ref) {
  const {
    disabled,
    getOpenDialogAriaText = getTextFieldAriaText,
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
  const utils = useUtils();
  const PureDateInputProps = React.useMemo(() => _extends({}, InputProps, {
    readOnly: true
  }), [InputProps]);
  const inputValue = getDisplayDate(utils, rawValue, inputFormat);
  return renderInput(_extends({
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
      onKeyDown: onSpaceOrEnter(onOpen)
    }
  }, TextFieldProps));
});
PureDateInput.propTypes = {
  getOpenDialogAriaText: PropTypes.func,
  renderInput: PropTypes.func.isRequired
};