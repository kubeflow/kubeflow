import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useForkRef } from '@material-ui/core/utils';
import { WrapperVariantContext } from './WrapperVariantContext';
import { executeInTheNextEventLoopTick } from '../utils';
import PickersPopper from '../PickersPopper';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function DesktopTooltipWrapper(props) {
  const {
    children,
    DateInputProps,
    KeyboardDateInputComponent,
    onDismiss,
    open,
    PopperProps,
    TransitionComponent
  } = props;
  const inputContainerRef = React.useRef(null);
  const popperRef = React.useRef(null);

  const handleBlur = () => {
    executeInTheNextEventLoopTick(() => {
      if (inputContainerRef.current?.contains(document.activeElement) || popperRef.current?.contains(document.activeElement)) {
        return;
      }

      onDismiss();
    });
  };

  const inputComponentRef = useForkRef(DateInputProps.ref, inputContainerRef);
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