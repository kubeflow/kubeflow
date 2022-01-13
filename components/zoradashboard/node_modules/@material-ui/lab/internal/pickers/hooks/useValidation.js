import * as React from 'react';
import { useUtils } from './useUtils';
import { validateDate, validateDateRange } from '../date-utils';
import { validateDateTime } from '../date-time-utils';
import { validateTime } from '../time-utils';

function isSameDateOrTimeError(a, b) {
  return a === b;
}

function isSameDateRangeError(a, b) {
  return b !== null && a[1] === b[1] && a[0] === b[0];
}

function useValidation(props, validate, isSameError = isSameDateOrTimeError) {
  const {
    value,
    onError
  } = props;
  const utils = useUtils();
  const previousValidationErrorRef = React.useRef(null);
  const validationError = validate(utils, value, props);
  React.useEffect(() => {
    if (onError && !isSameError(validationError, previousValidationErrorRef.current)) {
      onError(validationError, value);
    }

    previousValidationErrorRef.current = validationError;
  }, [isSameError, onError, previousValidationErrorRef, validationError, value]);
  return validationError;
}

export function useTimeValidation(props) {
  return useValidation(props, validateTime, isSameDateOrTimeError);
}
export function useDateValidation(props) {
  return useValidation(props, validateDate, isSameDateOrTimeError);
}
export function useDateTimeValidation(props) {
  return useValidation(props, validateDateTime, isSameDateOrTimeError);
}
export function useDateRangeValidation(props) {
  return useValidation(props, validateDateRange, isSameDateRangeError);
}