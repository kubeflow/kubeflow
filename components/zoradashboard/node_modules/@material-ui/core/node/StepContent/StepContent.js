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

var _Collapse = _interopRequireDefault(require("../Collapse"));

var _StepperContext = _interopRequireDefault(require("../Stepper/StepperContext"));

var _StepContext = _interopRequireDefault(require("../Step/StepContext"));

var _stepContentClasses = require("./stepContentClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "TransitionComponent", "transitionDuration", "TransitionProps"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    last
  } = styleProps;
  const slots = {
    root: ['root', last && 'last'],
    transition: ['transition']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _stepContentClasses.getStepContentUtilityClass, classes);
};

const StepContentRoot = (0, _styled.default)('div', {
  name: 'MuiStepContent',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styleProps.last && styles.last];
  }
})(({
  styleProps,
  theme
}) => (0, _extends2.default)({
  marginLeft: 12,
  // half icon
  paddingLeft: 8 + 12,
  // margin + half icon
  paddingRight: 8,
  borderLeft: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]}`
}, styleProps.last && {
  borderLeft: 'none'
}));
const StepContentTransition = (0, _styled.default)(_Collapse.default, {
  name: 'MuiStepContent',
  slot: 'Transition',
  overridesResolver: (props, styles) => styles.transition
})({});
const StepContent = /*#__PURE__*/React.forwardRef(function StepContent(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiStepContent'
  });
  const {
    children,
    className,
    TransitionComponent = _Collapse.default,
    transitionDuration: transitionDurationProp = 'auto',
    TransitionProps
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    orientation
  } = React.useContext(_StepperContext.default);
  const {
    active,
    last,
    expanded
  } = React.useContext(_StepContext.default);
  const styleProps = (0, _extends2.default)({}, props, {
    last
  });
  const classes = useUtilityClasses(styleProps);

  if (process.env.NODE_ENV !== 'production') {
    if (orientation !== 'vertical') {
      console.error('Material-UI: <StepContent /> is only designed for use with the vertical stepper.');
    }
  }

  let transitionDuration = transitionDurationProp;

  if (transitionDurationProp === 'auto' && !TransitionComponent.muiSupportAuto) {
    transitionDuration = undefined;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(StepContentRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(StepContentTransition, (0, _extends2.default)({
      as: TransitionComponent,
      in: active || expanded,
      className: classes.transition,
      styleProps: styleProps,
      timeout: transitionDuration,
      unmountOnExit: true
    }, TransitionProps, {
      children: children
    }))
  }));
});
process.env.NODE_ENV !== "production" ? StepContent.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  TransitionComponent: _propTypes.default.elementType,

  /**
   * Adjust the duration of the content expand transition.
   * Passed as a prop to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number, _propTypes.default.shape({
    appear: _propTypes.default.number,
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })]),

  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps: _propTypes.default.object
} : void 0;
var _default = StepContent;
exports.default = _default;