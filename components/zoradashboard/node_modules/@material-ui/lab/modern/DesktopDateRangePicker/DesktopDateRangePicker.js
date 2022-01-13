import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["calendars", "value", "onChange", "mask", "startText", "endText", "inputFormat", "minDate", "maxDate", "PopperProps", "TransitionComponent"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { useThemeProps } from '@material-ui/core/styles';
import DesktopTooltipWrapper from '../internal/pickers/wrappers/DesktopTooltipWrapper';
import { useDefaultDates, useUtils } from '../internal/pickers/hooks/useUtils';
import { useDateRangeValidation } from '../internal/pickers/hooks/useValidation';
import { usePickerState } from '../internal/pickers/hooks/usePickerState';
import { DateRangePickerView } from '../DateRangePicker/DateRangePickerView';
import DateRangePickerInput from '../DateRangePicker/DateRangePickerInput';
import { parseRangeInputValue } from '../internal/pickers/date-utils';
import { jsx as _jsx } from "react/jsx-runtime";
const KeyboardDateInputComponent = DateRangePickerInput;
const rangePickerValueManager = {
  emptyValue: [null, null],
  parseInput: parseRangeInputValue,
  areValuesEqual: (utils, a, b) => utils.isEqual(a[0], b[0]) && utils.isEqual(a[1], b[1])
};

/**
 *
 * Demos:
 *
 * - [Date Range Picker](https://material-ui.com/components/date-range-picker/)
 *
 * API:
 *
 * - [DesktopDateRangePicker API](https://material-ui.com/api/desktop-date-range-picker/)
 */
const DesktopDateRangePicker = /*#__PURE__*/React.forwardRef(function DesktopDateRangePicker(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDesktopDateRangePicker'
  });

  const {
    calendars = 2,
    value,
    onChange,
    mask = '__/__/____',
    startText = 'Start',
    endText = 'End',
    inputFormat: passedInputFormat,
    minDate: minDateProp,
    maxDate: maxDateProp,
    PopperProps,
    TransitionComponent
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const utils = useUtils();
  const defaultDates = useDefaultDates();
  const minDate = minDateProp ?? defaultDates.minDate;
  const maxDate = maxDateProp ?? defaultDates.maxDate;
  const [currentlySelectingRangeEnd, setCurrentlySelectingRangeEnd] = React.useState('start');

  const pickerStateProps = _extends({}, other, {
    value,
    onChange
  });

  const restProps = _extends({}, other, {
    minDate,
    maxDate
  });

  const {
    pickerProps,
    inputProps,
    wrapperProps
  } = usePickerState(pickerStateProps, rangePickerValueManager);
  const validationError = useDateRangeValidation(props);

  const DateInputProps = _extends({}, inputProps, restProps, {
    currentlySelectingRangeEnd,
    inputFormat: passedInputFormat || utils.formats.keyboardDate,
    setCurrentlySelectingRangeEnd,
    startText,
    endText,
    mask,
    validationError,
    ref
  });

  return /*#__PURE__*/_jsx(DesktopTooltipWrapper, _extends({}, wrapperProps, {
    DateInputProps: DateInputProps,
    KeyboardDateInputComponent: KeyboardDateInputComponent,
    PopperProps: PopperProps,
    TransitionComponent: TransitionComponent,
    children: /*#__PURE__*/_jsx(DateRangePickerView, _extends({
      open: wrapperProps.open,
      DateInputProps: DateInputProps,
      calendars: calendars,
      currentlySelectingRangeEnd: currentlySelectingRangeEnd,
      setCurrentlySelectingRangeEnd: setCurrentlySelectingRangeEnd,
      startText: startText,
      endText: endText
    }, pickerProps, restProps))
  }));
});
process.env.NODE_ENV !== "production" ? DesktopDateRangePicker.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * Regular expression to detect "accepted" symbols.
   * @default /\dap/gi
   */
  acceptRegex: PropTypes.instanceOf(RegExp),

  /**
   * If `true`, `onChange` is fired on click even if the same date is selected.
   * @default false
   */
  allowSameDateSelection: PropTypes.bool,

  /**
   * @ignore
   */
  autoFocus: PropTypes.bool,

  /**
   * The number of calendars that render on **desktop**.
   * @default 2
   */
  calendars: PropTypes.oneOf([1, 2, 3]),

  /**
   * @ignore
   */
  children: PropTypes.node,

  /**
   * className applied to the root component.
   */
  className: PropTypes.string,

  /**
   * The components used for each slot.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    LeftArrowButton: PropTypes.elementType,
    LeftArrowIcon: PropTypes.elementType,
    OpenPickerIcon: PropTypes.elementType,
    RightArrowButton: PropTypes.elementType,
    RightArrowIcon: PropTypes.elementType,
    SwitchViewButton: PropTypes.elementType,
    SwitchViewIcon: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: PropTypes.object,

  /**
   * Default calendar month displayed when `value={null}`.
   */
  defaultCalendarMonth: PropTypes.any,

  /**
   * If `true`, after selecting `start` date calendar will not automatically switch to the month of `end` date.
   * @default false
   */
  disableAutoMonthSwitching: PropTypes.bool,

  /**
   * If `true` the popup or dialog will immediately close after submitting full date.
   * @default `true` for Desktop, `false` for Mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
   */
  disableCloseOnSelect: PropTypes.bool,

  /**
   * If `true`, the picker and text field are disabled.
   */
  disabled: PropTypes.bool,

  /**
   * @default false
   */
  disableFuture: PropTypes.bool,

  /**
   * If `true`, todays date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: PropTypes.bool,

  /**
   * Disable mask on the keyboard, this should be used rarely. Consider passing proper mask for your format.
   * @default false
   */
  disableMaskedInput: PropTypes.bool,

  /**
   * Do not render open picker button (renders only text field with validation).
   * @default false
   */
  disableOpenPicker: PropTypes.bool,

  /**
   * @default false
   */
  disablePast: PropTypes.bool,

  /**
   * Text for end input label and toolbar placeholder.
   * @default 'End'
   */
  endText: PropTypes.node,

  /**
   * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType
   * @default (value, utils) => `Choose date, selected date is ${utils.format(utils.date(value), 'fullDate')}`
   */
  getOpenDialogAriaText: PropTypes.func,

  /**
   * Get aria-label text for switching between views button.
   */
  getViewSwitchingButtonText: PropTypes.func,

  /**
   * @ignore
   */
  ignoreInvalidInputs: PropTypes.bool,

  /**
   * Props to pass to keyboard input adornment.
   */
  InputAdornmentProps: PropTypes.object,

  /**
   * Format string.
   */
  inputFormat: PropTypes.string,

  /**
   * @ignore
   */
  InputProps: PropTypes.object,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
    current: PropTypes.object
  })]),

  /**
   * @ignore
   */
  key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * @ignore
   */
  label: PropTypes.node,

  /**
   * Left arrow icon aria-label text.
   */
  leftArrowButtonText: PropTypes.string,

  /**
   * If `true` renders `LoadingComponent` in calendar instead of calendar view.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: PropTypes.bool,

  /**
   * Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or `__/__/____ __:__ _M`).
   * @default '__/__/____'
   */
  mask: PropTypes.string,

  /**
   * Max selectable date. @DateIOType
   * @default defaultMaxDate
   */
  maxDate: PropTypes.any,

  /**
   * Min selectable date. @DateIOType
   * @default defaultMinDate
   */
  minDate: PropTypes.any,

  /**
   * Callback fired when date is accepted @DateIOType.
   */
  onAccept: PropTypes.func,

  /**
   * Callback fired when the value (the selected date range) changes @DateIOType.
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   */
  onClose: PropTypes.func,

  /**
   * Callback that fired when input value or new `value` prop validation returns **new** validation error (or value is valid after error).
   * In case of validation error detected `reason` prop return non-null value and `TextField` must be displayed in `error` state.
   * This can be used to render appropriate form error.
   *
   * [Read the guide](https://next.material-ui-pickers.dev/guides/forms) about form integration and error displaying.
   * @DateIOType
   */
  onError: PropTypes.func,

  /**
   * Callback firing on month change. @DateIOType
   */
  onMonthChange: PropTypes.func,

  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   */
  onOpen: PropTypes.func,

  /**
   * Callback fired on view change.
   */
  onViewChange: PropTypes.func,

  /**
   * Control the popup or dialog open state.
   */
  open: PropTypes.bool,

  /**
   * Props to pass to keyboard adornment button.
   */
  OpenPickerButtonProps: PropTypes.object,

  /**
   * Force rendering in particular orientation.
   */
  orientation: PropTypes.oneOf(['landscape', 'portrait']),

  /**
   * Popper props passed down to [Popper](https://material-ui.com/api/popper/) component.
   */
  PopperProps: PropTypes.object,

  /**
   * Make picker read only.
   */
  readOnly: PropTypes.bool,

  /**
   * Disable heavy animations.
   * @default typeof navigator !== 'undefined' && /(android)/i.test(navigator.userAgent)
   */
  reduceAnimations: PropTypes.bool,

  /**
   * Custom renderer for `<DateRangePicker />` days. @DateIOType
   * @example (date, dateRangePickerDayProps) => <DateRangePickerDay {...dateRangePickerDayProps} />
   */
  renderDay: PropTypes.func,

  /**
   * The `renderInput` prop allows you to customize the rendered input.
   * The `startProps` and `endProps` arguments of this render prop contains props of [TextField](https://material-ui.com/api/text-field/#textfield-api),
   * that you need to forward to the range start/end inputs respectively.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example
   * ```jsx
   * <DateRangePicker
   *  renderInput={(startProps, endProps) => (
   *   <React.Fragment>
   *     <TextField {...startProps} />
   *     <Box sx={{ mx: 2 }}> to </Box>
   *     <TextField {...endProps} />
   *   </React.Fragment>;
   *  )}
   * />
   * ````
   */
  renderInput: PropTypes.func.isRequired,

  /**
   * Component displaying when passed `loading` true.
   * @default () => <span data-mui-test="loading-progress">...</span>
   */
  renderLoading: PropTypes.func,

  /**
   * Custom formatter to be passed into Rifm component.
   */
  rifmFormatter: PropTypes.func,

  /**
   * Right arrow icon aria-label text.
   */
  rightArrowButtonText: PropTypes.string,

  /**
   * Disable specific date. @DateIOType
   */
  shouldDisableDate: PropTypes.func,

  /**
   * Disable specific years dynamically.
   * Works like `shouldDisableDate` but for year selection view @DateIOType.
   */
  shouldDisableYear: PropTypes.func,

  /**
   * If `true`, days that have `outsideCurrentMonth={true}` are displayed.
   * @default false
   */
  showDaysOutsideCurrentMonth: PropTypes.bool,

  /**
   * If `true`, show the toolbar even in desktop mode.
   */
  showToolbar: PropTypes.bool,

  /**
   * Text for start input label and toolbar placeholder.
   * @default 'Start'
   */
  startText: PropTypes.node,

  /**
   * Component that will replace default toolbar renderer.
   */
  ToolbarComponent: PropTypes.elementType,

  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat: PropTypes.string,

  /**
   * Mobile picker date value placeholder, displaying if `value` === `null`.
   * @default '–'
   */
  toolbarPlaceholder: PropTypes.node,

  /**
   * Mobile picker title, displaying in the toolbar.
   * @default 'Select date range'
   */
  toolbarTitle: PropTypes.node,

  /**
   * Custom component for popper [Transition](https://material-ui.com/components/transitions/#transitioncomponent-prop).
   */
  TransitionComponent: PropTypes.elementType,

  /**
   * The value of the date range picker.
   */
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.any, PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string])).isRequired
} : void 0;
export default DesktopDateRangePicker;