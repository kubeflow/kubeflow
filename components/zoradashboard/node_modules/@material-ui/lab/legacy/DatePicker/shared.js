import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { useThemeProps } from '@material-ui/core/styles';
import { useDefaultDates, useUtils } from '../internal/pickers/hooks/useUtils';
export var isYearOnlyView = function isYearOnlyView(views) {
  return views.length === 1 && views[0] === 'year';
};
export var isYearAndMonthViews = function isYearAndMonthViews(views) {
  return views.length === 2 && views.indexOf('month') !== -1 && views.indexOf('year') !== -1;
};

var getFormatAndMaskByViews = function getFormatAndMaskByViews(views, utils) {
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

export function useDatePickerDefaultizedProps(_ref, name) {
  var _ref$openTo = _ref.openTo,
      openTo = _ref$openTo === void 0 ? 'day' : _ref$openTo,
      _ref$views = _ref.views,
      views = _ref$views === void 0 ? ['year', 'day'] : _ref$views,
      minDateProp = _ref.minDate,
      maxDateProp = _ref.maxDate,
      other = _objectWithoutProperties(_ref, ["openTo", "views", "minDate", "maxDate"]);

  var utils = useUtils();
  var defaultDates = useDefaultDates();
  var minDate = minDateProp != null ? minDateProp : defaultDates.minDate;
  var maxDate = maxDateProp != null ? maxDateProp : defaultDates.maxDate; // This is technically unsound if the type parameters appear in optional props.
  // Optional props can be filled by `useThemeProps` with types that don't match the type parameters.

  return useThemeProps({
    props: _extends({
      views: views,
      openTo: openTo,
      minDate: minDate,
      maxDate: maxDate
    }, getFormatAndMaskByViews(views, utils), other),
    name: name
  });
}