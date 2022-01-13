"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _Paper = _interopRequireDefault(require("../Paper"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _LinearProgress = _interopRequireDefault(require("../LinearProgress"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _mobileStepperClasses = require("./mobileStepperClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["activeStep", "backButton", "className", "LinearProgressProps", "nextButton", "position", "steps", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    position
  } = styleProps;
  const slots = {
    root: ['root', `position${(0, _capitalize.default)(position)}`],
    dots: ['dots'],
    dot: ['dot'],
    dotActive: ['dotActive'],
    progress: ['progress']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _mobileStepperClasses.getMobileStepperUtilityClass, classes);
};

const MobileStepperRoot = (0, _styled.default)(_Paper.default, {
  name: 'MuiMobileStepper',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[`position${(0, _capitalize.default)(styleProps.position)}`]];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: theme.palette.background.default,
  padding: 8
}, styleProps.position === 'bottom' && {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.mobileStepper
}, styleProps.position === 'top' && {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.mobileStepper
}));
const MobileStepperDots = (0, _styled.default)('div', {
  name: 'MuiMobileStepper',
  slot: 'Dots',
  overridesResolver: (props, styles) => styles.dots
})(({
  styleProps
}) => (0, _extends2.default)({}, styleProps.variant === 'dots' && {
  display: 'flex',
  flexDirection: 'row'
}));
const MobileStepperDot = (0, _styled.default)('div', {
  name: 'MuiMobileStepper',
  slot: 'Dot',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.dot, styleProps.dotActive && styles.dotActive];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({}, styleProps.variant === 'dots' && (0, _extends2.default)({
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest
  }),
  backgroundColor: theme.palette.action.disabled,
  borderRadius: '50%',
  width: 8,
  height: 8,
  margin: '0 2px'
}, styleProps.dotActive && {
  backgroundColor: theme.palette.primary.main
})));
const MobileStepperProgress = (0, _styled.default)(_LinearProgress.default, {
  name: 'MuiMobileStepper',
  slot: 'Progress',
  overridesResolver: (props, styles) => styles.progress
})(({
  styleProps
}) => (0, _extends2.default)({}, styleProps.variant === 'progress' && {
  width: '50%'
}));
const MobileStepper = /*#__PURE__*/React.forwardRef(function MobileStepper(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiMobileStepper'
  });
  const {
    activeStep = 0,
    backButton,
    className,
    LinearProgressProps,
    nextButton,
    position = 'bottom',
    steps,
    variant = 'dots'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    activeStep,
    position,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(MobileStepperRoot, (0, _extends2.default)({
    square: true,
    elevation: 0,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: [backButton, variant === 'text' && /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
      children: [activeStep + 1, " / ", steps]
    }), variant === 'dots' && /*#__PURE__*/(0, _jsxRuntime.jsx)(MobileStepperDots, {
      styleProps: styleProps,
      className: classes.dots,
      children: [...new Array(steps)].map((_, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(MobileStepperDot, {
        className: (0, _clsx.default)(classes.dot, index === activeStep && classes.dotActive),
        styleProps: (0, _extends2.default)({}, styleProps, {
          dotActive: index === activeStep
        })
      }, index))
    }), variant === 'progress' && /*#__PURE__*/(0, _jsxRuntime.jsx)(MobileStepperProgress, (0, _extends2.default)({
      styleProps: styleProps,
      className: classes.progress,
      variant: "determinate",
      value: Math.ceil(activeStep / (steps - 1) * 100)
    }, LinearProgressProps)), nextButton]
  }));
});
process.env.NODE_ENV !== "production" ? MobileStepper.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the variant is 'dots'.
   * @default 0
   */
  activeStep: _utils.integerPropType,

  /**
   * A back button element. For instance, it can be a `Button` or an `IconButton`.
   */
  backButton: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Props applied to the `LinearProgress` element.
   */
  LinearProgressProps: _propTypes.default.object,

  /**
   * A next button element. For instance, it can be a `Button` or an `IconButton`.
   */
  nextButton: _propTypes.default.node,

  /**
   * Set the positioning type.
   * @default 'bottom'
   */
  position: _propTypes.default.oneOf(['bottom', 'static', 'top']),

  /**
   * The total steps.
   */
  steps: _utils.integerPropType.isRequired,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The variant to use.
   * @default 'dots'
   */
  variant: _propTypes.default.oneOf(['dots', 'progress', 'text'])
} : void 0;
var _default = MobileStepper;
exports.default = _default;