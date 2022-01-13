import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["minDate", "maxDate", "disableFuture", "shouldDisableDate", "disablePast"];
import { validateDate } from './date-utils';
import { validateTime } from './time-utils';
export function validateDateTime(utils, value, _ref) {
  let {
    minDate,
    maxDate,
    disableFuture,
    shouldDisableDate,
    disablePast
  } = _ref,
      timeValidationProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  const dateValidationResult = validateDate(utils, value, {
    minDate,
    maxDate,
    disableFuture,
    shouldDisableDate,
    disablePast
  });

  if (dateValidationResult !== null) {
    return dateValidationResult;
  }

  return validateTime(utils, value, timeValidationProps);
}