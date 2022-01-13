"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNextMonthDisabled = useNextMonthDisabled;
exports.usePreviousMonthDisabled = usePreviousMonthDisabled;
exports.useMeridiemMode = useMeridiemMode;

var React = _interopRequireWildcard(require("react"));

var _useUtils = require("./useUtils");

var _timeUtils = require("../time-utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useNextMonthDisabled(month, {
  disableFuture,
  maxDate
}) {
  const utils = (0, _useUtils.useUtils)();
  return React.useMemo(() => {
    const now = utils.date();
    const lastEnabledMonth = utils.startOfMonth(disableFuture && utils.isBefore(now, maxDate) ? now : maxDate);
    return !utils.isAfter(lastEnabledMonth, month);
  }, [disableFuture, maxDate, month, utils]);
}

function usePreviousMonthDisabled(month, {
  disablePast,
  minDate
}) {
  const utils = (0, _useUtils.useUtils)();
  return React.useMemo(() => {
    const now = utils.date();
    const firstEnabledMonth = utils.startOfMonth(disablePast && utils.isAfter(now, minDate) ? now : minDate);
    return !utils.isBefore(firstEnabledMonth, month);
  }, [disablePast, minDate, month, utils]);
}

function useMeridiemMode(date, ampm, onChange) {
  const utils = (0, _useUtils.useUtils)();
  const meridiemMode = (0, _timeUtils.getMeridiem)(date, utils);
  const handleMeridiemChange = React.useCallback(mode => {
    const timeWithMeridiem = (0, _timeUtils.convertToMeridiem)(date, mode, Boolean(ampm), utils);
    onChange(timeWithMeridiem, 'shallow');
  }, [ampm, date, onChange, utils]);
  return {
    meridiemMode,
    handleMeridiemChange
  };
}