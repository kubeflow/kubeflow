import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Typography from '../Typography';
import { getAlertTitleUtilityClass } from './alertTitleClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getAlertTitleUtilityClass, classes);
};

var AlertTitleRoot = styled(Typography, {
  name: 'MuiAlertTitle',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})(function (_ref) {
  var theme = _ref.theme;
  return {
    fontWeight: theme.typography.fontWeightMedium,
    marginTop: -2
  };
});
var AlertTitle = /*#__PURE__*/React.forwardRef(function AlertTitle(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiAlertTitle'
  });

  var className = props.className,
      other = _objectWithoutProperties(props, ["className"]);

  var styleProps = props;
  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(AlertTitleRoot, _extends({
    gutterBottom: true,
    component: "div",
    styleProps: styleProps,
    ref: ref,
    className: clsx(classes.root, className)
  }, other));
});
process.env.NODE_ENV !== "production" ? AlertTitle.propTypes
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default AlertTitle;