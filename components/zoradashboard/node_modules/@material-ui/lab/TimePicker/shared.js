import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["ampm", "components", "inputFormat", "openTo", "views"];
import { useThemeProps } from '@material-ui/core/styles';
import ClockIcon from '../internal/svg-icons/Clock';
import { pick12hOr24hFormat } from '../internal/pickers/text-field-helper';
import { useUtils } from '../internal/pickers/hooks/useUtils';

function getTextFieldAriaText(value, utils) {
  return value && utils.isValid(utils.date(value)) ? `Choose time, selected time is ${utils.format(utils.date(value), 'fullTime')}` : 'Choose time';
}

export function useTimePickerDefaultizedProps(_ref, name) {
  let {
    ampm,
    components,
    inputFormat,
    openTo = 'hours',
    views = ['hours', 'minutes']
  } = _ref,
      other = _objectWithoutPropertiesLoose(_ref, _excluded);

  const utils = useUtils();
  const willUseAmPm = ampm != null ? ampm : utils.is12HourCycleInCurrentLocale();
  return useThemeProps({
    props: _extends({
      views,
      openTo,
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
    name
  });
}