import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import { useDefaultDates, useUtils } from '../internal/pickers/hooks/useUtils';
import { calculateRangePreview } from './date-range-manager';
import PickersCalendar from '../CalendarPicker/PickersCalendar';
import DateRangePickerDay from '../DateRangePickerDay';
import PickersArrowSwitcher from '../internal/pickers/PickersArrowSwitcher';
import { usePreviousMonthDisabled, useNextMonthDisabled } from '../internal/pickers/hooks/date-helpers-hooks';
import { isWithinRange, isStartOfRange, isEndOfRange } from '../internal/pickers/date-utils';
import { doNothing } from '../internal/pickers/utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { jsxs as _jsxs } from "react/jsx-runtime";
var DateRangePickerViewDesktopRoot = styled('div', {
  skipSx: true
})({
  display: 'flex',
  flexDirection: 'row'
});
var DateRangePickerViewDesktopContainer = styled('div', {
  skipSx: true
})(function (_ref) {
  var theme = _ref.theme;
  return {
    '&:not(:last-of-type)': {
      borderRight: "2px solid ".concat(theme.palette.divider)
    }
  };
});
var DateRangePickerViewDesktopCalendar = styled(PickersCalendar, {
  skipSx: true
})({
  minWidth: 312,
  minHeight: 288
});
var DateRangePickerViewDesktopArrowSwitcher = styled(PickersArrowSwitcher, {
  skipSx: true
})({
  padding: '16px 16px 8px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
});

function getCalendarsArray(calendars) {
  switch (calendars) {
    case 1:
      return [0];

    case 2:
      return [0, 0];

    case 3:
      return [0, 0, 0];
    // this will not work in IE11, but allows to support any amount of calendars

    default:
      return new Array(calendars).fill(0);
  }
}
/**
 * @ignore - internal component.
 */


function DateRangePickerViewDesktop(props) {
  var calendars = props.calendars,
      changeMonth = props.changeMonth,
      components = props.components,
      componentsProps = props.componentsProps,
      currentlySelectingRangeEnd = props.currentlySelectingRangeEnd,
      currentMonth = props.currentMonth,
      date = props.date,
      disableFuture = props.disableFuture,
      disablePast = props.disablePast,
      _props$leftArrowButto = props.leftArrowButtonText,
      leftArrowButtonText = _props$leftArrowButto === void 0 ? 'Previous month' : _props$leftArrowButto,
      maxDateProp = props.maxDate,
      minDateProp = props.minDate,
      onChange = props.onChange,
      _props$renderDay = props.renderDay,
      _renderDay = _props$renderDay === void 0 ? function (_, dateRangeProps) {
    return /*#__PURE__*/_jsx(DateRangePickerDay, _extends({}, dateRangeProps));
  } : _props$renderDay,
      _props$rightArrowButt = props.rightArrowButtonText,
      rightArrowButtonText = _props$rightArrowButt === void 0 ? 'Next month' : _props$rightArrowButt,
      other = _objectWithoutProperties(props, ["calendars", "changeMonth", "components", "componentsProps", "currentlySelectingRangeEnd", "currentMonth", "date", "disableFuture", "disablePast", "leftArrowButtonText", "maxDate", "minDate", "onChange", "renderDay", "rightArrowButtonText"]);

  var utils = useUtils();
  var defaultDates = useDefaultDates();
  var minDate = minDateProp != null ? minDateProp : defaultDates.minDate;
  var maxDate = maxDateProp != null ? maxDateProp : defaultDates.maxDate;

  var _React$useState = React.useState(null),
      rangePreviewDay = _React$useState[0],
      setRangePreviewDay = _React$useState[1];

  var isNextMonthDisabled = useNextMonthDisabled(currentMonth, {
    disableFuture: disableFuture,
    maxDate: maxDate
  });
  var isPreviousMonthDisabled = usePreviousMonthDisabled(currentMonth, {
    disablePast: disablePast,
    minDate: minDate
  });
  var previewingRange = calculateRangePreview({
    utils: utils,
    range: date,
    newDate: rangePreviewDay,
    currentlySelectingRangeEnd: currentlySelectingRangeEnd
  });
  var handleDayChange = React.useCallback(function (day) {
    setRangePreviewDay(null);
    onChange(day);
  }, [onChange]);

  var handlePreviewDayChange = function handlePreviewDayChange(newPreviewRequest) {
    if (!isWithinRange(utils, newPreviewRequest, date)) {
      setRangePreviewDay(newPreviewRequest);
    } else {
      setRangePreviewDay(null);
    }
  };

  var CalendarTransitionProps = React.useMemo(function () {
    return {
      onMouseLeave: function onMouseLeave() {
        return setRangePreviewDay(null);
      }
    };
  }, []);
  var selectNextMonth = React.useCallback(function () {
    changeMonth(utils.getNextMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);
  var selectPreviousMonth = React.useCallback(function () {
    changeMonth(utils.getPreviousMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);
  return /*#__PURE__*/_jsx(DateRangePickerViewDesktopRoot, {
    children: getCalendarsArray(calendars).map(function (_, index) {
      var monthOnIteration = utils.setMonth(currentMonth, utils.getMonth(currentMonth) + index);
      return /*#__PURE__*/_jsxs(DateRangePickerViewDesktopContainer, {
        children: [/*#__PURE__*/_jsx(DateRangePickerViewDesktopArrowSwitcher, {
          onLeftClick: selectPreviousMonth,
          onRightClick: selectNextMonth,
          isLeftHidden: index !== 0,
          isRightHidden: index !== calendars - 1,
          isLeftDisabled: isPreviousMonthDisabled,
          isRightDisabled: isNextMonthDisabled,
          leftArrowButtonText: leftArrowButtonText,
          components: components,
          componentsProps: componentsProps,
          rightArrowButtonText: rightArrowButtonText,
          children: utils.format(monthOnIteration, 'monthAndYear')
        }), /*#__PURE__*/_createElement(DateRangePickerViewDesktopCalendar, _extends({}, other, {
          key: index,
          date: date,
          onFocusedDayChange: doNothing,
          onChange: handleDayChange,
          currentMonth: monthOnIteration,
          TransitionProps: CalendarTransitionProps,
          renderDay: function renderDay(day, __, DayProps) {
            return _renderDay(day, _extends({
              isPreviewing: isWithinRange(utils, day, previewingRange),
              isStartOfPreviewing: isStartOfRange(utils, day, previewingRange),
              isEndOfPreviewing: isEndOfRange(utils, day, previewingRange),
              isHighlighting: isWithinRange(utils, day, date),
              isStartOfHighlighting: isStartOfRange(utils, day, date),
              isEndOfHighlighting: isEndOfRange(utils, day, date),
              onMouseEnter: function onMouseEnter() {
                return handlePreviewDayChange(day);
              }
            }, DayProps));
          }
        }))]
      }, index);
    })
  });
}

export default DateRangePickerViewDesktop;