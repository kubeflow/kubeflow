"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateRangePickerViewMobile = DateRangePickerViewMobile;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _PickersCalendarHeader = _interopRequireDefault(require("../CalendarPicker/PickersCalendarHeader"));

var _DateRangePickerDay = _interopRequireDefault(require("../DateRangePickerDay"));

var _useUtils = require("../internal/pickers/hooks/useUtils");

var _PickersCalendar = _interopRequireDefault(require("../CalendarPicker/PickersCalendar"));

var _dateUtils = require("../internal/pickers/date-utils");

var _utils = require("../internal/pickers/utils");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["changeMonth", "components", "componentsProps", "date", "leftArrowButtonText", "maxDate", "minDate", "onChange", "renderDay", "rightArrowButtonText"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const onlyDayView = ['day'];
/**
 * @ignore - internal component.
 */

function DateRangePickerViewMobile(props) {
  const {
    changeMonth,
    components,
    componentsProps,
    date,
    leftArrowButtonText,
    maxDate: maxDateProp,
    minDate: minDateProp,
    onChange,
    renderDay = (_, dayProps) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateRangePickerDay.default, (0, _extends2.default)({}, dayProps)),
    rightArrowButtonText
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const utils = (0, _useUtils.useUtils)();
  const defaultDates = (0, _useUtils.useDefaultDates)();
  const minDate = minDateProp != null ? minDateProp : defaultDates.minDate;
  const maxDate = maxDateProp != null ? maxDateProp : defaultDates.maxDate;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersCalendarHeader.default, (0, _extends2.default)({
      components: components,
      componentsProps: componentsProps,
      leftArrowButtonText: leftArrowButtonText,
      maxDate: maxDate,
      minDate: minDate,
      onMonthChange: changeMonth,
      openView: "day",
      rightArrowButtonText: rightArrowButtonText,
      views: onlyDayView
    }, other)), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersCalendar.default, (0, _extends2.default)({}, other, {
      date: date,
      onChange: onChange,
      onFocusedDayChange: _utils.doNothing,
      renderDay: (day, _, DayProps) => renderDay(day, (0, _extends2.default)({
        isPreviewing: false,
        isStartOfPreviewing: false,
        isEndOfPreviewing: false,
        isHighlighting: (0, _dateUtils.isWithinRange)(utils, day, date),
        isStartOfHighlighting: (0, _dateUtils.isStartOfRange)(utils, day, date),
        isEndOfHighlighting: (0, _dateUtils.isEndOfRange)(utils, day, date)
      }, DayProps))
    }))]
  });
}