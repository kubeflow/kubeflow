export var getMeridiem = function getMeridiem(date, utils) {
  if (!date) {
    return null;
  }

  return utils.getHours(date) >= 12 ? 'pm' : 'am';
};
export var convertValueToMeridiem = function convertValueToMeridiem(value, meridiem, ampm) {
  if (ampm) {
    var currentMeridiem = value >= 12 ? 'pm' : 'am';

    if (currentMeridiem !== meridiem) {
      return meridiem === 'am' ? value - 12 : value + 12;
    }
  }

  return value;
};
export var convertToMeridiem = function convertToMeridiem(time, meridiem, ampm, utils) {
  var newHoursAmount = convertValueToMeridiem(utils.getHours(time), meridiem, ampm);
  return utils.setHours(time, newHoursAmount);
};
export function getSecondsInDay(date, utils) {
  return utils.getHours(date) * 3600 + utils.getMinutes(date) * 60 + utils.getSeconds(date);
}
export var createIsAfterIgnoreDatePart = function createIsAfterIgnoreDatePart(disableIgnoringDatePartForTimeValidation, utils) {
  return function (dateLeft, dateRight) {
    if (disableIgnoringDatePartForTimeValidation) {
      return utils.isAfter(dateLeft, dateRight);
    }

    return getSecondsInDay(dateLeft, utils) > getSecondsInDay(dateRight, utils);
  };
};
export var validateTime = function validateTime(utils, value, _ref) {
  var minTime = _ref.minTime,
      maxTime = _ref.maxTime,
      shouldDisableTime = _ref.shouldDisableTime,
      disableIgnoringDatePartForTimeValidation = _ref.disableIgnoringDatePartForTimeValidation;
  var date = utils.date(value);
  var isAfterComparingFn = createIsAfterIgnoreDatePart(Boolean(disableIgnoringDatePartForTimeValidation), utils);

  if (value === null) {
    return null;
  }

  switch (true) {
    case !utils.isValid(value):
      return 'invalidDate';

    case Boolean(minTime && isAfterComparingFn(minTime, date)):
      return 'minTime';

    case Boolean(maxTime && isAfterComparingFn(date, maxTime)):
      return 'maxTime';

    case Boolean(shouldDisableTime && shouldDisableTime(utils.getHours(date), 'hours')):
      return 'shouldDisableTime-hours';

    case Boolean(shouldDisableTime && shouldDisableTime(utils.getMinutes(date), 'minutes')):
      return 'shouldDisableTime-minutes';

    case Boolean(shouldDisableTime && shouldDisableTime(utils.getSeconds(date), 'seconds')):
      return 'shouldDisableTime-seconds';

    default:
      return null;
  }
};