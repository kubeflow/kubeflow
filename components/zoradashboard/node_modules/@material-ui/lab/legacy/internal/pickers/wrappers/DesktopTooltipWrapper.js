import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useForkRef } from '@material-ui/core/utils';
import { WrapperVariantContext } from './WrapperVariantContext';
import { executeInTheNextEventLoopTick } from '../utils';
import PickersPopper from '../PickersPopper';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function DesktopTooltipWrapper(props) {
  var children = props.children,
      DateInputProps = props.DateInputProps,
      KeyboardDateInputComponent = props.KeyboardDateInputComponent,
      onDismiss = props.onDismiss,
      open = props.open,
      PopperProps = props.PopperProps,
      TransitionComponent = props.TransitionComponent;
  var inputContainerRef = React.useRef(null);
  var popperRef = React.useRef(null);

  var handleBlur = function handleBlur() {
    executeInTheNextEventLoopTick(function () {
      var _inputContainerRef$cu, _popperRef$current;

      if ((_inputContainerRef$cu = inputContainerRef.current) != null && _inputContainerRef$cu.contains(document.activeElement) || (_popperRef$current = popperRef.current) != null && _popperRef$current.contains(document.activeElement)) {
        return;
      }

      onDismiss();
    });
  };

  var inputComponentRef = useForkRef(DateInputProps.ref, inputContainerRef);
  return /*#__PURE__*/_jsxs(WrapperVariantContext.Provider, {
    value: "desktop",
    children: [/*#__PURE__*/_jsx(KeyboardDateInputComponent, _extends({}, DateInputProps, {
      ref: inputComponentRef,
      onBlur: handleBlur
    })), /*#__PURE__*/_jsx(PickersPopper, {
      role: "tooltip",
      open: open,
      containerRef: popperRef,
      anchorEl: inputContainerRef.current,
      TransitionComponent: TransitionComponent,
      PopperProps: PopperProps,
      onBlur: handleBlur,
      onClose: onDismiss,
      children: children
    })]
  });
}

export default DesktopTooltipWrapper;