"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDateTimePickerDefaultizedProps = useDateTimePickerDefaultizedProps;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _styles = require("@material-ui/core/styles");

var _useUtils = require("../internal/pickers/hooks/useUtils");

var _textFieldHelper = require("../internal/pickers/text-field-helper");

const _excluded = ["ampm", "inputFormat", "maxDate", "maxDateTime", "maxTime", "minDate", "minDateTime", "minTime", "openTo", "orientation", "views"];

function useDateTimePickerDefaultizedProps(_ref, name) {
  let {
    ampm,
    inputFormat,
    maxDate: maxDateProp,
    maxDateTime,
    maxTime,
    minDate: minDateProp,
    minDateTime,
    minTime,
    openTo = 'day',
    orientation = 'portrait',
    views = ['year', 'day', 'hours', 'minutes']
  } = _ref,
      other = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  const utils = (0, _useUtils.useUtils)();
  const defaultDates = (0, _useUtils.useDefaultDates)();
  const minDate = minDateProp != null ? minDateProp : defaultDates.minDate;
  const maxDate = maxDateProp != null ? maxDateProp : defaultDates.maxDate;
  const willUseAmPm = ampm != null ? ampm : utils.is12HourCycleInCurrentLocale();

  if (orientation !== 'portrait') {
    throw new Error('We are not supporting custom orientation for DateTimePicker yet :(');
  }

  return (0, _styles.useThemeProps)({
    props: (0, _extends2.default)({
      openTo,
      views,
      ampm: willUseAmPm,
      ampmInClock: true,
      orientation,
      showToolbar: true,
      allowSameDateSelection: true,
      minDate: minDateTime != null ? minDateTime : minDate,
      minTime: minDateTime != null ? minDateTime : minTime,
      maxDate: maxDateTime != null ? maxDateTime : maxDate,
      maxTime: maxDateTime != null ? maxDateTime : maxTime,
      disableIgnoringDatePartForTimeValidation: Boolean(minDateTime || maxDateTime),
      acceptRegex: willUseAmPm ? /[\dap]/gi : /\d/gi,
      mask: '__/__/____ __:__',
      disableMaskedInput: willUseAmPm,
      inputFormat: (0, _textFieldHelper.pick12hOr24hFormat)(inputFormat, willUseAmPm, {
        localized: utils.formats.keyboardDateTime,
        '12h': utils.formats.keyboardDateTime12h,
        '24h': utils.formats.keyboardDateTime24h
      })
    }, other),
    name
  });
}