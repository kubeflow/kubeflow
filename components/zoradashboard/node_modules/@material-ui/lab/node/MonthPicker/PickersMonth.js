"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _styles = require("@material-ui/core/styles");

var _unstyled = require("@material-ui/unstyled");

var _utils = require("../internal/pickers/utils");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["disabled", "onSelect", "selected", "value"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const classes = (0, _unstyled.generateUtilityClasses)('PrivatePickersMonth', ['root', 'selected']);
const PickersMonthRoot = (0, _styles.styled)(_Typography.default, {
  skipSx: true
})(({
  theme
}) => ({
  flex: '1 0 33.33%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  height: 64,
  outline: 0,
  transition: theme.transitions.create('font-size', {
    duration: '100ms'
  }),
  '&:focus': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium
  },
  '&:disabled': {
    pointerEvents: 'none',
    color: theme.palette.text.secondary
  },
  [`&.${classes.selected}`]: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium
  }
}));
/**
 * @ignore - do not document.
 */

const PickersMonth = props => {
  const {
    disabled,
    onSelect,
    selected,
    value
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);

  const handleSelection = () => {
    onSelect(value);
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(PickersMonthRoot, (0, _extends2.default)({
    component: "button",
    className: (0, _clsx.default)(classes.root, selected && classes.selected),
    tabIndex: disabled ? -1 : 0,
    onClick: handleSelection,
    onKeyDown: (0, _utils.onSpaceOrEnter)(handleSelection),
    color: selected ? 'primary' : undefined,
    variant: selected ? 'h5' : 'subtitle1',
    disabled: disabled
  }, other));
};

var _default = PickersMonth;
exports.default = _default;