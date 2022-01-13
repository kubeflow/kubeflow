"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _unstyled = require("@material-ui/unstyled");

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _imageListItemBarClasses = require("./imageListItemBarClasses");

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["actionIcon", "actionPosition", "className", "subtitle", "title", "position"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    position,
    actionIcon,
    actionPosition
  } = styleProps;
  const slots = {
    root: ['root', `position${(0, _capitalize.default)(position)}`],
    titleWrap: ['titleWrap', `titleWrap${(0, _capitalize.default)(position)}`, actionIcon && `titleWrapActionPos${(0, _capitalize.default)(actionPosition)}`],
    title: ['title'],
    subtitle: ['subtitle'],
    actionIcon: ['actionIcon', `actionIconActionPos${(0, _capitalize.default)(actionPosition)}`]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _imageListItemBarClasses.getImageListItemBarUtilityClass, classes);
};

const ImageListItemBarRoot = (0, _styled.default)('div', {
  name: 'MuiImageListItemBar',
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
}) => {
  return (0, _extends2.default)({
    position: 'absolute',
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.typography.fontFamily
  }, styleProps.position === 'bottom' && {
    bottom: 0
  }, styleProps.position === 'top' && {
    top: 0
  }, styleProps.position === 'below' && {
    position: 'relative',
    background: 'transparent',
    alignItems: 'normal'
  });
});
const ImageListItemBarTitleWrap = (0, _styled.default)('div', {
  name: 'MuiImageListItemBar',
  slot: 'TitleWrap',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.titleWrap, styles[`titleWrap${(0, _capitalize.default)(styleProps.position)}`], styleProps.actionIcon && styles[`titleWrapActionPos${(0, _capitalize.default)(styleProps.actionPosition)}`]];
  }
})(({
  theme,
  styleProps
}) => {
  return (0, _extends2.default)({
    flexGrow: 1,
    padding: '12px 16px',
    color: theme.palette.common.white,
    overflow: 'hidden'
  }, styleProps.position === 'below' && {
    padding: '6px 0 12px',
    color: 'inherit'
  }, styleProps.actionIcon && styleProps.actionPosition === 'left' && {
    paddingLeft: 0
  }, styleProps.actionIcon && styleProps.actionPosition === 'right' && {
    paddingRight: 0
  });
});
const ImageListItemBarTitle = (0, _styled.default)('div', {
  name: 'MuiImageListItemBar',
  slot: 'Title',
  overridesResolver: (props, styles) => styles.title
})(({
  theme
}) => {
  return {
    fontSize: theme.typography.pxToRem(16),
    lineHeight: '24px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  };
});
const ImageListItemBarSubtitle = (0, _styled.default)('div', {
  name: 'MuiImageListItemBar',
  slot: 'Subtitle',
  overridesResolver: (props, styles) => styles.subtitle
})(({
  theme
}) => {
  return {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  };
});
const ImageListItemBarActionIcon = (0, _styled.default)('div', {
  name: 'MuiImageListItemBar',
  slot: 'ActionIcon',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.actionIcon, styles[`actionIconActionPos${(0, _capitalize.default)(styleProps.actionPosition)}`]];
  }
})(({
  styleProps
}) => {
  return (0, _extends2.default)({}, styleProps.actionPosition === 'left' && {
    order: -1
  });
});
const ImageListItemBar = /*#__PURE__*/React.forwardRef(function ImageListItemBar(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiImageListItemBar'
  });
  const {
    actionIcon,
    actionPosition = 'right',
    className,
    subtitle,
    title,
    position = 'bottom'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    position,
    actionPosition
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(ImageListItemBarRoot, (0, _extends2.default)({
    styleProps: styleProps,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(ImageListItemBarTitleWrap, {
      styleProps: styleProps,
      className: classes.titleWrap,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(ImageListItemBarTitle, {
        className: classes.title,
        children: title
      }), subtitle ? /*#__PURE__*/(0, _jsxRuntime.jsx)(ImageListItemBarSubtitle, {
        className: classes.subtitle,
        children: subtitle
      }) : null]
    }), actionIcon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(ImageListItemBarActionIcon, {
      styleProps: styleProps,
      className: classes.actionIcon,
      children: actionIcon
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" ? ImageListItemBar.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the item itself).
   */
  actionIcon: _propTypes.default.node,

  /**
   * Position of secondary action IconButton.
   * @default 'right'
   */
  actionPosition: _propTypes.default.oneOf(['left', 'right']),

  /**
   * @ignore
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
   * Position of the title bar.
   * @default 'bottom'
   */
  position: _propTypes.default.oneOf(['below', 'bottom', 'top']),

  /**
   * String or element serving as subtitle (support text).
   */
  subtitle: _propTypes.default.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * Title to be displayed.
   */
  title: _propTypes.default.node
} : void 0;
var _default = ImageListItemBar;
exports.default = _default;