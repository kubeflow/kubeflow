"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.style = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _system = require("@material-ui/system");

var _utils = require("@material-ui/utils");

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["component", "direction", "spacing", "divider", "children"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Return an array with the separator React element interspersed between
 * each React node of the input children.
 *
 * > joinChildren([1,2,3], 0)
 * [1,0,2,0,3]
 */
function joinChildren(children, separator) {
  const childrenArray = React.Children.toArray(children).filter(Boolean);
  return childrenArray.reduce((output, child, index) => {
    output.push(child);

    if (index < childrenArray.length - 1) {
      output.push( /*#__PURE__*/React.cloneElement(separator, {
        key: `separator-${index}`
      }));
    }

    return output;
  }, []);
} // Duplicated with Grid.js


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

const getSideFromDirection = direction => {
  return {
    row: 'Left',
    'row-reverse': 'Right',
    column: 'Top',
    'column-reverse': 'Bottom'
  }[direction];
};

const style = ({
  styleProps,
  theme
}) => {
  let styles = (0, _extends2.default)({
    display: 'flex'
  }, (0, _system.handleBreakpoints)({
    theme
  }, styleProps.direction, propValue => ({
    flexDirection: propValue
  })));

  if (styleProps.spacing) {
    const transformer = (0, _system.createUnarySpacing)(theme);
    const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
      if (styleProps.spacing[breakpoint] != null || styleProps.direction[breakpoint] != null) {
        acc[breakpoint] = true;
      }

      return acc;
    }, {});
    const directionValues = resolveBreakpointValues({
      values: styleProps.direction,
      base
    });
    const spacingValues = resolveBreakpointValues({
      values: styleProps.spacing,
      base
    });

    const styleFromPropValue = (propValue, breakpoint) => {
      return {
        '& > :not(style) + :not(style)': {
          margin: 0,
          [`margin${getSideFromDirection(breakpoint ? directionValues[breakpoint] : styleProps.direction)}`]: (0, _system.getValue)(transformer, propValue)
        }
      };
    };

    styles = (0, _utils.deepmerge)(styles, (0, _system.handleBreakpoints)({
      theme
    }, spacingValues, styleFromPropValue));
  }

  return styles;
};

exports.style = style;
const StackRoot = (0, _styled.default)('div', {
  name: 'Stack'
})(style);
const Stack = /*#__PURE__*/React.forwardRef(function Stack(inProps, ref) {
  const themeProps = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiStack'
  });
  const props = (0, _system.unstable_extendSxProp)(themeProps);
  const {
    component = 'div',
    direction = 'column',
    spacing = 0,
    divider,
    children
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = {
    direction,
    spacing
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(StackRoot, (0, _extends2.default)({
    as: component,
    styleProps: styleProps,
    ref: ref
  }, other, {
    children: divider ? joinChildren(children, divider) : children
  }));
});
process.env.NODE_ENV !== "production" ? Stack.propTypes
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: _propTypes.default.oneOfType([_propTypes.default.oneOf(['column-reverse', 'column', 'row-reverse', 'row']), _propTypes.default.arrayOf(_propTypes.default.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])), _propTypes.default.object]),

  /**
   * Add an element between each child.
   */
  divider: _propTypes.default.node,

  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])), _propTypes.default.number, _propTypes.default.object, _propTypes.default.string]),

  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = Stack;
exports.default = _default;