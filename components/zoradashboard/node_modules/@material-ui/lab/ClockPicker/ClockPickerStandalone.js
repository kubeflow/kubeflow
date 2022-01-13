import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["view", "openTo", "className", "onViewChange", "views"];
import * as React from 'react';
import ClockPicker from './ClockPicker';
import PickerView from '../internal/pickers/Picker/PickerView';
import { useViews } from '../internal/pickers/hooks/useViews';
import { jsx as _jsx } from "react/jsx-runtime";

/**
 * Wrapping public API for better standalone usage of './ClockPicker'
 * @ignore - internal component.
 */
export default /*#__PURE__*/React.forwardRef(function ClockPickerStandalone(props, ref) {
  const {
    view,
    openTo,
    className,
    onViewChange,
    views = ['hours', 'minutes']
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const {
    openView,
    setOpenView,
    nextView,
    previousView
  } = useViews({
    view,
    views,
    openTo,
    onViewChange,
    onChange: other.onChange
  });
  return /*#__PURE__*/_jsx(PickerView, {
    className: className,
    ref: ref,
    children: /*#__PURE__*/_jsx(ClockPicker, _extends({
      view: openView,
      nextViewAvailable: Boolean(nextView),
      previousViewAvailable: Boolean(previousView),
      openNextView: () => setOpenView(nextView),
      openPreviousView: () => setOpenView(previousView)
    }, other))
  });
});