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

var _StepIcon = _interopRequireDefault(require("../StepIcon"));

var _StepperContext = _interopRequireDefault(require("../Stepper/StepperContext"));

var _StepContext = _interopRequireDefault(require("../Step/StepContext"));

var _stepLabelClasses = _interopRequireWildcard(require("./stepLabelClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "componentsProps", "error", "icon", "optional", "StepIconComponent", "StepIconProps"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    orientation,
    active,
    completed,
    error,
    disabled,
    alternativeLabel
  } = styleProps;
  const slots = {
    root: ['root', orientation, error && 'error', disabled && 'disabled', alternativeLabel && 'alternativeLabel'],
    label: ['label', active && 'active', completed && 'completed', error && 'error', disabled && 'disabled', alternativeLabel && 'alternativeLabel'],
    iconContainer: ['iconContainer', alternativeLabel && 'alternativeLabel'],
    labelContainer: ['labelContainer']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _stepLabelClasses.getStepLabelUtilityClass, classes);
};

const StepLabelRoot = (0, _styled.default)('span', {
  name: 'MuiStepLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[styleProps.orientation]];
  }
})(({
  styleProps
}) => (0, _extends2.default)({
  display: 'flex',
  alignItems: 'center',
  [`&.${_stepLabelClasses.default.alternativeLabel}`]: {
    flexDirection: 'column'
  },
  [`&.${_stepLabelClasses.default.disabled}`]: {
    cursor: 'default'
  }
}, styleProps.orientation === 'vertical' && {
  textAlign: 'left',
  padding: '8px 0'
}));
const StepLabelLabel = (0, _styled.default)('span', {
  name: 'MuiStepLabel',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label
})(({
  theme
}) => (0, _extends2.default)({}, theme.typography.body2, {
  display: 'block',
  transition: theme.transitions.create('color', {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${_stepLabelClasses.default.active}`]: {
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  [`&.${_stepLabelClasses.default.completed}`]: {
    color: theme.palette.text.primary,
    fontWeight: 500
  },
  [`&.${_stepLabelClasses.default.alternativeLabel}`]: {
    textAlign: 'center',
    marginTop: 16
  },
  [`&.${_stepLabelClasses.default.error}`]: {
    color: theme.palette.error.main
  }
}));
const StepLabelIconContainer = (0, _styled.default)('span', {
  name: 'MuiStepLabel',
  slot: 'IconContainer',
  overridesResolver: (props, styles) => styles.iconContainer
})(() => ({
  flexShrink: 0,
  // Fix IE11 issue
  display: 'flex',
  paddingRight: 8,
  [`&.${_stepLabelClasses.default.alternativeLabel}`]: {
    paddingRight: 0
  }
}));
const StepLabelLabelContainer = (0, _styled.default)('span', {
  name: 'MuiStepLabel',
  slot: 'LabelContainer',
  overridesResolver: (props, styles) => styles.labelContainer
})(({
  theme
}) => ({
  width: '100%',
  color: theme.palette.text.secondary
}));
const StepLabel = /*#__PURE__*/React.forwardRef(function StepLabel(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiStepLabel'
  });
  const {
    children,
    className,
    componentsProps = {},
    error = false,
    icon: iconProp,
    optional,
    StepIconComponent: StepIconComponentProp,
    StepIconProps
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    alternativeLabel,
    orientation
  } = React.useContext(_StepperContext.default);
  const {
    active,
    disabled,
    completed,
    icon: iconContext
  } = React.useContext(_StepContext.default);
  const icon = iconProp || iconContext;
  let StepIconComponent = StepIconComponentProp;

  if (icon && !StepIconComponent) {
    StepIconComponent = _StepIcon.default;
  }

  const styleProps = (0, _extends2.default)({}, props, {
    active,
    alternativeLabel,
    completed,
    disabled,
    error,
    orientation
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(StepLabelRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: [icon || StepIconComponent ? /*#__PURE__*/(0, _jsxRuntime.jsx)(StepLabelIconContainer, {
      className: classes.iconContainer,
      styleProps: styleProps,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(StepIconComponent, (0, _extends2.default)({
        completed: completed,
        active: active,
        error: error,
        icon: icon
      }, StepIconProps))
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsxs)(StepLabelLabelContainer, {
      className: classes.labelContainer,
      styleProps: styleProps,
      children: [children ? /*#__PURE__*/(0, _jsxRuntime.jsx)(StepLabelLabel, (0, _extends2.default)({
        className: classes.label,
        styleProps: styleProps
      }, componentsProps.label, {
        children: children
      })) : null, optional]
    })]
  }));
});
process.env.NODE_ENV !== "production" ? StepLabel.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * In most cases will simply be a string containing a title for the label.
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
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: _propTypes.default.object,

  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error: _propTypes.default.bool,

  /**
   * Override the default label of the step icon.
   */
  icon: _propTypes.default.node,

  /**
   * The optional node to display.
   */
  optional: _propTypes.default.node,

  /**
   * The component to render in place of the [`StepIcon`](/api/step-icon/).
   */
  StepIconComponent: _propTypes.default.elementType,

  /**
   * Props applied to the [`StepIcon`](/api/step-icon/) element.
   */
  StepIconProps: _propTypes.default.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
StepLabel.muiName = 'StepLabel';
var _default = StepLabel;
exports.default = _default;