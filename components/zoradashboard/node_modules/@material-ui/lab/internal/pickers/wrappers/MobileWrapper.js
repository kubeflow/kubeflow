import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["cancelText", "children", "clearable", "clearText", "DateInputProps", "DialogProps", "okText", "onAccept", "onClear", "onDismiss", "onSetToday", "open", "PureDateInputComponent", "showTodayButton", "todayText"];
import * as React from 'react';
import { WrapperVariantContext } from './WrapperVariantContext';
import PickersModalDialog from '../PickersModalDialog';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

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
        other = _objectWithoutPropertiesLoose(props, _excluded);

  return /*#__PURE__*/_jsxs(WrapperVariantContext.Provider, {
    value: "mobile",
    children: [/*#__PURE__*/_jsx(PureDateInputComponent, _extends({}, other, DateInputProps)), /*#__PURE__*/_jsx(PickersModalDialog, {
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

export default MobileWrapper;