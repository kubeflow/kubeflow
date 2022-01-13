"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTextFieldAriaText = getTextFieldAriaText;
exports.pick12hOr24hFormat = pick12hOr24hFormat;
exports.checkMaskIsValidForCurrentFormat = checkMaskIsValidForCurrentFormat;
exports.maskedDateFormatter = exports.getDisplayDate = void 0;

function getTextFieldAriaText(rawValue, utils) {
  // TODO: should `isValid` narrow `TDate | null` to `NonNullable<TDate>`?
  // Either we allow `TDate | null` to be valid and guard against calling `formatByString` with `null`.
  // Or we ensure `formatByString` is callable with `null`.
  return rawValue && utils.isValid(utils.date(rawValue)) ? `Choose date, selected date is ${utils.format(utils.date(rawValue), 'fullDate')}` : 'Choose date';
}

const getDisplayDate = (utils, value, inputFormat) => {
  const date = utils.date(value);
  const isEmpty = value === null;

  if (isEmpty) {
    return '';
  }

  return utils.isValid(date) ? utils.formatByString( // TODO: should `isValid` narrow `TDate | null` to `NonNullable<TDate>`?
  // Either we allow `TDate | null` to be valid and guard against calling `formatByString` with `null`.
  // Or we ensure `formatByString` is callable with `null`.
  date, inputFormat) : '';
};

exports.getDisplayDate = getDisplayDate;

function pick12hOr24hFormat(userFormat, ampm, formats) {
  if (userFormat) {
    return userFormat;
  }

  if (typeof ampm === 'undefined') {
    return formats.localized;
  }

  return ampm ? formats['12h'] : formats['24h'];
}

const MASK_USER_INPUT_SYMBOL = '_';
const staticDateWith2DigitTokens = '2019-11-21T22:30:00.000';
const staticDateWith1DigitTokens = '2019-01-01T09:00:00.000';

function checkMaskIsValidForCurrentFormat(mask, format, acceptRegex, utils) {
  const formattedDateWith1Digit = utils.formatByString(utils.date(staticDateWith1DigitTokens), format);
  const inferredFormatPatternWith1Digits = formattedDateWith1Digit.replace(acceptRegex, MASK_USER_INPUT_SYMBOL);
  const inferredFormatPatternWith2Digits = utils.formatByString(utils.date(staticDateWith2DigitTokens), format).replace(acceptRegex, '_');
  const isMaskValid = inferredFormatPatternWith2Digits === mask && inferredFormatPatternWith1Digits === mask;

  if (!isMaskValid && utils.lib !== 'luxon' && process.env.NODE_ENV !== 'production') {
    console.warn(`The mask "${mask}" you passed is not valid for the format used ${format}. Falling down to uncontrolled not-masked input.`);
  }

  return isMaskValid;
}

const maskedDateFormatter = (mask, acceptRegexp) => value => {
  return value.split('').map((char, i) => {
    acceptRegexp.lastIndex = 0;

    if (i > mask.length - 1) {
      return '';
    }

    const maskChar = mask[i];
    const nextMaskChar = mask[i + 1];
    const acceptedChar = acceptRegexp.test(char) ? char : '';
    const formattedChar = maskChar === MASK_USER_INPUT_SYMBOL ? acceptedChar : maskChar + acceptedChar;

    if (i === value.length - 1 && nextMaskChar && nextMaskChar !== MASK_USER_INPUT_SYMBOL) {
      // when cursor at the end of mask part (e.g. month) prerender next symbol "21" -> "21/"
      return formattedChar ? formattedChar + nextMaskChar : '';
    }

    return formattedChar;
  }).join('');
};

exports.maskedDateFormatter = maskedDateFormatter;