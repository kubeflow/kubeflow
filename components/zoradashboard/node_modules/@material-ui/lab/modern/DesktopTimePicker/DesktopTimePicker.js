import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["onChange", "PopperProps", "ToolbarComponent", "TransitionComponent", "value"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTimePickerDefaultizedProps } from '../TimePicker/shared';
import TimePickerToolbar from '../TimePicker/TimePickerToolbar';
import DesktopWrapper from '../internal/pickers/wrappers/DesktopWrapper';
import Picker from '../internal/pickers/Picker/Picker';
import { useTimeValidation } from '../internal/pickers/hooks/useValidation';
import { parsePickerInputValue } from '../internal/pickers/date-utils';
import { KeyboardDateInput } from '../internal/pickers/KeyboardDateInput';
import { usePickerState } from '../internal/pickers/hooks/usePickerState';
import { jsx as _jsx } from "react/jsx-runtime";
const valueManager = {
  emptyValue: null,
  parseInput: parsePickerInputValue,
  areValuesEqual: (utils, a, b) => utils.isEqual(a, b)
};

/**
 *
 * Demos:
 *
 * - [Time Picker](https://material-ui.com/components/time-picker/)
 *
 * API:
 *
 * - [DesktopTimePicker API](https://material-ui.com/api/desktop-time-picker/)
 */
const DesktopTimePicker = /*#__PURE__*/React.forwardRef(function DesktopTimePicker(inProps, ref) {
  // TODO: TDate needs to be instantiated at every usage.
  const props = useTimePickerDefaultizedProps(inProps, 'MuiDesktopTimePicker');
  const validationError = useTimeValidation(props) !== null;
  const {
    pickerProps,
    inputProps,
    wrapperProps
  } = usePickerState(props, valueManager);

  const {
    PopperProps,
    ToolbarComponent = TimePickerToolbar,
    TransitionComponent
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const DateInputProps = _extends({}, inputProps, other, {
    ref,
    validationError
  });

  return /*#__PURE__*/_jsx(DesktopWrapper, _extends({}, wrapperProps, {
    DateInputProps: DateInputProps,
    KeyboardDateInputComponent: KeyboardDateInput,
    PopperProps: PopperProps,
    TransitionComponent: TransitionComponent,
    children: /*#__PURE__*/_jsx(Picker, _extends({}, pickerProps, {
      autoFocus: true,
      toolbarTitle: props.label || props.toolbarTitle,
      ToolbarComponent: ToolbarComponent,
      DateInputProps: DateInputProps
    }, other))
  }));
});
process.env.NODE_ENV !== "production" ? DesktopTimePicker.propTypes
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
   * 12h/24h view for hour selection clock.
   * @default false
   */
  ampm: PropTypes.bool,

  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   * @default false
   */
  ampmInClock: PropTypes.bool,

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
   */
  components: PropTypes.shape({
    OpenPickerIcon: PropTypes.elementType
  }),

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
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: PropTypes.bool,

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
   * Accessible text that helps user to understand which time and view is selected.
   * @default <TDate extends any>(
   *   view: ClockView,
   *   time: TDate | null,
   *   adapter: MuiPickersAdapter<TDate>,
   * ) =>
   *   `Select ${view}. ${
   *     time === null ? 'No time selected' : `Selected time is ${adapter.format(time, 'fullTime')}`
   *   }`
   */
  getClockLabelText: PropTypes.func,

  /**
   * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType
   * @default (value, utils) => `Choose date, selected date is ${utils.format(utils.date(value), 'fullDate')}`
   */
  getOpenDialogAriaText: PropTypes.func,

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
   * Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or `__/__/____ __:__ _M`).
   */
  mask: PropTypes.string,

  /**
   * Max time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  maxTime: PropTypes.any,

  /**
   * Min time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  minTime: PropTypes.any,

  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: PropTypes.number,

  /**
   * Callback fired when date is accepted @DateIOType.
   */
  onAccept: PropTypes.func,

  /**
   * Callback fired when the value (the selected date) changes @DateIOType.
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
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   */
  onOpen: PropTypes.func,

  /**
   * Control the popup or dialog open state.
   */
  open: PropTypes.bool,

  /**
   * Props to pass to keyboard adornment button.
   */
  OpenPickerButtonProps: PropTypes.object,

  /**
   * First view to show.
   */
  openTo: PropTypes.oneOf(['hours', 'minutes', 'seconds']),

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
   * The `renderInput` prop allows you to customize the rendered input.
   * The `props` argument of this render prop contains props of [TextField](https://material-ui.com/api/text-field/#textfield-api) that you need to forward.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example ```jsx
   * renderInput={props => <TextField {...props} />}
   * ````
   */
  renderInput: PropTypes.func.isRequired,

  /**
   * Custom formatter to be passed into Rifm component.
   */
  rifmFormatter: PropTypes.func,

  /**
   * Dynamically check if time is disabled or not.
   * If returns `false` appropriate time point will ot be acceptable.
   */
  shouldDisableTime: PropTypes.func,

  /**
   * If `true`, show the toolbar even in desktop mode.
   */
  showToolbar: PropTypes.bool,

  /**
   * Component that will replace default toolbar renderer.
   * @default TimePickerToolbar
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
   * @default 'Select time'
   */
  toolbarTitle: PropTypes.node,

  /**
   * Custom component for popper [Transition](https://material-ui.com/components/transitions/#transitioncomponent-prop).
   */
  TransitionComponent: PropTypes.elementType,

  /**
   * The value of the picker.
   */
  value: PropTypes.oneOfType([PropTypes.any, PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),

  /**
   * Array of views to show.
   */
  views: PropTypes.arrayOf(PropTypes.oneOf(['hours', 'minutes', 'seconds']).isRequired)
} : void 0;
export default DesktopTimePicker;