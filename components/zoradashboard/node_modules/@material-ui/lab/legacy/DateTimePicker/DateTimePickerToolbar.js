import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

var _DateTimePickerToolba;

import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import { generateUtilityClasses } from '@material-ui/unstyled';
import PickersToolbarText from '../internal/pickers/PickersToolbarText';
import PickersToolbar from '../internal/pickers/PickersToolbar';
import PickersToolbarButton from '../internal/pickers/PickersToolbarButton';
import DateTimePickerTabs from './DateTimePickerTabs';
import { useUtils } from '../internal/pickers/hooks/useUtils';
import { WrapperVariantContext } from '../internal/pickers/wrappers/WrapperVariantContext';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var classes = generateUtilityClasses('PrivateDateTimePickerToolbar', ['penIcon']);
var DateTimePickerToolbarRoot = styled(PickersToolbar, {
  skipSx: true
})(_defineProperty({
  paddingLeft: 16,
  paddingRight: 16,
  justifyContent: 'space-around'
}, "& .".concat(classes.penIcon), {
  position: 'absolute',
  top: 8,
  right: 8
}));
var DateTimePickerToolbarDateContainer = styled('div', {
  skipSx: true
})({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
});
var DateTimePickerToolbarTimeContainer = styled('div', {
  skipSx: true
})({
  display: 'flex'
});
var DateTimePickerToolbarSeparator = styled(PickersToolbarText, {
  skipSx: true
})({
  margin: '0 4px 0 2px',
  cursor: 'default'
});
/**
 * @ignore - internal component.
 */

var DateTimePickerToolbar = function DateTimePickerToolbar(props) {
  var ampm = props.ampm,
      date = props.date,
      dateRangeIcon = props.dateRangeIcon,
      hideTabs = props.hideTabs,
      isMobileKeyboardViewOpen = props.isMobileKeyboardViewOpen,
      onChange = props.onChange,
      openView = props.openView,
      setOpenView = props.setOpenView,
      timeIcon = props.timeIcon,
      toggleMobileKeyboardView = props.toggleMobileKeyboardView,
      toolbarFormat = props.toolbarFormat,
      _props$toolbarPlaceho = props.toolbarPlaceholder,
      toolbarPlaceholder = _props$toolbarPlaceho === void 0 ? '––' : _props$toolbarPlaceho,
      _props$toolbarTitle = props.toolbarTitle,
      toolbarTitle = _props$toolbarTitle === void 0 ? 'Select date & time' : _props$toolbarTitle,
      other = _objectWithoutProperties(props, ["ampm", "date", "dateRangeIcon", "hideTabs", "isMobileKeyboardViewOpen", "onChange", "openView", "setOpenView", "timeIcon", "toggleMobileKeyboardView", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle"]);

  var utils = useUtils();
  var wrapperVariant = React.useContext(WrapperVariantContext);
  var showTabs = wrapperVariant === 'desktop' ? true : !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;

  var formatHours = function formatHours(time) {
    return ampm ? utils.format(time, 'hours12h') : utils.format(time, 'hours24h');
  };

  var dateText = React.useMemo(function () {
    if (!date) {
      return toolbarPlaceholder;
    }

    if (toolbarFormat) {
      return utils.formatByString(date, toolbarFormat);
    }

    return utils.format(date, 'shortDate');
  }, [date, toolbarFormat, toolbarPlaceholder, utils]);
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [wrapperVariant !== 'desktop' && /*#__PURE__*/_jsxs(DateTimePickerToolbarRoot, _extends({
      toolbarTitle: toolbarTitle,
      penIconClassName: classes.penIcon,
      isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
      toggleMobileKeyboardView: toggleMobileKeyboardView
    }, other, {
      isLandscape: false,
      children: [/*#__PURE__*/_jsxs(DateTimePickerToolbarDateContainer, {
        children: [/*#__PURE__*/_jsx(PickersToolbarButton, {
          tabIndex: -1,
          variant: "subtitle1",
          onClick: function onClick() {
            return setOpenView('year');
          },
          selected: openView === 'year',
          value: date ? utils.format(date, 'year') : '–'
        }), /*#__PURE__*/_jsx(PickersToolbarButton, {
          tabIndex: -1,
          variant: "h4",
          onClick: function onClick() {
            return setOpenView('day');
          },
          selected: openView === 'day',
          value: dateText
        })]
      }), /*#__PURE__*/_jsxs(DateTimePickerToolbarTimeContainer, {
        children: [/*#__PURE__*/_jsx(PickersToolbarButton, {
          variant: "h3",
          onClick: function onClick() {
            return setOpenView('hours');
          },
          selected: openView === 'hours',
          value: date ? formatHours(date) : '--'
        }), _DateTimePickerToolba || (_DateTimePickerToolba = /*#__PURE__*/_jsx(DateTimePickerToolbarSeparator, {
          variant: "h3",
          value: ":"
        })), /*#__PURE__*/_jsx(PickersToolbarButton, {
          variant: "h3",
          onClick: function onClick() {
            return setOpenView('minutes');
          },
          selected: openView === 'minutes',
          value: date ? utils.format(date, 'minutes') : '--'
        })]
      })]
    })), showTabs && /*#__PURE__*/_jsx(DateTimePickerTabs, {
      dateRangeIcon: dateRangeIcon,
      timeIcon: timeIcon,
      view: openView,
      onChange: setOpenView
    })]
  });
};

export default DateTimePickerToolbar;