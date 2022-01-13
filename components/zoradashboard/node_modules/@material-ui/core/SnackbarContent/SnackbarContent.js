import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["action", "className", "message", "role"];
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

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root'],
    action: ['action'],
    message: ['message']
  };
  return composeClasses(slots, getSnackbarContentUtilityClass, classes);
};

const SnackbarContentRoot = styled(Paper, {
  name: 'MuiSnackbarContent',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => {
  const emphasis = theme.palette.mode === 'light' ? 0.8 : 0.98;
  const backgroundColor = emphasize(theme.palette.background.default, emphasis);
  return _extends({}, theme.typography.body2, {
    color: theme.palette.getContrastText(backgroundColor),
    backgroundColor,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '6px 16px',
    borderRadius: theme.shape.borderRadius,
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      flexGrow: 'initial',
      minWidth: 288
    }
  });
});
const SnackbarContentMessage = styled('div', {
  name: 'MuiSnackbarContent',
  slot: 'Message',
  overridesResolver: (props, styles) => styles.message
})({
  padding: '8px 0'
});
const SnackbarContentAction = styled('div', {
  name: 'MuiSnackbarContent',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action
})({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  paddingLeft: 16,
  marginRight: -8
});
const SnackbarContent = /*#__PURE__*/React.forwardRef(function SnackbarContent(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiSnackbarContent'
  });

  const {
    action,
    className,
    message,
    role = 'alert'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const styleProps = props;
  const classes = useUtilityClasses(styleProps);
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