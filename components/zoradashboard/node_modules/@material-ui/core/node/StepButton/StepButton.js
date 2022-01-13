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

var _unstyled = require("@material-ui/unstyled");

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _StepLabel = _interopRequireDefault(require("../StepLabel"));

var _isMuiElement = _interopRequireDefault(require("../utils/isMuiElement"));

var _StepperContext = _interopRequireDefault(require("../Stepper/StepperContext"));

var _StepContext = _interopRequireDefault(require("../Step/StepContext"));

var _stepButtonClasses = _interopRequireWildcard(require("./stepButtonClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "icon", "optional"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    orientation
  } = styleProps;
  const slots = {
    root: ['root', orientation],
    touchRipple: ['touchRipple']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _stepButtonClasses.getStepButtonUtilityClass, classes);
};

const StepButtonRoot = (0, _styled.default)(_ButtonBase.default, {
  name: 'MuiStepButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [{
      [`& .${_stepButtonClasses.default.touchRipple}`]: styles.touchRipple
    }, styles.root, styles[styleProps.orientation]];
  }
})(({
  styleProps
}) => (0, _extends2.default)({
  width: '100%',
  padding: '24px 16px',
  margin: '-24px -16px',
  boxSizing: 'content-box'
}, styleProps.orientation === 'vertical' && {
  justifyContent: 'flex-start',
  padding: '8px',
  margin: '-8px'
}, {
  [`& .${_stepButtonClasses.default.touchRipple}`]: {
    color: 'rgba(0, 0, 0, 0.3)'
  }
}));
const StepButton = /*#__PURE__*/React.forwardRef(function StepButton(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiStepButton'
  });
  const {
    children,
    className,
    icon,
    optional
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    disabled
  } = React.useContext(_StepContext.default);
  const {
    orientation
  } = React.useContext(_StepperContext.default);
  const styleProps = (0, _extends2.default)({}, props, {
    orientation
  });
  const classes = useUtilityClasses(styleProps);
  const childProps = {
    icon,
    optional
  };
  const child = (0, _isMuiElement.default)(children, ['StepLabel']) ? /*#__PURE__*/React.cloneElement(children, childProps) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_StepLabel.default, (0, _extends2.default)({}, childProps, {
    children: children
  }));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(StepButtonRoot, (0, _extends2.default)({
    focusRipple: true,
    disabled: disabled,
    TouchRippleProps: {
      className: classes.touchRipple
    },
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: child
  }));
});
process.env.NODE_ENV !== "production" ? StepButton.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The icon displayed by the step label.
   */
  icon: _propTypes.default.node,

  /**
   * The optional node to display.
   */
  optional: _propTypes.default.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = StepButton;
exports.default = _default;