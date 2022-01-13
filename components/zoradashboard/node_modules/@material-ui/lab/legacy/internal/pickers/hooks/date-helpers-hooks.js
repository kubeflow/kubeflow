import * as React from 'react';
import { useUtils } from './useUtils';
import { getMeridiem, convertToMeridiem } from '../time-utils';
export function useNextMonthDisabled(month, _ref) {
  var disableFuture = _ref.disableFuture,
      maxDate = _ref.maxDate;
  var utils = useUtils();
  return React.useMemo(function () {
    var now = utils.date();
    var lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, maxDate) ? now : maxDate);
    return !utils.isAfter(lastEnabledMonth, month);
  }, [disableFuture, maxDate, month, utils]);
}
export function usePreviousMonthDisabled(month, _ref2) {
  var disablePast = _ref2.disablePast,
      minDate = _ref2.minDate;
  var utils = useUtils();
  return React.useMemo(function () {
    var now = utils.date();
    var firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, minDate) ? now : minDate);
    return !utils.isBefore(firstEnabledMonth, month);
  }, [disablePast, minDate, month, utils]);
}
export function useMeridiemMode(date, ampm, onChange) {
  var utils = useUtils();
  var meridiemMode = getMeridiem(date, utils);
  var handleMeridiemChange = React.useCallback(function (mode) {
    var timeWithMeridiem = convertToMeridiem(date, mode, Boolean(ampm), utils);
    onChange(timeWithMeridiem, 'shallow');
  }, [ampm, date, onChange, utils]);
  return {
    meridiemMode: meridiemMode,
    handleMeridiemChange: handleMeridiemChange
  };
}