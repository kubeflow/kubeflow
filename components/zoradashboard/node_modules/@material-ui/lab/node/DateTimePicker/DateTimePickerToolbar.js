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

var _unstyled = require("@material-ui/unstyled");

var _PickersToolbarText = _interopRequireDefault(require("../internal/pickers/PickersToolbarText"));

var _PickersToolbar = _interopRequireDefault(require("../internal/pickers/PickersToolbar"));

var _PickersToolbarButton = _interopRequireDefault(require("../internal/pickers/PickersToolbarButton"));

var _DateTimePickerTabs = _interopRequireDefault(require("./DateTimePickerTabs"));

var _useUtils = require("../internal/pickers/hooks/useUtils");

var _WrapperVariantContext = require("../internal/pickers/wrappers/WrapperVariantContext");

var _jsxRuntime = require("react/jsx-runtime");

var _DateTimePickerToolba;

const _excluded = ["ampm", "date", "dateRangeIcon", "hideTabs", "isMobileKeyboardViewOpen", "onChange", "openView", "setOpenView", "timeIcon", "toggleMobileKeyboardView", "toolbarFormat", "toolbarPlaceholder", "toolbarTitle"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classes = (0, _unstyled.generateUtilityClasses)('PrivateDateTimePickerToolbar', ['penIcon']);
const DateTimePickerToolbarRoot = (0, _styles.styled)(_PickersToolbar.default, {
  skipSx: true
})({
  paddingLeft: 16,
  paddingRight: 16,
  justifyContent: 'space-around',
  [`& .${classes.penIcon}`]: {
    position: 'absolute',
    top: 8,
    right: 8
  }
});
const DateTimePickerToolbarDateContainer = (0, _styles.styled)('div', {
  skipSx: true
})({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start'
});
const DateTimePickerToolbarTimeContainer = (0, _styles.styled)('div', {
  skipSx: true
})({
  display: 'flex'
});
const DateTimePickerToolbarSeparator = (0, _styles.styled)(_PickersToolbarText.default, {
  skipSx: true
})({
  margin: '0 4px 0 2px',
  cursor: 'default'
});
/**
 * @ignore - internal component.
 */

const DateTimePickerToolbar = props => {
  const {
    ampm,
    date,
    dateRangeIcon,
    hideTabs,
    isMobileKeyboardViewOpen,
    openView,
    setOpenView,
    timeIcon,
    toggleMobileKeyboardView,
    toolbarFormat,
    toolbarPlaceholder = '––',
    toolbarTitle = 'Select date & time'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const utils = (0, _useUtils.useUtils)();
  const wrapperVariant = React.useContext(_WrapperVariantContext.WrapperVariantContext);
  const showTabs = wrapperVariant === 'desktop' ? true : !hideTabs && typeof window !== 'undefined' && window.innerHeight > 667;

  const formatHours = time => ampm ? utils.format(time, 'hours12h') : utils.format(time, 'hours24h');

  const dateText = React.useMemo(() => {
    if (!date) {
      return toolbarPlaceholder;
    }

    if (toolbarFormat) {
      return utils.formatByString(date, toolbarFormat);
    }

    return utils.format(date, 'shortDate');
  }, [date, toolbarFormat, toolbarPlaceholder, utils]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [wrapperVariant !== 'desktop' && /*#__PURE__*/(0, _jsxRuntime.jsxs)(DateTimePickerToolbarRoot, (0, _extends2.default)({
      toolbarTitle: toolbarTitle,
      penIconClassName: classes.penIcon,
      isMobileKeyboardViewOpen: isMobileKeyboardViewOpen,
      toggleMobileKeyboardView: toggleMobileKeyboardView
    }, other, {
      isLandscape: false,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(DateTimePickerToolbarDateContainer, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersToolbarButton.default, {
          tabIndex: -1,
          variant: "subtitle1",
          onClick: () => setOpenView('year'),
          selected: openView === 'year',
          value: date ? utils.format(date, 'year') : '–'
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersToolbarButton.default, {
          tabIndex: -1,
          variant: "h4",
          onClick: () => setOpenView('day'),
          selected: openView === 'day',
          value: dateText
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(DateTimePickerToolbarTimeContainer, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersToolbarButton.default, {
          variant: "h3",
          onClick: () => setOpenView('hours'),
          selected: openView === 'hours',
          value: date ? formatHours(date) : '--'
        }), _DateTimePickerToolba || (_DateTimePickerToolba = /*#__PURE__*/(0, _jsxRuntime.jsx)(DateTimePickerToolbarSeparator, {
          variant: "h3",
          value: ":"
        })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PickersToolbarButton.default, {
          variant: "h3",
          onClick: () => setOpenView('minutes'),
          selected: openView === 'minutes',
          value: date ? utils.format(date, 'minutes') : '--'
        })]
      })]
    })), showTabs && /*#__PURE__*/(0, _jsxRuntime.jsx)(_DateTimePickerTabs.default, {
      dateRangeIcon: dateRangeIcon,
      timeIcon: timeIcon,
      view: openView,
      onChange: setOpenView
    })]
  });
};

var _default = DateTimePickerToolbar;
exports.default = _default;