import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { validateDate } from '../internal/pickers/date-utils';
import { useUtils, useNow } from '../internal/pickers/hooks/useUtils';
export var createCalendarStateReducer = function createCalendarStateReducer(reduceAnimations, disableSwitchToMonthOnDayFocus, utils) {
  return function (state, action) {
    switch (action.type) {
      case 'changeMonth':
        return _extends({}, state, {
          slideDirection: action.direction,
          currentMonth: action.newMonth,
          isMonthSwitchingAnimating: !reduceAnimations
        });

      case 'finishMonthSwitchingAnimation':
        return _extends({}, state, {
          isMonthSwitchingAnimating: false
        });

      case 'changeFocusedDay':
        {
          if (state.focusedDay !== null && utils.isSameDay(action.focusedDay, state.focusedDay)) {
            return state;
          }

          var needMonthSwitch = Boolean(action.focusedDay) && !disableSwitchToMonthOnDayFocus && !utils.isSameMonth(state.currentMonth, action.focusedDay);
          return _extends({}, state, {
            focusedDay: action.focusedDay,
            isMonthSwitchingAnimating: needMonthSwitch && !reduceAnimations,
            currentMonth: needMonthSwitch ? utils.startOfMonth(action.focusedDay) : state.currentMonth,
            slideDirection: utils.isAfterDay(action.focusedDay, state.currentMonth) ? 'left' : 'right'
          });
        }

      default:
        throw new Error('missing support');
    }
  };
};
export function useCalendarState(_ref) {
  var _ref2;

  var date = _ref.date,
      defaultCalendarMonth = _ref.defaultCalendarMonth,
      disableFuture = _ref.disableFuture,
      disablePast = _ref.disablePast,
      _ref$disableSwitchToM = _ref.disableSwitchToMonthOnDayFocus,
      disableSwitchToMonthOnDayFocus = _ref$disableSwitchToM === void 0 ? false : _ref$disableSwitchToM,
      maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      onMonthChange = _ref.onMonthChange,
      reduceAnimations = _ref.reduceAnimations,
      shouldDisableDate = _ref.shouldDisableDate;
  var now = useNow();
  var utils = useUtils();
  var reducerFn = React.useRef(createCalendarStateReducer(Boolean(reduceAnimations), disableSwitchToMonthOnDayFocus, utils)).current;

  var _React$useReducer = React.useReducer(reducerFn, {
    isMonthSwitchingAnimating: false,
    focusedDay: date || now,
    currentMonth: utils.startOfMonth((_ref2 = date != null ? date : defaultCalendarMonth) != null ? _ref2 : now),
    slideDirection: 'left'
  }),
      calendarState = _React$useReducer[0],
      dispatch = _React$useReducer[1];

  var handleChangeMonth = React.useCallback(function (payload) {
    dispatch(_extends({
      type: 'changeMonth'
    }, payload));

    if (onMonthChange) {
      onMonthChange(payload.newMonth);
    }
  }, [onMonthChange]);
  var changeMonth = React.useCallback(function (newDate) {
    var newDateRequested = newDate != null ? newDate : now;

    if (utils.isSameMonth(newDateRequested, calendarState.currentMonth)) {
      return;
    }

    handleChangeMonth({
      newMonth: utils.startOfMonth(newDateRequested),
      direction: utils.isAfterDay(newDateRequested, calendarState.currentMonth) ? 'left' : 'right'
    });
  }, [calendarState.currentMonth, handleChangeMonth, now, utils]);
  var isDateDisabled = React.useCallback(function (day) {
    return validateDate(utils, day, {
      disablePast: disablePast,
      disableFuture: disableFuture,
      minDate: minDate,
      maxDate: maxDate,
      shouldDisableDate: shouldDisableDate
    }) !== null;
  }, [disableFuture, disablePast, maxDate, minDate, shouldDisableDate, utils]);
  var onMonthSwitchingAnimationEnd = React.useCallback(function () {
    dispatch({
      type: 'finishMonthSwitchingAnimation'
    });
  }, []);
  var changeFocusedDay = React.useCallback(function (newFocusedDate) {
    if (!isDateDisabled(newFocusedDate)) {
      dispatch({
        type: 'changeFocusedDay',
        focusedDay: newFocusedDate
      });
    }
  }, [isDateDisabled]);
  return {
    calendarState: calendarState,
    changeMonth: changeMonth,
    changeFocusedDay: changeFocusedDay,
    isDateDisabled: isDateDisabled,
    onMonthSwitchingAnimationEnd: onMonthSwitchingAnimationEnd,
    handleChangeMonth: handleChangeMonth
  };
}