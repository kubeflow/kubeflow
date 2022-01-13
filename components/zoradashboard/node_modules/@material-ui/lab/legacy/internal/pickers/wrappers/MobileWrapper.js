import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import { WrapperVariantContext } from './WrapperVariantContext';
import PickersModalDialog from '../PickersModalDialog';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function MobileWrapper(props) {
  var cancelText = props.cancelText,
      children = props.children,
      clearable = props.clearable,
      clearText = props.clearText,
      DateInputProps = props.DateInputProps,
      DialogProps = props.DialogProps,
      okText = props.okText,
      onAccept = props.onAccept,
      onClear = props.onClear,
      onDismiss = props.onDismiss,
      onSetToday = props.onSetToday,
      open = props.open,
      PureDateInputComponent = props.PureDateInputComponent,
      showTodayButton = props.showTodayButton,
      todayText = props.todayText,
      other = _objectWithoutProperties(props, ["cancelText", "children", "clearable", "clearText", "DateInputProps", "DialogProps", "okText", "onAccept", "onClear", "onDismiss", "onSetToday", "open", "PureDateInputComponent", "showTodayButton", "todayText"]);

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