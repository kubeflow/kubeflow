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
const classes = generateUtilityClasses('PrivateDateRangePickerToolbar', ['penIcon']);
const DateRangePickerToolbarRoot = styled(PickersToolbar, {
  skipSx: true
})({
  [`& .${classes.penIcon}`]: {
    position: 'relative',
    top: 4
  }
});
const DateRangePickerToolbarContainer = styled('div', {
  skipSx: true
})({
  display: 'flex'
});
/**
 * @ignore - internal component.
 */

const DateRangePickerToolbar = ({
  currentlySelectingRangeEnd,
  date: [start, end],
  endText,
  isMobileKeyboardViewOpen,
  setCurrentlySelectingRangeEnd,
  startText,
  toggleMobileKeyboardView,
  toolbarFormat,
  toolbarTitle = 'Select date range'
}) => {
  const utils = useUtils();
  const startDateValue = start ? utils.formatByString(start, toolbarFormat || utils.formats.shortDate) : startText;
  const endDateValue = end ? utils.formatByString(end, toolbarFormat || utils.formats.shortDate) : endText;
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
        onClick: () => setCurrentlySelectingRangeEnd('start')
      }), _Typography || (_Typography = /*#__PURE__*/_jsxs(Typography, {
        variant: "h5",
        children: ["\xA0", '–', "\xA0"]
      })), /*#__PURE__*/_jsx(PickersToolbarButton, {
        variant: end !== null ? 'h5' : 'h6',
        value: endDateValue,
        selected: currentlySelectingRangeEnd === 'end',
        onClick: () => setCurrentlySelectingRangeEnd('end')
      })]
    })
  });
};

export default DateRangePickerToolbar;