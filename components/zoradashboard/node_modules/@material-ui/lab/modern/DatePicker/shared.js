import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["openTo", "views", "minDate", "maxDate"];
import { useThemeProps } from '@material-ui/core/styles';
import { useDefaultDates, useUtils } from '../internal/pickers/hooks/useUtils';
export const isYearOnlyView = views => views.length === 1 && views[0] === 'year';
export const isYearAndMonthViews = views => views.length === 2 && views.indexOf('month') !== -1 && views.indexOf('year') !== -1;

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

export function useDatePickerDefaultizedProps(_ref, name) {
  let {
    openTo = 'day',
    views = ['year', 'day'],
    minDate: minDateProp,
    maxDate: maxDateProp
  } = _ref,
      other = _objectWithoutPropertiesLoose(_ref, _excluded);

  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const minDate = minDateProp ?? defaultDates.minDate;
  const maxDate = maxDateProp ?? defaultDates.maxDate; // This is technically unsound if the type parameters appear in optional props.
  // Optional props can be filled by `useThemeProps` with types that don't match the type parameters.

  return useThemeProps({
    props: _extends({
      views,
      openTo,
      minDate,
      maxDate
    }, getFormatAndMaskByViews(views, utils), other),
    name
  });
}