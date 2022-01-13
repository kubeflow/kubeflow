import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["className", "component"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { html, body } from '../CssBaseline/CssBaseline';
import { getScopedCssBaselineUtilityClass } from './scopedCssBaselineClasses';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getScopedCssBaselineUtilityClass, classes);
};

const ScopedCssBaselineRoot = styled('div', {
  name: 'MuiScopedCssBaseline',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => _extends({}, html, body(theme), {
  '& *, & *::before, & *::after': {
    boxSizing: 'inherit'
  },
  '& strong, & b': {
    fontWeight: theme.typography.fontWeightBold
  }
}));
const ScopedCssBaseline = /*#__PURE__*/React.forwardRef(function ScopedCssBaseline(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiScopedCssBaseline'
  });

  const {
    className,
    component = 'div'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const styleProps = _extends({}, props, {
    component
  });

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(ScopedCssBaselineRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other));
});
process.env.NODE_ENV !== "production" ? ScopedCssBaseline.propTypes
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType
} : void 0;
export default ScopedCssBaseline;