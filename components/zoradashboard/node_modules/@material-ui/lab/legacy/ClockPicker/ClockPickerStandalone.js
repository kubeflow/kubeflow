import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
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
  var view = props.view,
      openTo = props.openTo,
      className = props.className,
      onViewChange = props.onViewChange,
      _props$views = props.views,
      views = _props$views === void 0 ? ['hours', 'minutes'] : _props$views,
      other = _objectWithoutProperties(props, ["view", "openTo", "className", "onViewChange", "views"]);

  var _useViews = useViews({
    view: view,
    views: views,
    openTo: openTo,
    onViewChange: onViewChange,
    onChange: other.onChange
  }),
      openView = _useViews.openView,
      setOpenView = _useViews.setOpenView,
      nextView = _useViews.nextView,
      previousView = _useViews.previousView;

  return /*#__PURE__*/_jsx(PickerView, {
    className: className,
    ref: ref,
    children: /*#__PURE__*/_jsx(ClockPicker, _extends({
      view: openView,
      nextViewAvailable: Boolean(nextView),
      previousViewAvailable: Boolean(previousView),
      openNextView: function openNextView() {
        return setOpenView(nextView);
      },
      openPreviousView: function openPreviousView() {
        return setOpenView(previousView);
      }
    }, other))
  });
});