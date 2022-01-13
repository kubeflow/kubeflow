"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSecondsInDay = getSecondsInDay;
exports.validateTime = exports.createIsAfterIgnoreDatePart = exports.convertToMeridiem = exports.convertValueToMeridiem = exports.getMeridiem = void 0;

const getMeridiem = (date, utils) => {
  if (!date) {
    return null;
  }

  return utils.getHours(date) >= 12 ? 'pm' : 'am';
};

exports.getMeridiem = getMeridiem;

const convertValueToMeridiem = (value, meridiem, ampm) => {
  if (ampm) {
    const currentMeridiem = value >= 12 ? 'pm' : 'am';

    if (currentMeridiem !== meridiem) {
      return meridiem === 'am' ? value - 12 : value + 12;
    }
  }

  return value;
};

exports.convertValueToMeridiem = convertValueToMeridiem;

const convertToMeridiem = (time, meridiem, ampm, utils) => {
  const newHoursAmount = convertValueToMeridiem(utils.getHours(time), meridiem, ampm);
  return utils.setHours(time, newHoursAmount);
};

exports.convertToMeridiem = convertToMeridiem;

function getSecondsInDay(date, utils) {
  return utils.getHours(date) * 3600 + utils.getMinutes(date) * 60 + utils.getSeconds(date);
}

const createIsAfterIgnoreDatePart = (disableIgnoringDatePartForTimeValidation, utils) => (dateLeft, dateRight) => {
  if (disableIgnoringDatePartForTimeValidation) {
    return utils.isAfter(dateLeft, dateRight);
  }

  return getSecondsInDay(dateLeft, utils) > getSecondsInDay(dateRight, utils);
};

exports.createIsAfterIgnoreDatePart = createIsAfterIgnoreDatePart;

const validateTime = (utils, value, {
  minTime,
  maxTime,
  shouldDisableTime,
  disableIgnoringDatePartForTimeValidation
}) => {
  const date = utils.date(value);
  const isAfterComparingFn = createIsAfterIgnoreDatePart(Boolean(disableIgnoringDatePartForTimeValidation), utils);

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

exports.validateTime = validateTime;