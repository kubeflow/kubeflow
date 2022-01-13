"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTimeValidation = useTimeValidation;
exports.useDateValidation = useDateValidation;
exports.useDateTimeValidation = useDateTimeValidation;
exports.useDateRangeValidation = useDateRangeValidation;

var React = _interopRequireWildcard(require("react"));

var _useUtils = require("./useUtils");

var _dateUtils = require("../date-utils");

var _dateTimeUtils = require("../date-time-utils");

var _timeUtils = require("../time-utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function isSameDateOrTimeError(a, b) {
  return a === b;
}

function isSameDateRangeError(a, b) {
  return b !== null && a[1] === b[1] && a[0] === b[0];
}

function useValidation(props, validate, isSameError = isSameDateOrTimeError) {
  const {
    value,
    onError
  } = props;
  const utils = (0, _useUtils.useUtils)();
  const previousValidationErrorRef = React.useRef(null);
  const validationError = validate(utils, value, props);
  React.useEffect(() => {
    if (onError && !isSameError(validationError, previousValidationErrorRef.current)) {
      onError(validationError, value);
    }

    previousValidationErrorRef.current = validationError;
  }, [isSameError, onError, previousValidationErrorRef, validationError, value]);
  return validationError;
}

function useTimeValidation(props) {
  return useValidation(props, _timeUtils.validateTime, isSameDateOrTimeError);
}

function useDateValidation(props) {
  return useValidation(props, _dateUtils.validateDate, isSameDateOrTimeError);
}

function useDateTimeValidation(props) {
  return useValidation(props, _dateTimeUtils.validateDateTime, isSameDateOrTimeError);
}

function useDateRangeValidation(props) {
  return useValidation(props, _dateUtils.validateDateRange, isSameDateRangeError);
}