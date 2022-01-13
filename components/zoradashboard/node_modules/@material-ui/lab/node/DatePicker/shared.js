"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDatePickerDefaultizedProps = useDatePickerDefaultizedProps;
exports.isYearAndMonthViews = exports.isYearOnlyView = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _styles = require("@material-ui/core/styles");

var _useUtils = require("../internal/pickers/hooks/useUtils");

const _excluded = ["openTo", "views", "minDate", "maxDate"];

const isYearOnlyView = views => views.length === 1 && views[0] === 'year';

exports.isYearOnlyView = isYearOnlyView;

const isYearAndMonthViews = views => views.length === 2 && views.indexOf('month') !== -1 && views.indexOf('year') !== -1;

exports.isYearAndMonthViews = isYearAndMonthViews;

const getFormatAndMaskByViews = (views, utils) => {
  if (isYearOnlyView(views)) {
    return {
      mask: '____',
      inputFormat: utils.formats.year
    };
  }

  if (isYearAndMonthViews(views)) {
    return {
      disableMaskedInput: true,
      inputFormat: utils.formats.monthAndYear
    };
  }

  return {
    mask: '__/__/____',
    inputFormat: utils.formats.keyboardDate
  };
};

function useDatePickerDefaultizedProps(_ref, name) {
  let {
    openTo = 'day',
    views = ['year', 'day'],
    minDate: minDateProp,
    maxDate: maxDateProp
  } = _ref,
      other = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  const utils = (0, _useUtils.useUtils)();
  const defaultDates = (0, _useUtils.useDefaultDates)();
  const minDate = minDateProp != null ? minDateProp : defaultDates.minDate;
  const maxDate = maxDateProp != null ? maxDateProp : defaultDates.maxDate; // This is technically unsound if the type parameters appear in optional props.
  // Optional props can be filled by `useThemeProps` with types that don't match the type parameters.

  return (0, _styles.useThemeProps)({
    props: (0, _extends2.default)({
      views,
      openTo,
      minDate,
      maxDate
    }, getFormatAndMaskByViews(views, utils), other),
    name
  });
}