"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _reactIs = require("react-is");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _unstyled = require("@material-ui/unstyled");

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _isValueSelected = _interopRequireDefault(require("./isValueSelected"));

var _toggleButtonGroupClasses = _interopRequireWildcard(require("./toggleButtonGroupClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "color", "exclusive", "fullWidth", "onChange", "orientation", "size", "value"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    orientation,
    fullWidth
  } = styleProps;
  const slots = {
    root: ['root', orientation === 'vertical' && 'vertical', fullWidth && 'fullWidth'],
    grouped: ['grouped', `grouped${(0, _capitalize.default)(orientation)}`]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _toggleButtonGroupClasses.getToggleButtonGroupUtilityClass, classes);
};

const ToggleButtonGroupRoot = (0, _styled.default)('div', {
  name: 'MuiToggleButtonGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [{
      [`& .${_toggleButtonGroupClasses.default.grouped}`]: styles.grouped
    }, {
      [`& .${_toggleButtonGroupClasses.default.grouped}`]: styles[`grouped${(0, _capitalize.default)(styleProps.orientation)}`]
    }, styles.root, styleProps.orientation === 'vertical' && styles.vertical, styleProps.fullWidth && styles.fullWidth];
  }
})(({
  styleProps,
  theme
}) => (0, _extends2.default)({
  display: 'inline-flex',
  borderRadius: theme.shape.borderRadius
}, styleProps.orientation === 'vertical' && {
  flexDirection: 'column'
}, styleProps.fullWidth && {
  width: '100%'
}, {
  [`& .${_toggleButtonGroupClasses.default.grouped}`]: (0, _extends2.default)({}, styleProps.orientation === 'horizontal' ? {
    '&:not(:first-of-type)': {
      marginLeft: -1,
      borderLeft: '1px solid transparent',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    '&:not(:last-of-type)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    [`&.${_toggleButtonGroupClasses.default.selected} + .${_toggleButtonGroupClasses.default.grouped}.${_toggleButtonGroupClasses.default.selected}`]: {
      borderLeft: 0,
      marginLeft: 0
    }
  } : {
    '&:not(:first-of-type)': {
      marginTop: -1,
      borderTop: '1px solid transparent',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    },
    '&:not(:last-of-type)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    [`&.${_toggleButtonGroupClasses.default.selected} + .${_toggleButtonGroupClasses.default.grouped}.${_toggleButtonGroupClasses.default.selected}`]: {
      borderTop: 0,
      marginTop: 0
    }
  })
}));
const ToggleButtonGroup = /*#__PURE__*/React.forwardRef(function ToggleButtonGroup(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiToggleButtonGroup'
  });
  const {
    children,
    className,
    color = 'standard',
    exclusive = false,
    fullWidth = false,
    onChange,
    orientation = 'horizontal',
    size = 'medium',
    value
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    fullWidth,
    orientation,
    size
  });
  const classes = useUtilityClasses(styleProps);

  const handleChange = (event, buttonValue) => {
    if (!onChange) {
      return;
    }

    const index = value && value.indexOf(buttonValue);
    let newValue;

    if (value && index >= 0) {
      newValue = value.slice();
      newValue.splice(index, 1);
    } else {
      newValue = value ? value.concat(buttonValue) : [buttonValue];
    }

    onChange(event, newValue);
  };

  const handleExclusiveChange = (event, buttonValue) => {
    if (!onChange) {
      return;
    }

    onChange(event, value === buttonValue ? null : buttonValue);
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ToggleButtonGroupRoot, (0, _extends2.default)({
    role: "group",
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: React.Children.map(children, child => {
      if (! /*#__PURE__*/React.isValidElement(child)) {
        return null;
      }

      if (process.env.NODE_ENV !== 'production') {
        if ((0, _reactIs.isFragment)(child)) {
          console.error(["Material-UI: The ToggleButtonGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
        }
      }

      return /*#__PURE__*/React.cloneElement(child, {
        className: (0, _clsx.default)(classes.grouped, child.props.className),
        onChange: exclusive ? handleExclusiveChange : handleChange,
        selected: child.props.selected === undefined ? (0, _isValueSelected.default)(child.props.value, value) : child.props.selected,
        size: child.props.size || size,
        fullWidth,
        color: child.props.color || color
      });
    })
  }));
});
process.env.NODE_ENV !== "production" ? ToggleButtonGroup.propTypes
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
   * The color of a button when it is selected.
   * @default 'standard'
   */
  color: _propTypes.default.oneOf(['error', 'info', 'primary', 'secondary', 'standard', 'success', 'warning']),

  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   * @default false
   */
  exclusive: _propTypes.default.bool,

  /**
   * If `true`, the button group will take up the full width of its container.
   * @default false
   */
  fullWidth: _propTypes.default.bool,

  /**
   * Callback fired when the value changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange: _propTypes.default.func,

  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),

  /**
   * The size of the component.
   * @default 'medium'
   */
  size: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['small', 'medium', 'large']), _propTypes.default.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   *
   * The value must have reference equality with the option in order to be selected.
   */
  value: _propTypes.default.any
} : void 0;
var _default = ToggleButtonGroup;
exports.default = _default;