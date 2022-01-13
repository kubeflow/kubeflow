import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

var _Typography;

import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { generateUtilityClasses } from '@material-ui/unstyled';
import PickersToolbar from '../internal/pickers/PickersToolbar';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import PickersToolbarButton from '../internal/pickers/PickersToolbarButton';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var classes = generateUtilityClasses('PrivateDateRangePickerToolbar', ['penIcon']);
var DateRangePickerToolbarRoot = styled(PickersToolbar, {
  skipSx: true
})(_defineProperty({}, "& .".concat(classes.penIcon), {
  position: 'relative',
  top: 4
}));
var DateRangePickerToolbarContainer = styled('div', {
  skipSx: true
})({
  display: 'flex'
});
/**
 * @ignore - internal component.
 */

var DateRangePickerToolbar = function DateRangePickerToolbar(_ref) {
  var currentlySelectingRangeEnd = _ref.currentlySelectingRangeEnd,
      _ref$date = _slicedToArray(_ref.date, 2),
      start = _ref$date[0],
      end = _ref$date[1],
      endText = _ref.endText,
      isMobileKeyboardViewOpen = _ref.isMobileKeyboardViewOpen,
      setCurrentlySelectingRangeEnd = _ref.setCurrentlySelectingRangeEnd,
      startText = _ref.startText,
      toggleMobileKeyboardView = _ref.toggleMobileKeyboardView,
      toolbarFormat = _ref.toolbarFormat,
      _ref$toolbarTitle = _ref.toolbarTitle,
      toolbarTitle = _ref$toolbarTitle === void 0 ? 'Select date range' : _ref$toolbarTitle;

  var utils = useUtils();
  var startDateValue = start ? utils.formatByString(start, toolbarFormat || utils.formats.shortDate) : startText;
  var endDateValue = end ? utils.formatByString(end, toolbarFormat || utils.formats.shortDate) : endText;
  return /*#__PURE__*/_jsx(DateRangePickerToolbarRoot, {
    toolbarTitle: toolbarTitle,
    isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
    toggleMobileKeyboardView: toggleMobileKeyboardView,
    isLandscape: false,
    penIconClassName: classes.penIcon,
    children: /*#__PURE__*/_jsxs(DateRangePickerToolbarContainer, {
      children: [/*#__PURE__*/_jsx(PickersToolbarButton, {
        variant: start !== null ? 'h5' : 'h6',
        value: startDateValue,
        selected: currentlySelectingRangeEnd === 'start',
        onClick: function onClick() {
          return setCurrentlySelectingRangeEnd('start');
        }
      }), _Typography || (_Typography = /*#__PURE__*/_jsxs(Typography, {
        variant: "h5",
        children: ["\xA0", '–', "\xA0"]
      })), /*#__PURE__*/_jsx(PickersToolbarButton, {
        variant: end !== null ? 'h5' : 'h6',
        value: endDateValue,
        selected: currentlySelectingRangeEnd === 'end',
        onClick: function onClick() {
          return setCurrentlySelectingRangeEnd('end');
        }
      })]
    })
  });
};

export default DateRangePickerToolbar;