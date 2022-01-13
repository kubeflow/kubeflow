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

var _system = require("@material-ui/system");

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _circularProgressClasses = require("./circularProgressClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "color", "disableShrink", "size", "style", "thickness", "value", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const SIZE = 44;
const circularRotateKeyframe = (0, _system.keyframes)`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;
const circularDashKeyframe = (0, _system.keyframes)`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;

const useUtilityClasses = styleProps => {
  const {
    classes,
    variant,
    color,
    disableShrink
  } = styleProps;
  const slots = {
    root: ['root', variant, `color${(0, _capitalize.default)(color)}`],
    svg: ['svg'],
    circle: ['circle', `circle${(0, _capitalize.default)(variant)}`, disableShrink && 'circleDisableShrink']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _circularProgressClasses.getCircularProgressUtilityClass, classes);
};

const CircularProgressRoot = (0, _styled.default)('span', {
  name: 'MuiCircularProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[styleProps.variant], styles[`color${(0, _capitalize.default)(styleProps.color)}`]];
  }
})(({
  styleProps,
  theme
}) => (0, _extends2.default)({
  display: 'inline-block'
}, styleProps.variant === 'determinate' && {
  transition: theme.transitions.create('transform')
}, styleProps.color !== 'inherit' && {
  color: theme.palette[styleProps.color].main
}), ({
  styleProps
}) => styleProps.variant === 'indeterminate' && (0, _system.css)`
      animation: ${circularRotateKeyframe} 1.4s linear infinite;
    `);
const CircularProgressSVG = (0, _styled.default)('svg', {
  name: 'MuiCircularProgress',
  slot: 'Svg',
  overridesResolver: (props, styles) => styles.svg
})({
  display: 'block' // Keeps the progress centered

});
const CircularProgressCircle = (0, _styled.default)('circle', {
  name: 'MuiCircularProgress',
  slot: 'Circle',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.circle, styles[`circle${(0, _capitalize.default)(styleProps.variant)}`], styleProps.disableShrink && styles.circleDisableShrink];
  }
})(({
  styleProps,
  theme
}) => (0, _extends2.default)({
  stroke: 'currentColor'
}, styleProps.variant === 'determinate' && {
  transition: theme.transitions.create('stroke-dashoffset')
}, styleProps.variant === 'indeterminate' && {
  // Some default value that looks fine waiting for the animation to kicks in.
  strokeDasharray: '80px, 200px',
  strokeDashoffset: 0 // Add the unit to fix a Edge 16 and below bug.

}), ({
  styleProps
}) => styleProps.variant === 'indeterminate' && !styleProps.disableShrink && (0, _system.css)`
      animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
    `);
/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */

const CircularProgress = /*#__PURE__*/React.forwardRef(function CircularProgress(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiCircularProgress'
  });
  const {
    className,
    color = 'primary',
    disableShrink = false,
    size = 40,
    style,
    thickness = 3.6,
    value = 0,
    variant = 'indeterminate'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    color,
    disableShrink,
    size,
    thickness,
    value,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  const circleStyle = {};
  const rootStyle = {};
  const rootProps = {};

  if (variant === 'determinate') {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootProps['aria-valuenow'] = Math.round(value);
    circleStyle.strokeDashoffset = `${((100 - value) / 100 * circumference).toFixed(3)}px`;
    rootStyle.transform = 'rotate(-90deg)';
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(CircularProgressRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    style: (0, _extends2.default)({
      width: size,
      height: size
    }, rootStyle, style),
    styleProps: styleProps,
    ref: ref,
    role: "progressbar"
  }, rootProps, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(CircularProgressSVG, {
      className: classes.svg,
      styleProps: styleProps,
      viewBox: `${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(CircularProgressCircle, {
        className: classes.circle,
        style: circleStyle,
        styleProps: styleProps,
        cx: SIZE,
        cy: SIZE,
        r: (SIZE - thickness) / 2,
        fill: "none",
        strokeWidth: thickness
      })
    })
  }));
});
process.env.NODE_ENV !== "production" ? CircularProgress.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['inherit', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), _propTypes.default.string]),

  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  disableShrink: (0, _utils.chainPropTypes)(_propTypes.default.bool, props => {
    if (props.disableShrink && props.variant && props.variant !== 'indeterminate') {
      return new Error('Material-UI: You have provided the `disableShrink` prop ' + 'with a variant other than `indeterminate`. This will have no effect.');
    }

    return null;
  }),

  /**
   * The size of the component.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, e.g '3rem'.
   * @default 40
   */
  size: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * @ignore
   */
  style: _propTypes.default.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The thickness of the circle.
   * @default 3.6
   */
  thickness: _propTypes.default.number,

  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: _propTypes.default.number,

  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   * @default 'indeterminate'
   */
  variant: _propTypes.default.oneOf(['determinate', 'indeterminate'])
} : void 0;
var _default = CircularProgress;
exports.default = _default;