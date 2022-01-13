import _extends from "@babel/runtime/helpers/esm/extends";

var _span;

import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import PickersDay from '../PickersDay/PickersDay';
import { useUtils, useNow } from '../internal/pickers/hooks/useUtils';
import { DAY_SIZE, DAY_MARGIN } from '../internal/pickers/constants/dimensions';
import SlideTransition from './PickersSlideTransition';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const weeksContainerHeight = (DAY_SIZE + DAY_MARGIN * 4) * 6;
const PickersCalendarDayHeader = styled('div', {
  skipSx: true
})({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
const PickersCalendarWeekDayLabel = styled(Typography, {
  skipSx: true
})(({
  theme
}) => ({
  width: 36,
  height: 40,
  margin: '0 2px',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.secondary
}));
const PickersCalendarLoadingContainer = styled('div', {
  skipSx: true
})({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: weeksContainerHeight
});
const PickersCalendarSlideTransition = styled(SlideTransition, {
  skipSx: true
})({
  minHeight: weeksContainerHeight
});
const PickersCalendarWeekContainer = styled('div', {
  skipSx: true
})({
  overflow: 'hidden'
});
const PickersCalendarWeek = styled('div', {
  skipSx: true
})({
  margin: `${DAY_MARGIN}px 0`,
  display: 'flex',
  justifyContent: 'center'
});
/**
 * @ignore - do not document.
 */

function PickersCalendar(props) {
  const {
    allowSameDateSelection,
    autoFocus,
    onFocusedDayChange: changeFocusedDay,
    className,
    currentMonth,
    date,
    disableHighlightToday,
    focusedDay,
    isDateDisabled,
    isMonthSwitchingAnimating,
    loading,
    onChange,
    onMonthSwitchingAnimationEnd,
    reduceAnimations,
    renderDay,
    renderLoading = () => _span || (_span = /*#__PURE__*/_jsx("span", {
      children: "..."
    })),
    showDaysOutsideCurrentMonth,
    slideDirection,
    TransitionProps
  } = props;
  const now = useNow();
  const utils = useUtils();
  const handleDaySelect = React.useCallback((day, isFinish = 'finish') => {
    // TODO possibly buggy line figure out and add tests
    const finalDate = Array.isArray(date) ? day : utils.mergeDateAndTime(day, date || now);
    onChange(finalDate, isFinish);
  }, [date, now, onChange, utils]);
  const currentMonthNumber = utils.getMonth(currentMonth);
  const selectedDates = (Array.isArray(date) ? date : [date]).filter(Boolean).map(selectedDateItem => selectedDateItem && utils.startOfDay(selectedDateItem)); // need a new ref whenever the `key` of the transition changes: https://reactcommunity.org/react-transition-group/transition#Transition-prop-nodeRef.

  const transitionKey = currentMonthNumber; // eslint-disable-next-line react-hooks/exhaustive-deps

  const slideNodeRef = React.useMemo(() => /*#__PURE__*/React.createRef(), [transitionKey]);
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(PickersCalendarDayHeader, {
      children: utils.getWeekdays().map((day, i) => /*#__PURE__*/_jsx(PickersCalendarWeekDayLabel, {
        "aria-hidden": true,
        variant: "caption",
        children: day.charAt(0).toUpperCase()
      }, day + i.toString()))
    }), loading ? /*#__PURE__*/_jsx(PickersCalendarLoadingContainer, {
      children: renderLoading()
    }) : /*#__PURE__*/_jsx(PickersCalendarSlideTransition, _extends({
      transKey: transitionKey,
      onExited: onMonthSwitchingAnimationEnd,
      reduceAnimations: reduceAnimations,
      slideDirection: slideDirection,
      className: className
    }, TransitionProps, {
      nodeRef: slideNodeRef,
      children: /*#__PURE__*/_jsx(PickersCalendarWeekContainer, {
        ref: slideNodeRef,
        role: "grid",
        children: utils.getWeekArray(currentMonth).map(week => /*#__PURE__*/_jsx(PickersCalendarWeek, {
          role: "row",
          children: week.map(day => {
            const pickersDayProps = {
              key: day == null ? void 0 : day.toString(),
              day,
              isAnimating: isMonthSwitchingAnimating,
              disabled: isDateDisabled(day),
              allowSameDateSelection,
              autoFocus: autoFocus && focusedDay !== null && utils.isSameDay(day, focusedDay),
              today: utils.isSameDay(day, now),
              outsideCurrentMonth: utils.getMonth(day) !== currentMonthNumber,
              selected: selectedDates.some(selectedDate => selectedDate && utils.isSameDay(selectedDate, day)),
              disableHighlightToday,
              showDaysOutsideCurrentMonth,
              onDayFocus: changeFocusedDay,
              onDaySelect: handleDaySelect
            };
            return renderDay ? renderDay(day, selectedDates, pickersDayProps) : /*#__PURE__*/_jsx("div", {
              role: "cell",
              children: /*#__PURE__*/_jsx(PickersDay, _extends({}, pickersDayProps))
            }, pickersDayProps.key);
          })
        }, `week-${week[0]}`))
      })
    }))]
  });
}

export default PickersCalendar;