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

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _ArrowDownward = _interopRequireDefault(require("../internal/svg-icons/ArrowDownward"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _tableSortLabelClasses = _interopRequireWildcard(require("./tableSortLabelClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["active", "children", "className", "direction", "hideSortIcon", "IconComponent"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    direction,
    active
  } = styleProps;
  const slots = {
    root: ['root', active && 'active'],
    icon: ['icon', `iconDirection${(0, _capitalize.default)(direction)}`]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _tableSortLabelClasses.getTableSortLabelUtilityClass, classes);
};

const TableSortLabelRoot = (0, _styled.default)(_ButtonBase.default, {
  name: 'MuiTableSortLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styleProps.active && styles.active];
  }
})(({
  theme
}) => ({
  cursor: 'pointer',
  display: 'inline-flex',
  justifyContent: 'flex-start',
  flexDirection: 'inherit',
  alignItems: 'center',
  '&:focus': {
    color: theme.palette.text.secondary
  },
  '&:hover': {
    color: theme.palette.text.secondary,
    [`& .${_tableSortLabelClasses.default.icon}`]: {
      opacity: 0.5
    }
  },
  [`&.${_tableSortLabelClasses.default.active}`]: {
    color: theme.palette.text.primary,
    [`& .${_tableSortLabelClasses.default.icon}`]: {
      opacity: 1,
      color: theme.palette.text.secondary
    }
  }
}));
const TableSortLabelIcon = (0, _styled.default)('span', {
  name: 'MuiTableSortLabel',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.icon, styles[`iconDirection${(0, _capitalize.default)(styleProps.direction)}`]];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  fontSize: 18,
  marginRight: 4,
  marginLeft: 4,
  opacity: 0,
  transition: theme.transitions.create(['opacity', 'transform'], {
    duration: theme.transitions.duration.shorter
  }),
  userSelect: 'none'
}, styleProps.direction === 'desc' && {
  transform: 'rotate(0deg)'
}, styleProps.direction === 'asc' && {
  transform: 'rotate(180deg)'
}));
/**
 * A button based label for placing inside `TableCell` for column sorting.
 */

const TableSortLabel = /*#__PURE__*/React.forwardRef(function TableSortLabel(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiTableSortLabel'
  });
  const {
    active = false,
    children,
    className,
    direction = 'asc',
    hideSortIcon = false,
    IconComponent = _ArrowDownward.default
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    active,
    direction,
    hideSortIcon,
    IconComponent
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(TableSortLabelRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    component: "span",
    disableRipple: true,
    styleProps: styleProps,
    ref: ref
  }, other, {
    children: [children, hideSortIcon && !active ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(TableSortLabelIcon, {
      as: IconComponent,
      className: (0, _clsx.default)(classes.icon),
      styleProps: styleProps
    })]
  }));
});
process.env.NODE_ENV !== "production" ? TableSortLabel.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   * @default false
   */
  active: _propTypes.default.bool,

  /**
   * Label contents, the arrow will be appended automatically.
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
   * The current sort direction.
   * @default 'asc'
   */
  direction: _propTypes.default.oneOf(['asc', 'desc']),

  /**
   * Hide sort icon when active is false.
   * @default false
   */
  hideSortIcon: _propTypes.default.bool,

  /**
   * Sort icon to use.
   * @default ArrowDownwardIcon
   */
  IconComponent: _propTypes.default.elementType,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = TableSortLabel;
exports.default = _default;