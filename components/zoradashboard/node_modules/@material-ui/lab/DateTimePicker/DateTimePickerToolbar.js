import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";

var _DateTimePickerToolba;

const _excluded = ["ampm", "date", "dateRangeIcon", "hideTabs", "isMobileKeyboardViewOpen", "onChange", "openView", "setOpenView", "timeIcon", "toggleMobileKeyboardView", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle"];
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
const classes = generateUtilityClasses('PrivateDateTimePickerToolbar', ['penIcon']);
const DateTimePickerToolbarRoot = styled(PickersToolbar, {
  skipSx: true
})({
  paddingLeft: 16,
  paddingRight: 16,
  justifyContent: 'space-around',
  [`& .${classes.penIcon}`]: {
    position: 'absolute',
    top: 8,
    right: 8
  }
});
const DateTimePickerToolbarDateContainer = styled('div', {
  skipSx: true
})({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
});
const DateTimePickerToolbarTimeContainer = styled('div', {
  skipSx: true
})({
  display: 'flex'
});
const DateTimePickerToolbarSeparator = styled(PickersToolbarText, {
  skipSx: true
})({
  margin: '0 4px 0 2px',
  cursor: 'default'
});
/**
 * @ignore - internal component.
 */

const DateTimePickerToolbar = props => {
  const {
    ampm,
    date,
    dateRangeIcon,
    hideTabs,
    isMobileKeyboardViewOpen,
    openView,
    setOpenView,
    timeIcon,
    toggleMobileKeyboardView,
    toolbarFormat,
    toolbarPlaceholder = '––',
    toolbarTitle = 'Select date & time'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const utils = useUtils();
  const wrapperVariant = React.useContext(WrapperVariantContext);
  const showTabs = wrapperVariant === 'desktop' ? true : !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;

  const formatHours = time => ampm ? utils.format(time, 'hours12h') : utils.format(time, 'hours24h');

  const dateText = React.useMemo(() => {
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
          onClick: () => setOpenView('year'),
          selected: openView === 'year',
          value: date ? utils.format(date, 'year') : '–'
        }), /*#__PURE__*/_jsx(PickersToolbarButton, {
          tabIndex: -1,
          variant: "h4",
          onClick: () => setOpenView('day'),
          selected: openView === 'day',
          value: dateText
        })]
      }), /*#__PURE__*/_jsxs(DateTimePickerToolbarTimeContainer, {
        children: [/*#__PURE__*/_jsx(PickersToolbarButton, {
          variant: "h3",
          onClick: () => setOpenView('hours'),
          selected: openView === 'hours',
          value: date ? formatHours(date) : '--'
        }), _DateTimePickerToolba || (_DateTimePickerToolba = /*#__PURE__*/_jsx(DateTimePickerToolbarSeparator, {
          variant: "h3",
          value: ":"
        })), /*#__PURE__*/_jsx(PickersToolbarButton, {
          variant: "h3",
          onClick: () => setOpenView('minutes'),
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