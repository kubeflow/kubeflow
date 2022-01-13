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

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _paperClasses = require("./paperClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "component", "elevation", "square", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Inspired by https://github.com/material-components/material-components-ios/blob/bca36107405594d5b7b16265a5b0ed698f85a5ee/components/Elevation/src/UIColor%2BMaterialElevation.m#L61
const getOverlayAlpha = elevation => {
  let alphaValue;

  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }

  return (alphaValue / 100).toFixed(2);
};

const useUtilityClasses = styleProps => {
  const {
    square,
    elevation,
    variant,
    classes
  } = styleProps;
  const slots = {
    root: ['root', variant, !square && 'rounded', variant === 'elevation' && `elevation${elevation}`]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _paperClasses.getPaperUtilityClass, classes);
};

const PaperRoot = (0, _styled.default)('div', {
  name: 'MuiPaper',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styles[styleProps.variant], !styleProps.square && styles.rounded, styleProps.variant === 'elevation' && styles[`elevation${styleProps.elevation}`]];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  transition: theme.transitions.create('box-shadow')
}, !styleProps.square && {
  borderRadius: theme.shape.borderRadius
}, styleProps.variant === 'outlined' && {
  border: `1px solid ${theme.palette.divider}`
}, styleProps.variant === 'elevation' && (0, _extends2.default)({
  boxShadow: theme.shadows[styleProps.elevation]
}, theme.palette.mode === 'dark' && {
  backgroundImage: `linear-gradient(${(0, _system.alpha)('#fff', getOverlayAlpha(styleProps.elevation))}, ${(0, _system.alpha)('#fff', getOverlayAlpha(styleProps.elevation))})`
})));
const Paper = /*#__PURE__*/React.forwardRef(function Paper(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiPaper'
  });
  const {
    className,
    component = 'div',
    elevation = 1,
    square = false,
    variant = 'elevation'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    component,
    elevation,
    square,
    variant
  });
  const classes = useUtilityClasses(styleProps);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = (0, _useTheme.default)();

    if (theme.shadows[elevation] === undefined) {
      console.error([`Material-UI: The elevation provided <Paper elevation={${elevation}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${elevation}]\` is defined.`].join('\n'));
    }
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(PaperRoot, (0, _extends2.default)({
    as: component,
    styleProps: styleProps,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Paper.propTypes
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: (0, _utils.chainPropTypes)(_utils.integerPropType, props => {
    const {
      elevation,
      variant
    } = props;

    if (elevation > 0 && variant === 'outlined') {
      return new Error(`Material-UI: Combining \`elevation={${elevation}}\` with \`variant="${variant}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`);
    }

    return null;
  }),

  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['elevation', 'outlined']), _propTypes.default.string])
} : void 0;
var _default = Paper;
exports.default = _default;