"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTimePickerDefaultizedProps = useTimePickerDefaultizedProps;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _styles = require("@material-ui/core/styles");

var _Clock = _interopRequireDefault(require("../internal/svg-icons/Clock"));

var _textFieldHelper = require("../internal/pickers/text-field-helper");

var _useUtils = require("../internal/pickers/hooks/useUtils");

const _excluded = ["ampm", "components", "inputFormat", "openTo", "views"];

function getTextFieldAriaText(value, utils) {
  return value && utils.isValid(utils.date(value)) ? `Choose time, selected time is ${utils.format(utils.date(value), 'fullTime')}` : 'Choose time';
}

function useTimePickerDefaultizedProps(_ref, name) {
  let {
    ampm,
    components,
    inputFormat,
    openTo = 'hours',
    views = ['hours', 'minutes']
  } = _ref,
      other = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  const utils = (0, _useUtils.useUtils)();
  const willUseAmPm = ampm != null ? ampm : utils.is12HourCycleInCurrentLocale();
  return (0, _styles.useThemeProps)({
    props: (0, _extends2.default)({
      views,
      openTo,
      ampm: willUseAmPm,
      acceptRegex: willUseAmPm ? /[\dapAP]/gi : /\d/gi,
      mask: '__:__',
      disableMaskedInput: willUseAmPm,
      getOpenDialogAriaText: getTextFieldAriaText,
      components: (0, _extends2.default)({
        OpenPickerIcon: _Clock.default
      }, components),
      inputFormat: (0, _textFieldHelper.pick12hOr24hFormat)(inputFormat, willUseAmPm, {
        localized: utils.formats.fullTime,
        '12h': utils.formats.fullTime12h,
        '24h': utils.formats.fullTime24h
      })
    }, other),
    name
  });
}