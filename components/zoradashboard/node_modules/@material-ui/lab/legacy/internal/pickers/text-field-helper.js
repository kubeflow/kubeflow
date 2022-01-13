export function getTextFieldAriaText(rawValue, utils) {
  // TODO: should `isValid` narrow `TDate | null` to `NonNullable<TDate>`?
  // Either we allow `TDate | null` to be valid and guard against calling `formatByString` with `null`.
  // Or we ensure `formatByString` is callable with `null`.
  return rawValue && utils.isValid(utils.date(rawValue)) ? "Choose date, selected date is ".concat(utils.format(utils.date(rawValue), 'fullDate')) : 'Choose date';
}
export var getDisplayDate = function getDisplayDate(utils, value, inputFormat) {
  var date = utils.date(value);
  var isEmpty = value === null;

  if (isEmpty) {
    return '';
  }

  return utils.isValid(date) ? utils.formatByString( // TODO: should `isValid` narrow `TDate | null` to `NonNullable<TDate>`?
  // Either we allow `TDate | null` to be valid and guard against calling `formatByString` with `null`.
  // Or we ensure `formatByString` is callable with `null`.
  date, inputFormat) : '';
};
export function pick12hOr24hFormat(userFormat, ampm, formats) {
  if (userFormat) {
    return userFormat;
  }

  if (typeof ampm === 'undefined') {
    return formats.localized;
  }

  return ampm ? formats['12h'] : formats['24h'];
}
var MASK_USER_INPUT_SYMBOL = '_';
var staticDateWith2DigitTokens = '2019-11-21T22:30:00.000';
var staticDateWith1DigitTokens = '2019-01-01T09:00:00.000';
export function checkMaskIsValidForCurrentFormat(mask, format, acceptRegex, utils) {
  var formattedDateWith1Digit = utils.formatByString(utils.date(staticDateWith1DigitTokens), format);
  var inferredFormatPatternWith1Digits = formattedDateWith1Digit.replace(acceptRegex, MASK_USER_INPUT_SYMBOL);
  var inferredFormatPatternWith2Digits = utils.formatByString(utils.date(staticDateWith2DigitTokens), format).replace(acceptRegex, '_');
  var isMaskValid = inferredFormatPatternWith2Digits === mask && inferredFormatPatternWith1Digits === mask;

  if (!isMaskValid && utils.lib !== 'luxon' && process.env.NODE_ENV !== 'production') {
    console.warn("The mask \"".concat(mask, "\" you passed is not valid for the format used ").concat(format, ". Falling down to uncontrolled not-masked input."));
  }

  return isMaskValid;
}
export var maskedDateFormatter = function maskedDateFormatter(mask, acceptRegexp) {
  return function (value) {
    return value.split('').map(function (char, i) {
      acceptRegexp.lastIndex = 0;

      if (i > mask.length - 1) {
        return '';
      }

      var maskChar = mask[i];
      var nextMaskChar = mask[i + 1];
      var acceptedChar = acceptRegexp.test(char) ? char : '';
      var formattedChar = maskChar === MASK_USER_INPUT_SYMBOL ? acceptedChar : maskChar + acceptedChar;

      if (i === value.length - 1 && nextMaskChar && nextMaskChar !== MASK_USER_INPUT_SYMBOL) {
        // when cursor at the end of mask part (e.g. month) prerender next symbol "21" -> "21/"
        return formattedChar ? formattedChar + nextMaskChar : '';
      }

      return formattedChar;
    }).join('');
  };
};