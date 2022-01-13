import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getAccordionActionsUtilityClass } from './accordionActionsClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      disableSpacing = styleProps.disableSpacing;
  var slots = {
    root: ['root', !disableSpacing && 'spacing']
  };
  return composeClasses(slots, getAccordionActionsUtilityClass, classes);
};

var AccordionActionsRoot = styled('div', {
  name: 'MuiAccordionActions',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, !styleProps.disableSpacing && styles.spacing];
  }
})(function (_ref) {
  var styleProps = _ref.styleProps;
  return _extends({
    display: 'flex',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'flex-end'
  }, !styleProps.disableSpacing && {
    '& > :not(:first-of-type)': {
      marginLeft: 8
    }
  });
});
var AccordionActions = /*#__PURE__*/React.forwardRef(function AccordionActions(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiAccordionActions'
  });

  var className = props.className,
      _props$disableSpacing = props.disableSpacing,
      disableSpacing = _props$disableSpacing === void 0 ? false : _props$disableSpacing,
      other = _objectWithoutProperties(props, ["className", "disableSpacing"]);

  var styleProps = _extends({}, props, {
    disableSpacing: disableSpacing
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(AccordionActionsRoot, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other));
});
process.env.NODE_ENV !== "production" ? AccordionActions.propTypes
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
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default AccordionActions;