import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { useThemeProps } from '@material-ui/core/styles';
import { useDefaultDates, useUtils } from '../internal/pickers/hooks/useUtils';
import { pick12hOr24hFormat } from '../internal/pickers/text-field-helper';
export function useDateTimePickerDefaultizedProps(_ref, name) {
  var ampm = _ref.ampm,
      inputFormat = _ref.inputFormat,
      maxDateProp = _ref.maxDate,
      maxDateTime = _ref.maxDateTime,
      maxTime = _ref.maxTime,
      minDateProp = _ref.minDate,
      minDateTime = _ref.minDateTime,
      minTime = _ref.minTime,
      _ref$openTo = _ref.openTo,
      openTo = _ref$openTo === void 0 ? 'day' : _ref$openTo,
      _ref$orientation = _ref.orientation,
      orientation = _ref$orientation === void 0 ? 'portrait' : _ref$orientation,
      _ref$views = _ref.views,
      views = _ref$views === void 0 ? ['year', 'day', 'hours', 'minutes'] : _ref$views,
      other = _objectWithoutProperties(_ref, ["ampm", "inputFormat", "maxDate", "maxDateTime", "maxTime", "minDate", "minDateTime", "minTime", "openTo", "orientation", "views"]);

  var utils = useUtils();
  var defaultDates = useDefaultDates();
  var minDate = minDateProp != null ? minDateProp : defaultDates.minDate;
  var maxDate = maxDateProp != null ? maxDateProp : defaultDates.maxDate;
  var willUseAmPm = ampm != null ? ampm : utils.is12HourCycleInCurrentLocale();

  if (orientation !== 'portrait') {
    throw new Error('We are not supporting custom orientation for DateTimePicker yet :(');
  }

  return useThemeProps({
    props: _extends({
      openTo: openTo,
      views: views,
      ampm: willUseAmPm,
      ampmInClock: true,
      orientation: orientation,
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
    name: name
  });
}