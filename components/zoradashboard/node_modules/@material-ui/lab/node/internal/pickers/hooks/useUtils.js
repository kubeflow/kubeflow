"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUtils = useUtils;
exports.useDefaultDates = useDefaultDates;
exports.useNow = useNow;

var _utils = require("@material-ui/utils");

var React = _interopRequireWildcard(require("react"));

var _LocalizationProvider = require("../../../LocalizationProvider");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useLocalizationContext() {
  const localization = React.useContext(_LocalizationProvider.MuiPickersAdapterContext);

  if (localization === null) {
    throw new Error(process.env.NODE_ENV !== "production" ? `Can not find utils in context. It looks like you forgot to wrap your component in LocalizationProvider, or pass dateAdapter prop directly.` : (0, _utils.formatMuiErrorMessage)(13));
  }

  return localization;
}

function useUtils() {
  return useLocalizationContext().utils;
}

function useDefaultDates() {
  return useLocalizationContext().defaultDates;
}

function useNow() {
  const utils = useUtils();
  const now = React.useRef(utils.date());
  return now.current;
}