import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PickersCalendarHeader from '../CalendarPicker/PickersCalendarHeader';
import DateRangePickerDay from '../DateRangePickerDay';
import { useDefaultDates, useUtils } from '../internal/pickers/hooks/useUtils';
import PickersCalendar from '../CalendarPicker/PickersCalendar';
import { isWithinRange, isStartOfRange, isEndOfRange } from '../internal/pickers/date-utils';
import { doNothing } from '../internal/pickers/utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var onlyDayView = ['day'];
/**
 * @ignore - internal component.
 */

export function DateRangePickerViewMobile(props) {
  var changeMonth = props.changeMonth,
      components = props.components,
      componentsProps = props.componentsProps,
      date = props.date,
      leftArrowButtonText = props.leftArrowButtonText,
      maxDateProp = props.maxDate,
      minDateProp = props.minDate,
      onChange = props.onChange,
      _props$renderDay = props.renderDay,
      _renderDay = _props$renderDay === void 0 ? function (_, dayProps) {
    return /*#__PURE__*/_jsx(DateRangePickerDay, _extends({}, dayProps));
  } : _props$renderDay,
      rightArrowButtonText = props.rightArrowButtonText,
      other = _objectWithoutProperties(props, ["changeMonth", "components", "componentsProps", "date", "leftArrowButtonText", "maxDate", "minDate", "onChange", "renderDay", "rightArrowButtonText"]);

  var utils = useUtils();
  var defaultDates = useDefaultDates();
  var minDate = minDateProp != null ? minDateProp : defaultDates.minDate;
  var maxDate = maxDateProp != null ? maxDateProp : defaultDates.maxDate;
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(PickersCalendarHeader, _extends({
      components: components,
      componentsProps: componentsProps,
      leftArrowButtonText: leftArrowButtonText,
      maxDate: maxDate,
      minDate: minDate,
      onMonthChange: changeMonth,
      openView: "day",
      rightArrowButtonText: rightArrowButtonText,
      views: onlyDayView
    }, other)), /*#__PURE__*/_jsx(PickersCalendar, _extends({}, other, {
      date: date,
      onChange: onChange,
      onFocusedDayChange: doNothing,
      renderDay: function renderDay(day, _, DayProps) {
        return _renderDay(day, _extends({
          isPreviewing: false,
          isStartOfPreviewing: false,
          isEndOfPreviewing: false,
          isHighlighting: isWithinRange(utils, day, date),
          isStartOfHighlighting: isStartOfRange(utils, day, date),
          isEndOfHighlighting: isEndOfRange(utils, day, date)
        }, DayProps));
      }
    }))]
  });
}