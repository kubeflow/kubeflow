import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { useThemeProps } from '@material-ui/core/styles';
import ClockIcon from '../internal/svg-icons/Clock';
import { pick12hOr24hFormat } from '../internal/pickers/text-field-helper';
import { useUtils } from '../internal/pickers/hooks/useUtils';

function getTextFieldAriaText(value, utils) {
  return value && utils.isValid(utils.date(value)) ? "Choose time, selected time is ".concat(utils.format(utils.date(value), 'fullTime')) : 'Choose time';
}

export function useTimePickerDefaultizedProps(_ref, name) {
  var ampm = _ref.ampm,
      components = _ref.components,
      inputFormat = _ref.inputFormat,
      _ref$openTo = _ref.openTo,
      openTo = _ref$openTo === void 0 ? 'hours' : _ref$openTo,
      _ref$views = _ref.views,
      views = _ref$views === void 0 ? ['hours', 'minutes'] : _ref$views,
      other = _objectWithoutProperties(_ref, ["ampm", "components", "inputFormat", "openTo", "views"]);

  var utils = useUtils();
  var willUseAmPm = ampm != null ? ampm : utils.is12HourCycleInCurrentLocale();
  return useThemeProps({
    props: _extends({
      views: views,
      openTo: openTo,
      ampm: willUseAmPm,
      acceptRegex: willUseAmPm ? /[\dapAP]/gi : /\d/gi,
      mask: '__:__',
      disableMaskedInput: willUseAmPm,
      getOpenDialogAriaText: getTextFieldAriaText,
      components: _extends({
        OpenPickerIcon: ClockIcon
      }, components),
      inputFormat: pick12hOr24hFormat(inputFormat, willUseAmPm, {
        localized: utils.formats.fullTime,
        '12h': utils.formats.fullTime12h,
        '24h': utils.formats.fullTime24h
      })
    }, other),
    name: name
  });
}