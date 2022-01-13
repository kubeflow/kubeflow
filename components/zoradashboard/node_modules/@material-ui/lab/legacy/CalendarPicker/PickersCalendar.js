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
var weeksContainerHeight = (DAY_SIZE + DAY_MARGIN * 4) * 6;
var PickersCalendarDayHeader = styled('div', {
  skipSx: true
})({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
var PickersCalendarWeekDayLabel = styled(Typography, {
  skipSx: true
})(function (_ref) {
  var theme = _ref.theme;
  return {
    width: 36,
    height: 40,
    margin: '0 2px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary
  };
});
var PickersCalendarLoadingContainer = styled('div', {
  skipSx: true
})({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: weeksContainerHeight
});
var PickersCalendarSlideTransition = styled(SlideTransition, {
  skipSx: true
})({
  minHeight: weeksContainerHeight
});
var PickersCalendarWeekContainer = styled('div', {
  skipSx: true
})({
  overflow: 'hidden'
});
var PickersCalendarWeek = styled('div', {
  skipSx: true
})({
  margin: "".concat(DAY_MARGIN, "px 0"),
  display: 'flex',
  justifyContent: 'center'
});
/**
 * @ignore - do not document.
 */

function PickersCalendar(props) {
  var allowSameDateSelection = props.allowSameDateSelection,
      autoFocus = props.autoFocus,
      changeFocusedDay = props.onFocusedDayChange,
      className = props.className,
      currentMonth = props.currentMonth,
      date = props.date,
      disableHighlightToday = props.disableHighlightToday,
      focusedDay = props.focusedDay,
      isDateDisabled = props.isDateDisabled,
      isMonthSwitchingAnimating = props.isMonthSwitchingAnimating,
      loading = props.loading,
      onChange = props.onChange,
      onMonthSwitchingAnimationEnd = props.onMonthSwitchingAnimationEnd,
      reduceAnimations = props.reduceAnimations,
      renderDay = props.renderDay,
      _props$renderLoading = props.renderLoading,
      renderLoading = _props$renderLoading === void 0 ? function () {
    return _span || (_span = /*#__PURE__*/_jsx("span", {
      children: "..."
    }));
  } : _props$renderLoading,
      showDaysOutsideCurrentMonth = props.showDaysOutsideCurrentMonth,
      slideDirection = props.slideDirection,
      TransitionProps = props.TransitionProps;
  var now = useNow();
  var utils = useUtils();
  var handleDaySelect = React.useCallback(function (day) {
    var isFinish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'finish';
    // TODO possibly buggy line figure out and add tests
    var finalDate = Array.isArray(date) ? day : utils.mergeDateAndTime(day, date || now);
    onChange(finalDate, isFinish);
  }, [date, now, onChange, utils]);
  var currentMonthNumber = utils.getMonth(currentMonth);
  var selectedDates = (Array.isArray(date) ? date : [date]).filter(Boolean).map(function (selectedDateItem) {
    return selectedDateItem && utils.startOfDay(selectedDateItem);
  }); // need a new ref whenever the `key` of the transition changes: https://reactcommunity.org/react-transition-group/transition#Transition-prop-nodeRef.

  var transitionKey = currentMonthNumber; // eslint-disable-next-line react-hooks/exhaustive-deps

  var slideNodeRef = React.useMemo(function () {
    return /*#__PURE__*/React.createRef();
  }, [transitionKey]);
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(PickersCalendarDayHeader, {
      children: utils.getWeekdays().map(function (day, i) {
        return /*#__PURE__*/_jsx(PickersCalendarWeekDayLabel, {
          "aria-hidden": true,
          variant: "caption",
          children: day.charAt(0).toUpperCase()
        }, day + i.toString());
      })
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
        children: utils.getWeekArray(currentMonth).map(function (week) {
          return /*#__PURE__*/_jsx(PickersCalendarWeek, {
            role: "row",
            children: week.map(function (day) {
              var pickersDayProps = {
                key: day == null ? void 0 : day.toString(),
                day: day,
                isAnimating: isMonthSwitchingAnimating,
                disabled: isDateDisabled(day),
                allowSameDateSelection: allowSameDateSelection,
                autoFocus: autoFocus && focusedDay !== null && utils.isSameDay(day, focusedDay),
                today: utils.isSameDay(day, now),
                outsideCurrentMonth: utils.getMonth(day) !== currentMonthNumber,
                selected: selectedDates.some(function (selectedDate) {
                  return selectedDate && utils.isSameDay(selectedDate, day);
                }),
                disableHighlightToday: disableHighlightToday,
                showDaysOutsideCurrentMonth: showDaysOutsideCurrentMonth,
                onDayFocus: changeFocusedDay,
                onDaySelect: handleDaySelect
              };
              return renderDay ? renderDay(day, selectedDates, pickersDayProps) : /*#__PURE__*/_jsx("div", {
                role: "cell",
                children: /*#__PURE__*/_jsx(PickersDay, _extends({}, pickersDayProps))
              }, pickersDayProps.key);
            })
          }, "week-".concat(week[0]));
        })
      })
    }))]
  });
}

export default PickersCalendar;