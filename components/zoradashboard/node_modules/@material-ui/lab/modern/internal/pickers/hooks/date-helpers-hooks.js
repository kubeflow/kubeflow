import * as React from 'react';
import { useUtils } from './useUtils';
import { getMeridiem, convertToMeridiem } from '../time-utils';
export function useNextMonthDisabled(month, {
  disableFuture,
  maxDate
}) {
  const utils = useUtils();
  return React.useMemo(() => {
    const now = utils.date();
    const lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, maxDate) ? now : maxDate);
    return !utils.isAfter(lastEnabledMonth, month);
  }, [disableFuture, maxDate, month, utils]);
}
export function usePreviousMonthDisabled(month, {
  disablePast,
  minDate
}) {
  const utils = useUtils();
  return React.useMemo(() => {
    const now = utils.date();
    const firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, minDate) ? now : minDate);
    return !utils.isBefore(firstEnabledMonth, month);
  }, [disablePast, minDate, month, utils]);
}
export function useMeridiemMode(date, ampm, onChange) {
  const utils = useUtils();
  const meridiemMode = getMeridiem(date, utils);
  const handleMeridiemChange = React.useCallback(mode => {
    const timeWithMeridiem = convertToMeridiem(date, mode, Boolean(ampm), utils);
    onChange(timeWithMeridiem, 'shallow');
  }, [ampm, date, onChange, utils]);
  return {
    meridiemMode,
    handleMeridiemChange
  };
}