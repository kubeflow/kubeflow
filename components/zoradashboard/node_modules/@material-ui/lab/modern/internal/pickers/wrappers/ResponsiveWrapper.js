import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["cancelText", "clearable", "clearText", "DateInputProps", "desktopModeMediaQuery", "DialogProps", "KeyboardDateInputComponent", "okText", "PopperProps", "PureDateInputComponent", "showTodayButton", "todayText", "TransitionComponent"];
import * as React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MobileWrapper from './MobileWrapper';
import DesktopTooltipWrapper from './DesktopTooltipWrapper';
import { jsx as _jsx } from "react/jsx-runtime";
export function ResponsiveTooltipWrapper(props) {
  const {
    cancelText,
    clearable,
    clearText,
    DateInputProps,
    desktopModeMediaQuery = '@media (pointer: fine)',
    DialogProps,
    KeyboardDateInputComponent,
    okText,
    PopperProps,
    PureDateInputComponent,
    showTodayButton,
    todayText,
    TransitionComponent
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const isDesktop = useMediaQuery(desktopModeMediaQuery);
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