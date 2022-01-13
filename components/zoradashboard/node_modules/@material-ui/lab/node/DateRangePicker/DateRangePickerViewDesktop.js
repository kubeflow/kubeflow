"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _useUtils = require("../internal/pickers/hooks/useUtils");

var _dateRangeManager = require("./date-range-manager");

var _PickersCalendar = _interopRequireDefault(require("../CalendarPicker/PickersCalendar"));

var _DateRangePickerDay = _interopRequireDefault(require("../DateRangePickerDay"));

var _PickersArrowSwitcher = _interopRequireDefault(require("../internal/pickers/PickersArrowSwitcher"));

var _dateHelpersHooks = require("../internal/pickers/hooks/date-helpers-hooks");

var _dateUtils = require("../internal/pickers/date-utils");

var _utils = require("../internal/pickers/utils");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["calendars", "changeMonth", "components", "componentsProps", "currentlySelectingRangeEnd", "currentMonth", "date", "disableFuture", "disablePast", "leftArrowButtonText", "maxDate", "minDate", "onChange", "renderDay", "rightArrowButtonText"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DateRangePickerViewDesktopRoot = (0, _styles.styled)('div', {
  skipSx: true
})({
  display: 'flex',
  flexDirection: 'row'
});
const DateRangePickerViewDesktopContainer = (0, _styles.styled)('div', {
  skipSx: true
})(({
  theme
}) => ({
  '&:not(:last-of-type)': {
    borderRight: `2px solid ${theme.palette.divider}`
  }
}));
const DateRangePickerViewDesktopCalendar = (0, _styles.styled)(_PickersCalendar.default, {
  skipSx: true
})({
  minWidth: 312,
  minHeight: 288
});
const DateRangePickerViewDesktopArrowSwitcher = (0, _styles.styled)(_PickersArrowSwitcher.default, {
  skipSx: true
})({
  padding: '16px 16px 8px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
});

function getCalendarsArray(calendars) {
  switch (calendars) {
    case 1:
      return [0];

    case 2:
      return [0, 0];

    case 3:
      return [0, 0, 0];
    // this will not work in IE11, but allows to support any amount of calendars

    default:
      return new Array(calendars).fill(0);
  }
}
/**
 * @ignore - internal component.
 */


function DateRangePickerViewDesktop(props) {
  const {
    calendars,
    changeMonth,
    components,
    componentsProps,
    currentlySelectingRangeEnd,
    currentMonth,
    date,
    disableFuture,
    disablePast,
    leftArrowButtonText = 'Previous month',
    maxDate: maxDateProp,
    minDate: minDateProp,
    onChange,
    renderDay = (_, dateRangeProps) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateRangePickerDay.default, (0, _extends2.default)({}, dateRangeProps)),
    rightArrowButtonText = 'Next month'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const utils = (0, _useUtils.useUtils)();
  const defaultDates = (0, _useUtils.useDefaultDates)();
  const minDate = minDateProp != null ? minDateProp : defaultDates.minDate;
  const maxDate = maxDateProp != null ? maxDateProp : defaultDates.maxDate;
  const [rangePreviewDay, setRangePreviewDay] = React.useState(null);
  const isNextMonthDisabled = (0, _dateHelpersHooks.useNextMonthDisabled)(currentMonth, {
    disableFuture,
    maxDate
  });
  const isPreviousMonthDisabled = (0, _dateHelpersHooks.usePreviousMonthDisabled)(currentMonth, {
    disablePast,
    minDate
  });
  const previewingRange = (0, _dateRangeManager.calculateRangePreview)({
    utils,
    range: date,
    newDate: rangePreviewDay,
    currentlySelectingRangeEnd
  });
  const handleDayChange = React.useCallback(day => {
    setRangePreviewDay(null);
    onChange(day);
  }, [onChange]);

  const handlePreviewDayChange = newPreviewRequest => {
    if (!(0, _dateUtils.isWithinRange)(utils, newPreviewRequest, date)) {
      setRangePreviewDay(newPreviewRequest);
    } else {
      setRangePreviewDay(null);
    }
  };

  const CalendarTransitionProps = React.useMemo(() => ({
    onMouseLeave: () => setRangePreviewDay(null)
  }), []);
  const selectNextMonth = React.useCallback(() => {
    changeMonth(utils.getNextMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);
  const selectPreviousMonth = React.useCallback(() => {
    changeMonth(utils.getPreviousMonth(currentMonth));
  }, [changeMonth, currentMonth, utils]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DateRangePickerViewDesktopRoot, {
    children: getCalendarsArray(calendars).map((_, index) => {
      const monthOnIteration = utils.setMonth(currentMonth, utils.getMonth(currentMonth) + index);
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(DateRangePickerViewDesktopContainer, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(DateRangePickerViewDesktopArrowSwitcher, {
          onLeftClick: selectPreviousMonth,
          onRightClick: selectNextMonth,
          isLeftHidden: index !== 0,
          isRightHidden: index !== calendars - 1,
          isLeftDisabled: isPreviousMonthDisabled,
          isRightDisabled: isNextMonthDisabled,
          leftArrowButtonText: leftArrowButtonText,
          components: components,
          componentsProps: componentsProps,
          rightArrowButtonText: rightArrowButtonText,
          children: utils.format(monthOnIteration, 'monthAndYear')
        }), /*#__PURE__*/(0, React.createElement)(DateRangePickerViewDesktopCalendar, (0, _extends2.default)({}, other, {
          key: index,
          date: date,
          onFocusedDayChange: _utils.doNothing,
          onChange: handleDayChange,
          currentMonth: monthOnIteration,
          TransitionProps: CalendarTransitionProps,
          renderDay: (day, __, DayProps) => renderDay(day, (0, _extends2.default)({
            isPreviewing: (0, _dateUtils.isWithinRange)(utils, day, previewingRange),
            isStartOfPreviewing: (0, _dateUtils.isStartOfRange)(utils, day, previewingRange),
            isEndOfPreviewing: (0, _dateUtils.isEndOfRange)(utils, day, previewingRange),
            isHighlighting: (0, _dateUtils.isWithinRange)(utils, day, date),
            isStartOfHighlighting: (0, _dateUtils.isStartOfRange)(utils, day, date),
            isEndOfHighlighting: (0, _dateUtils.isEndOfRange)(utils, day, date),
            onMouseEnter: () => handlePreviewDayChange(day)
          }, DayProps))
        }))]
      }, index);
    })
  });
}

var _default = DateRangePickerViewDesktop;
exports.default = _default;