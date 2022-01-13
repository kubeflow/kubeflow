import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["calendars", "changeMonth", "components", "componentsProps", "currentlySelectingRangeEnd", "currentMonth", "date", "disableFuture", "disablePast", "leftArrowButtonText", "maxDate", "minDate", "onChange", "renderDay", "rightArrowButtonText"];
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
const DateRangePickerViewDesktopRoot = styled('div', {
  skipSx: true
})({
  display: 'flex',
  flexDirection: 'row'
});
const DateRangePickerViewDesktopContainer = styled('div', {
  skipSx: true
})(({
  theme
}) => ({
  '&:not(:last-of-type)': {
    borderRight: `2px solid ${theme.palette.divider}`
  }
}));
const DateRangePickerViewDesktopCalendar = styled(PickersCalendar, {
  skipSx: true
})({
  minWidth: 312,
  minHeight: 288
});
const DateRangePickerViewDesktopArrowSwitcher = styled(PickersArrowSwitcher, {
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
  const {
    calendars,
    changeMonth,
    components,
    componentsProps,
    currentlySelectingRangeEnd,
    currentMonth,
    date,
    disableFuture,
    disablePast,
    leftArrowButtonText = 'Previous month',
    maxDate: maxDateProp,
    minDate: minDateProp,
    onChange,
    renderDay = (_, dateRangeProps) => /*#__PURE__*/_jsx(DateRangePickerDay, _extends({}, dateRangeProps)),
    rightArrowButtonText = 'Next month'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const minDate = minDateProp != null ? minDateProp : defaultDates.minDate;
  const maxDate = maxDateProp != null ? maxDateProp : defaultDates.maxDate;
  const [rangePreviewDay, setRangePreviewDay] = React.useState(null);
  const isNextMonthDisabled = useNextMonthDisabled(currentMonth, {
    disableFuture,
    maxDate
  });
  const isPreviousMonthDisabled = usePreviousMonthDisabled(currentMonth, {
    disablePast,
    minDate
  });
  const previewingRange = calculateRangePreview({
    utils,
    range: date,
    newDate: rangePreviewDay,
    currentlySelectingRangeEnd
  });
  const handleDayChange = React.useCallback(day => {
    setRangePreviewDay(null);
    onChange(day);
  }, [onChange]);

  const handlePreviewDayChange = newPreviewRequest => {
    if (!isWithinRange(utils, newPreviewRequest, date)) {
      setRangePreviewDay(newPreviewRequest);
    } else {
      setRangePreviewDay(null);
    }
  };

  const CalendarTransitionProps = React.useMemo(() => ({
    onMouseLeave: () => setRangePreviewDay(null)
  }), []);
  const selectNextMonth = React.useCallback(() => {
    changeMonth(utils.getNextMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);
  const selectPreviousMonth = React.useCallback(() => {
    changeMonth(utils.getPreviousMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);
  return /*#__PURE__*/_jsx(DateRangePickerViewDesktopRoot, {
    children: getCalendarsArray(calendars).map((_, index) => {
      const monthOnIteration = utils.setMonth(currentMonth, utils.getMonth(currentMonth) + index);
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
          renderDay: (day, __, DayProps) => renderDay(day, _extends({
            isPreviewing: isWithinRange(utils, day, previewingRange),
            isStartOfPreviewing: isStartOfRange(utils, day, previewingRange),
            isEndOfPreviewing: isEndOfRange(utils, day, previewingRange),
            isHighlighting: isWithinRange(utils, day, date),
            isStartOfHighlighting: isStartOfRange(utils, day, date),
            isEndOfHighlighting: isEndOfRange(utils, day, date),
            onMouseEnter: () => handlePreviewDayChange(day)
          }, DayProps))
        }))]
      }, index);
    })
  });
}

export default DateRangePickerViewDesktop;