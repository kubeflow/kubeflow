import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ButtonBase from '../ButtonBase';
import AccordionContext from '../Accordion/AccordionContext';
import accordionSummaryClasses, { getAccordionSummaryUtilityClass } from './accordionSummaryClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      expanded = styleProps.expanded,
      disabled = styleProps.disabled,
      disableGutters = styleProps.disableGutters;
  var slots = {
    root: ['root', expanded && 'expanded', disabled && 'disabled', !disableGutters && 'gutters'],
    focusVisible: ['focusVisible'],
    content: ['content', expanded && 'expanded', !disableGutters && 'contentGutters'],
    expandIconWrapper: ['expandIconWrapper', expanded && 'expanded']
  };
  return composeClasses(slots, getAccordionSummaryUtilityClass, classes);
};

var AccordionSummaryRoot = styled(ButtonBase, {
  name: 'MuiAccordionSummary',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})(function (_ref) {
  var _extends2;

  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  var transition = {
    duration: theme.transitions.duration.shortest
  };
  return _extends((_extends2 = {
    display: 'flex',
    minHeight: 48,
    padding: theme.spacing(0, 2),
    transition: theme.transitions.create(['min-height', 'background-color'], transition)
  }, _defineProperty(_extends2, "&.".concat(accordionSummaryClasses.focusVisible), {
    backgroundColor: theme.palette.action.focus
  }), _defineProperty(_extends2, "&.".concat(accordionSummaryClasses.disabled), {
    opacity: theme.palette.action.disabledOpacity
  }), _defineProperty(_extends2, "&:hover:not(.".concat(accordionSummaryClasses.disabled, ")"), {
    cursor: 'pointer'
  }), _extends2), !styleProps.disableGutters && _defineProperty({}, "&.".concat(accordionSummaryClasses.expanded), {
    minHeight: 64
  }));
});
var AccordionSummaryContent = styled('div', {
  name: 'MuiAccordionSummary',
  slot: 'Content',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.content;
  }
})(function (_ref3) {
  var theme = _ref3.theme,
      styleProps = _ref3.styleProps;
  return _extends({
    display: 'flex',
    flexGrow: 1,
    margin: '12px 0'
  }, !styleProps.disableGutters && _defineProperty({
    transition: theme.transitions.create(['margin'], {
      duration: theme.transitions.duration.shortest
    })
  }, "&.".concat(accordionSummaryClasses.expanded), {
    margin: '20px 0'
  }));
});
var AccordionSummaryExpandIconWrapper = styled('div', {
  name: 'MuiAccordionSummary',
  slot: 'ExpandIconWrapper',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.expandIconWrapper;
  }
})(function (_ref5) {
  var theme = _ref5.theme;
  return _defineProperty({
    display: 'flex',
    color: theme.palette.action.active,
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  }, "&.".concat(accordionSummaryClasses.expanded), {
    transform: 'rotate(180deg)'
  });
});
var AccordionSummary = /*#__PURE__*/React.forwardRef(function AccordionSummary(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiAccordionSummary'
  });

  var children = props.children,
      className = props.className,
      expandIcon = props.expandIcon,
      focusVisibleClassName = props.focusVisibleClassName,
      onClick = props.onClick,
      other = _objectWithoutProperties(props, ["children", "className", "expandIcon", "focusVisibleClassName", "onClick"]);

  var _React$useContext = React.useContext(AccordionContext),
      _React$useContext$dis = _React$useContext.disabled,
      disabled = _React$useContext$dis === void 0 ? false : _React$useContext$dis,
      disableGutters = _React$useContext.disableGutters,
      expanded = _React$useContext.expanded,
      toggle = _React$useContext.toggle;

  var handleChange = function handleChange(event) {
    if (toggle) {
      toggle(event);
    }

    if (onClick) {
      onClick(event);
    }
  };

  var styleProps = _extends({}, props, {
    expanded: expanded,
    disabled: disabled,
    disableGutters: disableGutters
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsxs(AccordionSummaryRoot, _extends({
    focusRipple: false,
    disableRipple: true,
    disabled: disabled,
    component: "div",
    "aria-expanded": expanded,
    className: clsx(classes.root, className),
    focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    onClick: handleChange,
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: [/*#__PURE__*/_jsx(AccordionSummaryContent, {
      className: classes.content,
      styleProps: styleProps,
      children: children
    }), expandIcon && /*#__PURE__*/_jsx(AccordionSummaryExpandIconWrapper, {
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
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The icon to display as the expand indicator.
   */
  expandIcon: PropTypes.node,

  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default AccordionSummary;