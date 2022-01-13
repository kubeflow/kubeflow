import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useUtils } from './hooks/useUtils';
import CalendarIcon from '../svg-icons/Calendar';
import { useMaskedInput } from './hooks/useMaskedInput';
import { getTextFieldAriaText } from './text-field-helper';
import { jsx as _jsx } from "react/jsx-runtime";
export var KeyboardDateInput = /*#__PURE__*/React.forwardRef(function KeyboardDateInput(props, ref) {
  var _props$components = props.components,
      components = _props$components === void 0 ? {} : _props$components,
      disableOpenPicker = props.disableOpenPicker,
      _props$getOpenDialogA = props.getOpenDialogAriaText,
      getOpenDialogAriaText = _props$getOpenDialogA === void 0 ? getTextFieldAriaText : _props$getOpenDialogA,
      InputAdornmentProps = props.InputAdornmentProps,
      InputProps = props.InputProps,
      inputRef = props.inputRef,
      openPicker = props.openPicker,
      OpenPickerButtonProps = props.OpenPickerButtonProps,
      renderInput = props.renderInput,
      other = _objectWithoutProperties(props, ["components", "disableOpenPicker", "getOpenDialogAriaText", "InputAdornmentProps", "InputProps", "inputRef", "openPicker", "OpenPickerButtonProps", "renderInput"]);

  var utils = useUtils();
  var textFieldProps = useMaskedInput(other);
  var adornmentPosition = (InputAdornmentProps == null ? void 0 : InputAdornmentProps.position) || 'end';
  var OpenPickerIcon = components.OpenPickerIcon || CalendarIcon;
  return renderInput(_extends({
    ref: ref,
    inputRef: inputRef
  }, textFieldProps, {
    InputProps: _extends({}, InputProps, _defineProperty({}, "".concat(adornmentPosition, "Adornment"), disableOpenPicker ? undefined : /*#__PURE__*/_jsx(InputAdornment, _extends({
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
    }))))
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