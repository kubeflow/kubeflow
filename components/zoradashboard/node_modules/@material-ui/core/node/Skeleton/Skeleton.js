"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _system = require("@material-ui/system");

var _unstyled = require("@material-ui/unstyled");

var _styles = require("../styles");

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _skeletonClasses = require("./skeletonClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["animation", "className", "component", "height", "style", "variant", "width"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    variant,
    animation,
    hasChildren,
    width,
    height
  } = styleProps;
  const slots = {
    root: ['root', variant, animation, hasChildren && 'withChildren', hasChildren && !width && 'fitContent', hasChildren && !height && 'heightAuto']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _skeletonClasses.getSkeletonUtilityClass, classes);
};

const pulseKeyframe = (0, _system.keyframes)`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`;
const waveKeyframe = (0, _system.keyframes)`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`;
const SkeletonRoot = (0, _styled.default)('span', {
  name: 'MuiSkeleton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[styleProps.variant], styleProps.animation !== false && styles[styleProps.animation], styleProps.hasChildren && styles.withChildren, styleProps.hasChildren && !styleProps.width && styles.fitContent, styleProps.hasChildren && !styleProps.height && styles.heightAuto];
  }
})(({
  theme,
  styleProps
}) => {
  const radiusUnit = (0, _styles.unstable_getUnit)(theme.shape.borderRadius) || 'px';
  const radiusValue = (0, _styles.unstable_toUnitless)(theme.shape.borderRadius);
  return (0, _extends2.default)({
    display: 'block',
    // Create a "on paper" color with sufficient contrast retaining the color
    backgroundColor: (0, _styles.alpha)(theme.palette.text.primary, theme.palette.mode === 'light' ? 0.11 : 0.13),
    height: '1.2em'
  }, styleProps.variant === 'text' && {
    marginTop: 0,
    marginBottom: 0,
    height: 'auto',
    transformOrigin: '0 55%',
    transform: 'scale(1, 0.60)',
    borderRadius: `${radiusValue}${radiusUnit}/${Math.round(radiusValue / 0.6 * 10) / 10}${radiusUnit}`,
    '&:empty:before': {
      content: '"\\00a0"'
    }
  }, styleProps.variant === 'circular' && {
    borderRadius: '50%'
  }, styleProps.hasChildren && {
    '& > *': {
      visibility: 'hidden'
    }
  }, styleProps.hasChildren && !styleProps.width && {
    maxWidth: 'fit-content'
  }, styleProps.hasChildren && !styleProps.height && {
    height: 'auto'
  });
}, ({
  styleProps
}) => styleProps.animation === 'pulse' && (0, _system.css)`
      animation: ${pulseKeyframe} 1.5s ease-in-out 0.5s infinite;
    `, ({
  styleProps,
  theme
}) => styleProps.animation === 'wave' && (0, _system.css)`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${waveKeyframe} 1.6s linear 0.5s infinite;
        background: linear-gradient(90deg, transparent, ${theme.palette.action.hover}, transparent);
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `);
const Skeleton = /*#__PURE__*/React.forwardRef(function Skeleton(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiSkeleton'
  });
  const {
    animation = 'pulse',
    className,
    component = 'span',
    height,
    style,
    variant = 'text',
    width
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    animation,
    component,
    variant,
    hasChildren: Boolean(other.children)
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SkeletonRoot, (0, _extends2.default)({
    as: component,
    ref: ref,
    className: (0, _clsx.default)(classes.root, className),
    styleProps: styleProps
  }, other, {
    style: (0, _extends2.default)({
      width,
      height
    }, style)
  }));
});
process.env.NODE_ENV !== "production" ? Skeleton.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The animation.
   * If `false` the animation effect is disabled.
   * @default 'pulse'
   */
  animation: _propTypes.default.oneOf(['pulse', 'wave', false]),

  /**
   * Optional children to infer width and height from.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * Height of the skeleton.
   * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
   */
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * @ignore
   */
  style: _propTypes.default.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The type of content that will be rendered.
   * @default 'text'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['circular', 'rectangular', 'text']), _propTypes.default.string]),

  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
} : void 0;
var _default = Skeleton;
exports.default = _default;