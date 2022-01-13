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

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _AccordionContext = _interopRequireDefault(require("../Accordion/AccordionContext"));

var _accordionSummaryClasses = _interopRequireWildcard(require("./accordionSummaryClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "expandIcon", "focusVisibleClassName", "onClick"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    expanded,
    disabled,
    disableGutters
  } = styleProps;
  const slots = {
    root: ['root', expanded && 'expanded', disabled && 'disabled', !disableGutters && 'gutters'],
    focusVisible: ['focusVisible'],
    content: ['content', expanded && 'expanded', !disableGutters && 'contentGutters'],
    expandIconWrapper: ['expandIconWrapper', expanded && 'expanded']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _accordionSummaryClasses.getAccordionSummaryUtilityClass, classes);
};

const AccordionSummaryRoot = (0, _styled.default)(_ButtonBase.default, {
  name: 'MuiAccordionSummary',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})(({
  theme,
  styleProps
}) => {
  const transition = {
    duration: theme.transitions.duration.shortest
  };
  return (0, _extends2.default)({
    display: 'flex',
    minHeight: 48,
    padding: theme.spacing(0, 2),
    transition: theme.transitions.create(['min-height', 'background-color'], transition),
    [`&.${_accordionSummaryClasses.default.focusVisible}`]: {
      backgroundColor: theme.palette.action.focus
    },
    [`&.${_accordionSummaryClasses.default.disabled}`]: {
      opacity: theme.palette.action.disabledOpacity
    },
    [`&:hover:not(.${_accordionSummaryClasses.default.disabled})`]: {
      cursor: 'pointer'
    }
  }, !styleProps.disableGutters && {
    [`&.${_accordionSummaryClasses.default.expanded}`]: {
      minHeight: 64
    }
  });
});
const AccordionSummaryContent = (0, _styled.default)('div', {
  name: 'MuiAccordionSummary',
  slot: 'Content',
  overridesResolver: (props, styles) => styles.content
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  display: 'flex',
  flexGrow: 1,
  margin: '12px 0'
}, !styleProps.disableGutters && {
  transition: theme.transitions.create(['margin'], {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${_accordionSummaryClasses.default.expanded}`]: {
    margin: '20px 0'
  }
}));
const AccordionSummaryExpandIconWrapper = (0, _styled.default)('div', {
  name: 'MuiAccordionSummary',
  slot: 'ExpandIconWrapper',
  overridesResolver: (props, styles) => styles.expandIconWrapper
})(({
  theme
}) => ({
  display: 'flex',
  color: theme.palette.action.active,
  transform: 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${_accordionSummaryClasses.default.expanded}`]: {
    transform: 'rotate(180deg)'
  }
}));
const AccordionSummary = /*#__PURE__*/React.forwardRef(function AccordionSummary(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiAccordionSummary'
  });
  const {
    children,
    className,
    expandIcon,
    focusVisibleClassName,
    onClick
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    disabled = false,
    disableGutters,
    expanded,
    toggle
  } = React.useContext(_AccordionContext.default);

  const handleChange = event => {
    if (toggle) {
      toggle(event);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const styleProps = (0, _extends2.default)({}, props, {
    expanded,
    disabled,
    disableGutters
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(AccordionSummaryRoot, (0, _extends2.default)({
    focusRipple: false,
    disableRipple: true,
    disabled: disabled,
    component: "div",
    "aria-expanded": expanded,
    className: (0, _clsx.default)(classes.root, className),
    focusVisibleClassName: (0, _clsx.default)(classes.focusVisible, focusVisibleClassName),
    onClick: handleChange,
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(AccordionSummaryContent, {
      className: classes.content,
      styleProps: styleProps,
      children: children
    }), expandIcon && /*#__PURE__*/(0, _jsxRuntime.jsx)(AccordionSummaryExpandIconWrapper, {
      className: classes.expandIconWrapper,
      styleProps: styleProps,
      children: expandIcon
    })]
  }));
});
process.env.NODE_ENV !== "production" ? AccordionSummary.propTypes
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
   * The icon to display as the expand indicator.
   */
  expandIcon: _propTypes.default.node,

  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: _propTypes.default.string,

  /**
   * @ignore
   */
  onClick: _propTypes.default.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = AccordionSummary;
exports.default = _default;