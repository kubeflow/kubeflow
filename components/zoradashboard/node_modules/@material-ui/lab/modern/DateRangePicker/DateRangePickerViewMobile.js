import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["changeMonth", "components", "componentsProps", "date", "leftArrowButtonText", "maxDate", "minDate", "onChange", "renderDay", "rightArrowButtonText"];
import * as React from 'react';
import PickersCalendarHeader from '../CalendarPicker/PickersCalendarHeader';
import DateRangePickerDay from '../DateRangePickerDay';
import { useDefaultDates, useUtils } from '../internal/pickers/hooks/useUtils';
import PickersCalendar from '../CalendarPicker/PickersCalendar';
import { isWithinRange, isStartOfRange, isEndOfRange } from '../internal/pickers/date-utils';
import { doNothing } from '../internal/pickers/utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const onlyDayView = ['day'];
/**
 * @ignore - internal component.
 */

export function DateRangePickerViewMobile(props) {
  const {
    changeMonth,
    components,
    componentsProps,
    date,
    leftArrowButtonText,
    maxDate: maxDateProp,
    minDate: minDateProp,
    onChange,
    renderDay = (_, dayProps) => /*#__PURE__*/_jsx(DateRangePickerDay, _extends({}, dayProps)),
    rightArrowButtonText
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const minDate = minDateProp ?? defaultDates.minDate;
  const maxDate = maxDateProp ?? defaultDates.maxDate;
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
      renderDay: (day, _, DayProps) => renderDay(day, _extends({
        isPreviewing: false,
        isStartOfPreviewing: false,
        isEndOfPreviewing: false,
        isHighlighting: isWithinRange(utils, day, date),
        isStartOfHighlighting: isStartOfRange(utils, day, date),
        isEndOfHighlighting: isEndOfRange(utils, day, date)
      }, DayProps))
    }))]
  });
}