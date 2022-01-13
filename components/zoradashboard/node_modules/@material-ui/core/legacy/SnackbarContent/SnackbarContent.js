import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { emphasize } from '@material-ui/system';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Paper from '../Paper';
import { getSnackbarContentUtilityClass } from './snackbarContentClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes;
  var slots = {
    root: ['root'],
    action: ['action'],
    message: ['message']
  };
  return composeClasses(slots, getSnackbarContentUtilityClass, classes);
};

var SnackbarContentRoot = styled(Paper, {
  name: 'MuiSnackbarContent',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})(function (_ref) {
  var theme = _ref.theme;
  var emphasis = theme.palette.mode === 'light' ? 0.8 : 0.98;
  var backgroundColor = emphasize(theme.palette.background.default, emphasis);
  return _extends({}, theme.typography.body2, _defineProperty({
    color: theme.palette.getContrastText(backgroundColor),
    backgroundColor: backgroundColor,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '6px 16px',
    borderRadius: theme.shape.borderRadius,
    flexGrow: 1
  }, theme.breakpoints.up('sm'), {
    flexGrow: 'initial',
    minWidth: 288
  }));
});
var SnackbarContentMessage = styled('div', {
  name: 'MuiSnackbarContent',
  slot: 'Message',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.message;
  }
})({
  padding: '8px 0'
});
var SnackbarContentAction = styled('div', {
  name: 'MuiSnackbarContent',
  slot: 'Action',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.action;
  }
})({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  paddingLeft: 16,
  marginRight: -8
});
var SnackbarContent = /*#__PURE__*/React.forwardRef(function SnackbarContent(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiSnackbarContent'
  });

  var action = props.action,
      className = props.className,
      message = props.message,
      _props$role = props.role,
      role = _props$role === void 0 ? 'alert' : _props$role,
      other = _objectWithoutProperties(props, ["action", "className", "message", "role"]);

  var styleProps = props;
  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsxs(SnackbarContentRoot, _extends({
    role: role,
    square: true,
    elevation: 6,
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other, {
    children: [/*#__PURE__*/_jsx(SnackbarContentMessage, {
      className: classes.message,
      styleProps: styleProps,
      children: message
    }), action ? /*#__PURE__*/_jsx(SnackbarContentAction, {
      className: classes.action,
      styleProps: styleProps,
      children: action
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" ? SnackbarContent.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The message to display.
   */
  message: PropTypes.node,

  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: PropTypes
  /* @typescript-to-proptypes-ignore */
  .string,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default SnackbarContent;