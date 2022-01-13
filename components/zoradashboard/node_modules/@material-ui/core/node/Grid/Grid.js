"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRowGap = generateRowGap;
exports.generateColumnGap = generateColumnGap;
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _system = require("@material-ui/system");

var _unstyled = require("@material-ui/unstyled");

var _requirePropFactory = _interopRequireDefault(require("../utils/requirePropFactory"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _GridContext = _interopRequireDefault(require("./GridContext"));

var _gridClasses = _interopRequireWildcard(require("./gridClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["className", "columns", "columnSpacing", "component", "container", "direction", "item", "lg", "md", "rowSpacing", "sm", "spacing", "wrap", "xl", "xs", "zeroMinWidth"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function getOffset(val) {
  const parse = parseFloat(val);
  return `${parse}${String(val).replace(String(parse), '') || 'px'}`;
} // Duplicated with Stack.js


function resolveBreakpointValues({
  values,
  base
}) {
  const keys = Object.keys(base);

  if (keys.length === 0) {
    return values;
  }

  let previous;
  return keys.reduce((acc, breakpoint) => {
    if (typeof values === 'object') {
      acc[breakpoint] = values[breakpoint] != null ? values[breakpoint] : values[previous];
    } else {
      acc[breakpoint] = values;
    }

    previous = breakpoint;
    return acc;
  }, {});
}

function generateGrid(globalStyles, theme, breakpoint, styleProps) {
  const size = styleProps[breakpoint];
  if (!size) return;
  let styles = {};

  if (size === true) {
    // For the auto layouting
    styles = {
      flexBasis: 0,
      flexGrow: 1,
      maxWidth: '100%'
    };
  } else if (size === 'auto') {
    styles = {
      flexBasis: 'auto',
      flexGrow: 0,
      maxWidth: 'none'
    };
  } else {
    const columnsBreakpointValues = resolveBreakpointValues({
      values: styleProps.columns,
      base: theme.breakpoints.values
    }); // Keep 7 significant numbers.

    const width = `${Math.round(size / columnsBreakpointValues[breakpoint] * 10e7) / 10e5}%`;
    let more = {};

    if (styleProps.container && styleProps.item && styleProps.columnSpacing !== 0) {
      const themeSpacing = theme.spacing(styleProps.columnSpacing);

      if (themeSpacing !== '0px') {
        const fullWidth = `calc(${width} + ${getOffset(themeSpacing)})`;
        more = {
          flexBasis: fullWidth,
          maxWidth: fullWidth
        };
      }
    } // Close to the bootstrap implementation:
    // https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/scss/mixins/_grid.scss#L41


    styles = (0, _extends2.default)({
      flexBasis: width,
      flexGrow: 0,
      maxWidth: width
    }, more);
  } // No need for a media query for the first size.


  if (theme.breakpoints.values[breakpoint] === 0) {
    Object.assign(globalStyles, styles);
  } else {
    globalStyles[theme.breakpoints.up(breakpoint)] = styles;
  }
}

function generateDirection({
  theme,
  styleProps
}) {
  return (0, _system.handleBreakpoints)({
    theme
  }, styleProps.direction, propValue => {
    const output = {
      flexDirection: propValue
    };

    if (propValue.indexOf('column') === 0) {
      output[`& > .${_gridClasses.default.item}`] = {
        maxWidth: 'none'
      };
    }

    return output;
  });
}

function generateRowGap({
  theme,
  styleProps
}) {
  const {
    container,
    rowSpacing
  } = styleProps;
  let styles = {};

  if (container && rowSpacing !== 0) {
    styles = (0, _system.handleBreakpoints)({
      theme
    }, rowSpacing, propValue => {
      const themeSpacing = theme.spacing(propValue);

      if (themeSpacing !== '0px') {
        return {
          marginTop: `-${getOffset(themeSpacing)}`,
          [`& > .${_gridClasses.default.item}`]: {
            paddingTop: getOffset(themeSpacing)
          }
        };
      }

      return {};
    });
  }

  return styles;
}

function generateColumnGap({
  theme,
  styleProps
}) {
  const {
    container,
    columnSpacing
  } = styleProps;
  let styles = {};

  if (container && columnSpacing !== 0) {
    styles = (0, _system.handleBreakpoints)({
      theme
    }, columnSpacing, propValue => {
      const themeSpacing = theme.spacing(propValue);

      if (themeSpacing !== '0px') {
        return {
          width: `calc(100% + ${getOffset(themeSpacing)})`,
          marginLeft: `-${getOffset(themeSpacing)}`,
          [`& > .${_gridClasses.default.item}`]: {
            paddingLeft: getOffset(themeSpacing)
          }
        };
      }

      return {};
    });
  }

  return styles;
} // Default CSS values
// flex: '0 1 auto',
// flexDirection: 'row',
// alignItems: 'flex-start',
// flexWrap: 'nowrap',
// justifyContent: 'flex-start',


const GridRoot = (0, _styled.default)('div', {
  name: 'MuiGrid',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      container,
      direction,
      item,
      lg,
      md,
      sm,
      spacing,
      wrap,
      xl,
      xs,
      zeroMinWidth
    } = props.styleProps;
    return [styles.root, container && styles.container, item && styles.item, zeroMinWidth && styles.zeroMinWidth, container && spacing !== 0 && styles[`spacing-xs-${String(spacing)}`], direction !== 'row' && styles[`direction-xs-${String(direction)}`], wrap !== 'wrap' && styles[`wrap-xs-${String(wrap)}`], xs !== false && styles[`grid-xs-${String(xs)}`], sm !== false && styles[`grid-sm-${String(sm)}`], md !== false && styles[`grid-md-${String(md)}`], lg !== false && styles[`grid-lg-${String(lg)}`], xl !== false && styles[`grid-xl-${String(xl)}`]];
  }
})(({
  styleProps
}) => (0, _extends2.default)({
  boxSizing: 'border-box'
}, styleProps.container && {
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%'
}, styleProps.item && {
  margin: 0 // For instance, it's useful when used with a `figure` element.

}, styleProps.zeroMinWidth && {
  minWidth: 0
}, styleProps.wrap === 'nowrap' && {
  flexWrap: 'nowrap'
}, styleProps.wrap === 'reverse' && {
  flexWrap: 'wrap-reverse'
}), generateDirection, generateRowGap, generateColumnGap, ({
  theme,
  styleProps
}) => theme.breakpoints.keys.reduce((globalStyles, breakpoint) => {
  // Use side effect over immutability for better performance.
  generateGrid(globalStyles, theme, breakpoint, styleProps);
  return globalStyles;
}, {}));

const useUtilityClasses = styleProps => {
  const {
    classes,
    container,
    direction,
    item,
    lg,
    md,
    sm,
    spacing,
    wrap,
    xl,
    xs,
    zeroMinWidth
  } = styleProps;
  const slots = {
    root: ['root', container && 'container', item && 'item', zeroMinWidth && 'zeroMinWidth', container && spacing !== 0 && `spacing-xs-${String(spacing)}`, direction !== 'row' && `direction-xs-${String(direction)}`, wrap !== 'wrap' && `wrap-xs-${String(wrap)}`, xs !== false && `grid-xs-${String(xs)}`, sm !== false && `grid-sm-${String(sm)}`, md !== false && `grid-md-${String(md)}`, lg !== false && `grid-lg-${String(lg)}`, xl !== false && `grid-xl-${String(xl)}`]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _gridClasses.getGridUtilityClass, classes);
};

const Grid = /*#__PURE__*/React.forwardRef(function Grid(inProps, ref) {
  const themeProps = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiGrid'
  });
  const props = (0, _system.unstable_extendSxProp)(themeProps);
  const {
    className,
    columns: columnsProp = 12,
    columnSpacing: columnSpacingProp,
    component = 'div',
    container = false,
    direction = 'row',
    item = false,
    lg = false,
    md = false,
    rowSpacing: rowSpacingProp,
    sm = false,
    spacing = 0,
    wrap = 'wrap',
    xl = false,
    xs = false,
    zeroMinWidth = false
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const rowSpacing = rowSpacingProp || spacing;
  const columnSpacing = columnSpacingProp || spacing;
  const columns = React.useContext(_GridContext.default) || columnsProp;
  const styleProps = (0, _extends2.default)({}, props, {
    columns,
    container,
    direction,
    item,
    lg,
    md,
    sm,
    rowSpacing,
    columnSpacing,
    wrap,
    xl,
    xs,
    zeroMinWidth
  });
  const classes = useUtilityClasses(styleProps);

  const wrapChild = element => columns !== 12 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridContext.default.Provider, {
    value: columns,
    children: element
  }) : element;

  return wrapChild( /*#__PURE__*/(0, _jsxRuntime.jsx)(GridRoot, (0, _extends2.default)({
    styleProps: styleProps,
    className: (0, _clsx.default)(classes.root, className),
    as: component,
    ref: ref
  }, other)));
});
process.env.NODE_ENV !== "production" ? Grid.propTypes
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
   * The number of columns.
   * @default 12
   */
  columns: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number, _propTypes.default.object]),

  /**
   * Defines the horizontal space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  columnSpacing: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])), _propTypes.default.number, _propTypes.default.object, _propTypes.default.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  container: _propTypes.default.bool,

  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'row'
   */
  direction: _propTypes.default.oneOfType([_propTypes.default.oneOf(['column-reverse', 'column', 'row-reverse', 'row']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])), _propTypes.default.object]),

  /**
   * If `true`, the component will have the flex *item* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  item: _propTypes.default.bool,

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `lg` breakpoint and wider screens if not overridden.
   * @default false
   */
  lg: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), _propTypes.default.bool]),

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `md` breakpoint and wider screens if not overridden.
   * @default false
   */
  md: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), _propTypes.default.bool]),

  /**
   * Defines the vertical space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  rowSpacing: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])), _propTypes.default.number, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `sm` breakpoint and wider screens if not overridden.
   * @default false
   */
  sm: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), _propTypes.default.bool]),

  /**
   * Defines the space between the type `item` components.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])), _propTypes.default.number, _propTypes.default.object, _propTypes.default.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap: _propTypes.default.oneOf(['nowrap', 'wrap-reverse', 'wrap']),

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for the `xl` breakpoint and wider screens.
   * @default false
   */
  xl: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), _propTypes.default.bool]),

  /**
   * Defines the number of grids the component is going to use.
   * It's applied for all the screen sizes with the lowest priority.
   * @default false
   */
  xs: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]), _propTypes.default.bool]),

  /**
   * If `true`, it sets `min-width: 0` on the item.
   * Refer to the limitations section of the documentation to better understand the use case.
   * @default false
   */
  zeroMinWidth: _propTypes.default.bool
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  const requireProp = (0, _requirePropFactory.default)('Grid', Grid); // eslint-disable-next-line no-useless-concat

  Grid['propTypes' + ''] = (0, _extends2.default)({}, Grid.propTypes, {
    direction: requireProp('container'),
    lg: requireProp('item'),
    md: requireProp('item'),
    sm: requireProp('item'),
    spacing: requireProp('container'),
    wrap: requireProp('container'),
    xs: requireProp('item'),
    zeroMinWidth: requireProp('item')
  });
}

var _default = Grid;
exports.default = _default;