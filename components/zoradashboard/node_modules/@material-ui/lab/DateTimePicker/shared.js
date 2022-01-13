import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["ampm", "inputFormat", "maxDate", "maxDateTime", "maxTime", "minDate", "minDateTime", "minTime", "openTo", "orientation", "views"];
import { useThemeProps } from '@material-ui/core/styles';
import { useDefaultDates, useUtils } from '../internal/pickers/hooks/useUtils';
import { pick12hOr24hFormat } from '../internal/pickers/text-field-helper';
export function useDateTimePickerDefaultizedProps(_ref, name) {
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
      other = _objectWithoutPropertiesLoose(_ref, _excluded);

  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const minDate = minDateProp != null ? minDateProp : defaultDates.minDate;
  const maxDate = maxDateProp != null ? maxDateProp : defaultDates.maxDate;
  const willUseAmPm = ampm != null ? ampm : utils.is12HourCycleInCurrentLocale();

  if (orientation !== 'portrait') {
    throw new Error('We are not supporting custom orientation for DateTimePicker yet :(');
  }

  return useThemeProps({
    props: _extends({
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
      inputFormat: pick12hOr24hFormat(inputFormat, willUseAmPm, {
        localized: utils.formats.keyboardDateTime,
        '12h': utils.formats.keyboardDateTime12h,
        '24h': utils.formats.keyboardDateTime24h
      })
    }, other),
    name
  });
}