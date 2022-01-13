"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shared = require("../TimePicker/shared");

var _TimePickerToolbar = _interopRequireDefault(require("../TimePicker/TimePickerToolbar"));

var _MobileWrapper = _interopRequireDefault(require("../internal/pickers/wrappers/MobileWrapper"));

var _Picker = _interopRequireDefault(require("../internal/pickers/Picker/Picker"));

var _useValidation = require("../internal/pickers/hooks/useValidation");

var _dateUtils = require("../internal/pickers/date-utils");

var _PureDateInput = require("../internal/pickers/PureDateInput");

var _usePickerState = require("../internal/pickers/hooks/usePickerState");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["ToolbarComponent", "value", "onChange"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const valueManager = {
  emptyValue: null,
  parseInput: _dateUtils.parsePickerInputValue,
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
 * - [MobileTimePicker API](https://material-ui.com/api/mobile-time-picker/)
 */
const MobileTimePicker = /*#__PURE__*/React.forwardRef(function MobileTimePicker(inProps, ref) {
  // TODO: TDate needs to be instantiated at every usage.
  const props = (0, _shared.useTimePickerDefaultizedProps)(inProps, 'MuiMobileTimePicker');
  const validationError = (0, _useValidation.useTimeValidation)(props) !== null;
  const {
    pickerProps,
    inputProps,
    wrapperProps
  } = (0, _usePickerState.usePickerState)(props, valueManager); // Note that we are passing down all the value without spread.
  // It saves us >1kb gzip and make any prop available automatically on any level down.

  const {
    ToolbarComponent = _TimePickerToolbar.default
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const DateInputProps = (0, _extends2.default)({}, inputProps, other, {
    ref,
    validationError
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MobileWrapper.default, (0, _extends2.default)({}, other, wrapperProps, {
    DateInputProps: DateInputProps,
    PureDateInputComponent: _PureDateInput.PureDateInput,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Picker.default, (0, _extends2.default)({}, pickerProps, {
      autoFocus: true,
      toolbarTitle: props.label || props.toolbarTitle,
      ToolbarComponent: ToolbarComponent,
      DateInputProps: DateInputProps
    }, other))
  }));
});
process.env.NODE_ENV !== "production" ? MobileTimePicker.propTypes
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
  acceptRegex: _propTypes.default.instanceOf(RegExp),

  /**
   * 12h/24h view for hour selection clock.
   * @default false
   */
  ampm: _propTypes.default.bool,

  /**
   * Display ampm controls under the clock (instead of in the toolbar).
   * @default false
   */
  ampmInClock: _propTypes.default.bool,

  /**
   * Cancel text message.
   * @default 'Cancel'
   */
  cancelText: _propTypes.default.node,

  /**
   * @ignore
   */
  children: _propTypes.default.node,

  /**
   * className applied to the root component.
   */
  className: _propTypes.default.string,

  /**
   * If `true`, it shows the clear action in the picker dialog.
   * @default false
   */
  clearable: _propTypes.default.bool,

  /**
   * Clear text message.
   * @default 'Clear'
   */
  clearText: _propTypes.default.node,

  /**
   * The components used for each slot.
   * Either a string to use a HTML element or a component.
   */
  components: _propTypes.default.shape({
    OpenPickerIcon: _propTypes.default.elementType
  }),

  /**
   * Props applied to the [`Dialog`](/api/dialog/) element.
   */
  DialogProps: _propTypes.default.object,

  /**
   * If `true` the popup or dialog will immediately close after submitting full date.
   * @default `true` for Desktop, `false` for Mobile (based on the chosen wrapper and `desktopModeMediaQuery` prop).
   */
  disableCloseOnSelect: _propTypes.default.bool,

  /**
   * If `true`, the picker and text field are disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * Do not ignore date part when validating min/max time.
   * @default false
   */
  disableIgnoringDatePartForTimeValidation: _propTypes.default.bool,

  /**
   * Disable mask on the keyboard, this should be used rarely. Consider passing proper mask for your format.
   * @default false
   */
  disableMaskedInput: _propTypes.default.bool,

  /**
   * Do not render open picker button (renders only text field with validation).
   * @default false
   */
  disableOpenPicker: _propTypes.default.bool,

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
  getClockLabelText: _propTypes.default.func,

  /**
   * Get aria-label text for control that opens picker dialog. Aria-label text must include selected date. @DateIOType
   * @default (value, utils) => `Choose date, selected date is ${utils.format(utils.date(value), 'fullDate')}`
   */
  getOpenDialogAriaText: _propTypes.default.func,

  /**
   * @ignore
   */
  ignoreInvalidInputs: _propTypes.default.bool,

  /**
   * Props to pass to keyboard input adornment.
   */
  InputAdornmentProps: _propTypes.default.object,

  /**
   * Format string.
   */
  inputFormat: _propTypes.default.string,

  /**
   * @ignore
   */
  InputProps: _propTypes.default.object,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.object
  })]),

  /**
   * @ignore
   */
  key: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * @ignore
   */
  label: _propTypes.default.node,

  /**
   * Custom mask. Can be used to override generate from format. (e.g. `__/__/____ __:__` or `__/__/____ __:__ _M`).
   */
  mask: _propTypes.default.string,

  /**
   * Max time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  maxTime: _propTypes.default.any,

  /**
   * Min time acceptable time.
   * For input validation date part of passed object will be ignored if `disableIgnoringDatePartForTimeValidation` not specified.
   */
  minTime: _propTypes.default.any,

  /**
   * Step over minutes.
   * @default 1
   */
  minutesStep: _propTypes.default.number,

  /**
   * Ok button text.
   * @default 'OK'
   */
  okText: _propTypes.default.node,

  /**
   * Callback fired when date is accepted @DateIOType.
   */
  onAccept: _propTypes.default.func,

  /**
   * Callback fired when the value (the selected date) changes @DateIOType.
   */
  onChange: _propTypes.default.func.isRequired,

  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   */
  onClose: _propTypes.default.func,

  /**
   * Callback that fired when input value or new `value` prop validation returns **new** validation error (or value is valid after error).
   * In case of validation error detected `reason` prop return non-null value and `TextField` must be displayed in `error` state.
   * This can be used to render appropriate form error.
   *
   * [Read the guide](https://next.material-ui-pickers.dev/guides/forms) about form integration and error displaying.
   * @DateIOType
   */
  onError: _propTypes.default.func,

  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   */
  onOpen: _propTypes.default.func,

  /**
   * Control the popup or dialog open state.
   */
  open: _propTypes.default.bool,

  /**
   * Props to pass to keyboard adornment button.
   */
  OpenPickerButtonProps: _propTypes.default.object,

  /**
   * First view to show.
   */
  openTo: _propTypes.default.oneOf(['hours', 'minutes', 'seconds']),

  /**
   * Force rendering in particular orientation.
   */
  orientation: _propTypes.default.oneOf(['landscape', 'portrait']),

  /**
   * Make picker read only.
   */
  readOnly: _propTypes.default.bool,

  /**
   * The `renderInput` prop allows you to customize the rendered input.
   * The `props` argument of this render prop contains props of [TextField](https://material-ui.com/api/text-field/#textfield-api) that you need to forward.
   * Pay specific attention to the `ref` and `inputProps` keys.
   * @example ```jsx
   * renderInput={props => <TextField {...props} />}
   * ````
   */
  renderInput: _propTypes.default.func.isRequired,

  /**
   * Custom formatter to be passed into Rifm component.
   */
  rifmFormatter: _propTypes.default.func,

  /**
   * Dynamically check if time is disabled or not.
   * If returns `false` appropriate time point will ot be acceptable.
   */
  shouldDisableTime: _propTypes.default.func,

  /**
   * If `true`, the today button is displayed. **Note** that `showClearButton` has a higher priority.
   * @default false
   */
  showTodayButton: _propTypes.default.bool,

  /**
   * If `true`, show the toolbar even in desktop mode.
   */
  showToolbar: _propTypes.default.bool,

  /**
   * Today text message.
   * @default 'Today'
   */
  todayText: _propTypes.default.node,

  /**
   * Component that will replace default toolbar renderer.
   * @default TimePickerToolbar
   */
  ToolbarComponent: _propTypes.default.elementType,

  /**
   * Date format, that is displaying in toolbar.
   */
  toolbarFormat: _propTypes.default.string,

  /**
   * Mobile picker date value placeholder, displaying if `value` === `null`.
   * @default '–'
   */
  toolbarPlaceholder: _propTypes.default.node,

  /**
   * Mobile picker title, displaying in the toolbar.
   * @default 'Select time'
   */
  toolbarTitle: _propTypes.default.node,

  /**
   * The value of the picker.
   */
  value: _propTypes.default.oneOfType([_propTypes.default.any, _propTypes.default.instanceOf(Date), _propTypes.default.number, _propTypes.default.string]),

  /**
   * Array of views to show.
   */
  views: _propTypes.default.arrayOf(_propTypes.default.oneOf(['hours', 'minutes', 'seconds']).isRequired)
} : void 0;
var _default = MobileTimePicker;
exports.default = _default;