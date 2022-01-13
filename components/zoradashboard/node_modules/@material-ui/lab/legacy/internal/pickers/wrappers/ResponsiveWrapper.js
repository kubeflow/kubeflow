import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobileWrapper from './MobileWrapper';
import DesktopTooltipWrapper from './DesktopTooltipWrapper';
import { jsx as _jsx } from "react/jsx-runtime";
export function ResponsiveTooltipWrapper(props) {
  var cancelText = props.cancelText,
      clearable = props.clearable,
      clearText = props.clearText,
      DateInputProps = props.DateInputProps,
      _props$desktopModeMed = props.desktopModeMediaQuery,
      desktopModeMediaQuery = _props$desktopModeMed === void 0 ? '@media (pointer: fine)' : _props$desktopModeMed,
      DialogProps = props.DialogProps,
      KeyboardDateInputComponent = props.KeyboardDateInputComponent,
      okText = props.okText,
      PopperProps = props.PopperProps,
      PureDateInputComponent = props.PureDateInputComponent,
      showTodayButton = props.showTodayButton,
      todayText = props.todayText,
      TransitionComponent = props.TransitionComponent,
      other = _objectWithoutProperties(props, ["cancelText", "clearable", "clearText", "DateInputProps", "desktopModeMediaQuery", "DialogProps", "KeyboardDateInputComponent", "okText", "PopperProps", "PureDateInputComponent", "showTodayButton", "todayText", "TransitionComponent"]);

  var isDesktop = useMediaQuery(desktopModeMediaQuery);
  return isDesktop ? /*#__PURE__*/_jsx(DesktopTooltipWrapper, _extends({
    DateInputProps: DateInputProps,
    KeyboardDateInputComponent: KeyboardDateInputComponent,
    PopperProps: PopperProps,
    TransitionComponent: TransitionComponent
  }, other)) : /*#__PURE__*/_jsx(MobileWrapper, _extends({
    cancelText: cancelText,
    clearable: clearable,
    clearText: clearText,
    DateInputProps: DateInputProps,
    DialogProps: DialogProps,
    okText: okText,
    PureDateInputComponent: PureDateInputComponent,
    showTodayButton: showTodayButton,
    todayText: todayText
  }, other));
}