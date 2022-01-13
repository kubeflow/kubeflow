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

var _system = require("@material-ui/system");

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _linearProgressClasses = require("./linearProgressClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "color", "value", "valueBuffer", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const TRANSITION_DURATION = 4; // seconds

const indeterminate1Keyframe = (0, _system.keyframes)`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`;
const indeterminate2Keyframe = (0, _system.keyframes)`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`;
const bufferKeyframe = (0, _system.keyframes)`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`;

const useUtilityClasses = styleProps => {
  const {
    classes,
    variant,
    color
  } = styleProps;
  const slots = {
    root: ['root', `color${(0, _capitalize.default)(color)}`, variant],
    dashed: ['dashed', `dashedColor${(0, _capitalize.default)(color)}`],
    bar1: ['bar', `barColor${(0, _capitalize.default)(color)}`, (variant === 'indeterminate' || variant === 'query') && 'bar1Indeterminate', variant === 'determinate' && 'bar1Determinate', variant === 'buffer' && 'bar1Buffer'],
    bar2: ['bar', variant !== 'buffer' && `barColor${(0, _capitalize.default)(color)}`, variant === 'buffer' && `color${(0, _capitalize.default)(color)}`, (variant === 'indeterminate' || variant === 'query') && 'bar2Indeterminate', variant === 'buffer' && 'bar2Buffer']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _linearProgressClasses.getLinearProgressUtilityClass, classes);
};

const getColorShade = (theme, color) => {
  if (color === 'inherit') {
    return 'currentColor';
  }

  return theme.palette.mode === 'light' ? (0, _system.lighten)(theme.palette[color].main, 0.62) : (0, _system.darken)(theme.palette[color].main, 0.5);
};

const LinearProgressRoot = (0, _styled.default)('span', {
  name: 'MuiLinearProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[`color${(0, _capitalize.default)(styleProps.color)}`], styles[styleProps.variant]];
  }
})(({
  styleProps,
  theme
}) => (0, _extends2.default)({
  position: 'relative',
  overflow: 'hidden',
  display: 'block',
  height: 4,
  zIndex: 0,
  // Fix Safari's bug during composition of different paint.
  '@media print': {
    colorAdjust: 'exact'
  },
  backgroundColor: getColorShade(theme, styleProps.color)
}, styleProps.color === 'inherit' && styleProps.variant !== 'buffer' && {
  backgroundColor: 'none',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'currentColor',
    opacity: 0.3
  }
}, styleProps.variant === 'buffer' && {
  backgroundColor: 'transparent'
}, styleProps.variant === 'query' && {
  transform: 'rotate(180deg)'
}));
const LinearProgressDashed = (0, _styled.default)('span', {
  name: 'MuiLinearProgress',
  slot: 'Dashed',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.dashed, styles[`dashedColor${(0, _capitalize.default)(styleProps.color)}`]];
  }
})(({
  styleProps,
  theme
}) => {
  const backgroundColor = getColorShade(theme, styleProps.color);
  return (0, _extends2.default)({
    position: 'absolute',
    marginTop: 0,
    height: '100%',
    width: '100%'
  }, styleProps.color === 'inherit' && {
    opacity: 0.3
  }, {
    backgroundImage: `radial-gradient(${backgroundColor} 0%, ${backgroundColor} 16%, transparent 42%)`,
    backgroundSize: '10px 10px',
    backgroundPosition: '0 -23px'
  });
}, (0, _system.css)`
    animation: ${bufferKeyframe} 3s infinite linear;
  `);
const LinearProgressBar1 = (0, _styled.default)('span', {
  name: 'MuiLinearProgress',
  slot: 'Bar1',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.bar, styles[`barColor${(0, _capitalize.default)(styleProps.color)}`], (styleProps.variant === 'indeterminate' || styleProps.variant === 'query') && styles.bar1Indeterminate, styleProps.variant === 'determinate' && styles.bar1Determinate, styleProps.variant === 'buffer' && styles.bar1Buffer];
  }
})(({
  styleProps,
  theme
}) => (0, _extends2.default)({
  width: '100%',
  position: 'absolute',
  left: 0,
  bottom: 0,
  top: 0,
  transition: 'transform 0.2s linear',
  transformOrigin: 'left',
  backgroundColor: styleProps.color === 'inherit' ? 'currentColor' : theme.palette[styleProps.color].main
}, styleProps.variant === 'determinate' && {
  transition: `transform .${TRANSITION_DURATION}s linear`
}, styleProps.variant === 'buffer' && {
  zIndex: 1,
  transition: `transform .${TRANSITION_DURATION}s linear`
}), ({
  styleProps
}) => (styleProps.variant === 'indeterminate' || styleProps.variant === 'query') && (0, _system.css)`
      width: auto;
      animation: ${indeterminate1Keyframe} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `);
const LinearProgressBar2 = (0, _styled.default)('span', {
  name: 'MuiLinearProgress',
  slot: 'Bar2',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.bar, styles[`barColor${(0, _capitalize.default)(styleProps.color)}`], (styleProps.variant === 'indeterminate' || styleProps.variant === 'query') && styles.bar2Indeterminate, styleProps.variant === 'buffer' && styles.bar2Buffer];
  }
})(({
  styleProps,
  theme
}) => (0, _extends2.default)({
  width: '100%',
  position: 'absolute',
  left: 0,
  bottom: 0,
  top: 0,
  transition: 'transform 0.2s linear',
  transformOrigin: 'left'
}, styleProps.variant !== 'buffer' && {
  backgroundColor: styleProps.color === 'inherit' ? 'currentColor' : theme.palette[styleProps.color].main
}, styleProps.color === 'inherit' && {
  opacity: 0.3
}, styleProps.variant === 'buffer' && {
  backgroundColor: getColorShade(theme, styleProps.color),
  transition: `transform .${TRANSITION_DURATION}s linear`
}), ({
  styleProps
}) => (styleProps.variant === 'indeterminate' || styleProps.variant === 'query') && (0, _system.css)`
      width: auto;
      animation: ${indeterminate2Keyframe} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `);
/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */

const LinearProgress = /*#__PURE__*/React.forwardRef(function LinearProgress(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiLinearProgress'
  });
  const {
    className,
    color = 'primary',
    value,
    valueBuffer,
    variant = 'indeterminate'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    color,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  const theme = (0, _useTheme.default)();
  const rootProps = {};
  const inlineStyles = {
    bar1: {},
    bar2: {}
  };

  if (variant === 'determinate' || variant === 'buffer') {
    if (value !== undefined) {
      rootProps['aria-valuenow'] = Math.round(value);
      rootProps['aria-valuemin'] = 0;
      rootProps['aria-valuemax'] = 100;
      let transform = value - 100;

      if (theme.direction === 'rtl') {
        transform = -transform;
      }

      inlineStyles.bar1.transform = `translateX(${transform}%)`;
    } else if (process.env.NODE_ENV !== 'production') {
      console.error('Material-UI: You need to provide a value prop ' + 'when using the determinate or buffer variant of LinearProgress .');
    }
  }

  if (variant === 'buffer') {
    if (valueBuffer !== undefined) {
      let transform = (valueBuffer || 0) - 100;

      if (theme.direction === 'rtl') {
        transform = -transform;
      }

      inlineStyles.bar2.transform = `translateX(${transform}%)`;
    } else if (process.env.NODE_ENV !== 'production') {
      console.error('Material-UI: You need to provide a valueBuffer prop ' + 'when using the buffer variant of LinearProgress.');
    }
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(LinearProgressRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    styleProps: styleProps,
    role: "progressbar"
  }, rootProps, {
    ref: ref
  }, other, {
    children: [variant === 'buffer' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(LinearProgressDashed, {
      className: classes.dashed,
      styleProps: styleProps
    }) : null, /*#__PURE__*/(0, _jsxRuntime.jsx)(LinearProgressBar1, {
      className: classes.bar1,
      styleProps: styleProps,
      style: inlineStyles.bar1
    }), variant === 'determinate' ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(LinearProgressBar2, {
      className: classes.bar2,
      styleProps: styleProps,
      style: inlineStyles.bar2
    })]
  }));
});
process.env.NODE_ENV !== "production" ? LinearProgress.propTypes
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
  .oneOfType([_propTypes.default.oneOf(['inherit', 'primary', 'secondary']), _propTypes.default.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: _propTypes.default.number,

  /**
   * The value for the buffer variant.
   * Value between 0 and 100.
   */
  valueBuffer: _propTypes.default.number,

  /**
   * The variant to use.
   * Use indeterminate or query when there is no progress value.
   * @default 'indeterminate'
   */
  variant: _propTypes.default.oneOf(['buffer', 'determinate', 'indeterminate', 'query'])
} : void 0;
var _default = LinearProgress;
exports.default = _default;