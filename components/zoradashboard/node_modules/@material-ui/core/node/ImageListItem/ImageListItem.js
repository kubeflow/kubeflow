"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _unstyled = require("@material-ui/unstyled");

var _utils = require("@material-ui/utils");

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

var _reactIs = require("react-is");

var _ImageListContext = _interopRequireDefault(require("../ImageList/ImageListContext"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _isMuiElement = _interopRequireDefault(require("../utils/isMuiElement"));

var _imageListItemClasses = _interopRequireWildcard(require("./imageListItemClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "cols", "component", "rows", "style"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    variant
  } = styleProps;
  const slots = {
    root: ['root', variant],
    img: ['img']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _imageListItemClasses.getImageListItemUtilityClass, classes);
};

const ImageListItemRoot = (0, _styled.default)('li', {
  name: 'MuiImageListItem',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [{
      [`& .${_imageListItemClasses.default.img}`]: styles.img
    }, styles.root, styles[styleProps.variant]];
  }
})(({
  styleProps
}) => (0, _extends2.default)({
  display: 'inline-block',
  position: 'relative',
  lineHeight: 0
}, styleProps.variant === 'standard' && {
  // For titlebar under list item
  display: 'flex',
  flexDirection: 'column'
}, styleProps.variant === 'woven' && {
  height: '100%',
  alignSelf: 'center',
  '&:nth-of-type(even)': {
    height: '70%'
  }
}, {
  [`& .${_imageListItemClasses.default.img}`]: (0, _extends2.default)({
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  }, styleProps.variant === 'standard' && {
    height: 'auto',
    flexGrow: 1
  })
}));
const ImageListItem = /*#__PURE__*/React.forwardRef(function ImageListItem(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiImageListItem'
  }); // TODO: - Use jsdoc @default?: "cols rows default values are for docs only"

  const {
    children,
    className,
    cols = 1,
    component = 'li',
    rows = 1,
    style
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    rowHeight = 'auto',
    gap,
    variant
  } = React.useContext(_ImageListContext.default);
  let height = 'auto';

  if (variant === 'woven') {
    height = undefined;
  } else if (rowHeight !== 'auto') {
    height = rowHeight * rows + gap * (rows - 1);
  }

  const styleProps = (0, _extends2.default)({}, props, {
    cols,
    component,
    gap,
    rowHeight,
    rows,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ImageListItemRoot, (0, _extends2.default)({
    as: component,
    className: (0, _clsx.default)(classes.root, classes[variant], className),
    ref: ref,
    style: (0, _extends2.default)({
      height,
      gridColumnEnd: variant !== 'masonry' ? `span ${cols}` : undefined,
      gridRowEnd: variant !== 'masonry' ? `span ${rows}` : undefined,
      marginBottom: variant === 'masonry' ? gap : undefined
    }, style),
    styleProps: styleProps
  }, other, {
    children: React.Children.map(children, child => {
      if (! /*#__PURE__*/React.isValidElement(child)) {
        return null;
      }

      if (process.env.NODE_ENV !== 'production') {
        if ((0, _reactIs.isFragment)(child)) {
          console.error(["Material-UI: The ImageListItem component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
        }
      }

      if (child.type === 'img' || (0, _isMuiElement.default)(child, ['Image'])) {
        return /*#__PURE__*/React.cloneElement(child, {
          className: (0, _clsx.default)(classes.img, child.props.className)
        });
      }

      return child;
    })
  }));
});
process.env.NODE_ENV !== "production" ? ImageListItem.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component, normally an `<img>`.
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
   * Width of the item in number of grid columns.
   * @default 1
   */
  cols: _utils.integerPropType,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * Height of the item in number of grid rows.
   * @default 1
   */
  rows: _utils.integerPropType,

  /**
   * @ignore
   */
  style: _propTypes.default.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = ImageListItem;
exports.default = _default;