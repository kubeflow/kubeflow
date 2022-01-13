import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["components", "disableOpenPicker", "getOpenDialogAriaText", "InputAdornmentProps", "InputProps", "inputRef", "openPicker", "OpenPickerButtonProps", "renderInput"];
import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useUtils } from './hooks/useUtils';
import CalendarIcon from '../svg-icons/Calendar';
import { useMaskedInput } from './hooks/useMaskedInput';
import { getTextFieldAriaText } from './text-field-helper';
import { jsx as _jsx } from "react/jsx-runtime";
export const KeyboardDateInput = /*#__PURE__*/React.forwardRef(function KeyboardDateInput(props, ref) {
  const {
    components = {},
    disableOpenPicker,
    getOpenDialogAriaText = getTextFieldAriaText,
    InputAdornmentProps,
    InputProps,
    inputRef,
    openPicker,
    OpenPickerButtonProps,
    renderInput
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const utils = useUtils();
  const textFieldProps = useMaskedInput(other);
  const adornmentPosition = (InputAdornmentProps == null ? void 0 : InputAdornmentProps.position) || 'end';
  const OpenPickerIcon = components.OpenPickerIcon || CalendarIcon;
  return renderInput(_extends({
    ref,
    inputRef
  }, textFieldProps, {
    InputProps: _extends({}, InputProps, {
      [`${adornmentPosition}Adornment`]: disableOpenPicker ? undefined : /*#__PURE__*/_jsx(InputAdornment, _extends({
        position: adornmentPosition
      }, InputAdornmentProps, {
        children: /*#__PURE__*/_jsx(IconButton, _extends({
          edge: adornmentPosition,
          disabled: other.disabled || other.readOnly,
          "aria-label": getOpenDialogAriaText(other.rawValue, utils)
        }, OpenPickerButtonProps, {
          onClick: openPicker,
          children: /*#__PURE__*/_jsx(OpenPickerIcon, {})
        }))
      }))
    })
  }));
});
process.env.NODE_ENV !== "production" ? KeyboardDateInput.propTypes = {
  acceptRegex: PropTypes.instanceOf(RegExp),
  getOpenDialogAriaText: PropTypes.func,
  mask: PropTypes.string,
  OpenPickerButtonProps: PropTypes.object,
  renderInput: PropTypes.func.isRequired,
  rifmFormatter: PropTypes.func
} : void 0;
export default KeyboardDateInput;