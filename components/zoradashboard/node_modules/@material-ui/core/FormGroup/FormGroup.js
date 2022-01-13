import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["className", "row"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getFormGroupUtilityClass } from './formGroupClasses';
import { jsx as _jsx } from "react/jsx-runtime";

const useUtilityClasses = styleProps => {
  const {
    classes,
    row
  } = styleProps;
  const slots = {
    root: ['root', row && 'row']
  };
  return composeClasses(slots, getFormGroupUtilityClass, classes);
};

const FormGroupRoot = styled('div', {
  name: 'MuiFormGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, styleProps.row && styles.row];
  }
})(({
  styleProps
}) => _extends({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap'
}, styleProps.row && {
  flexDirection: 'row'
}));
/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */

const FormGroup = /*#__PURE__*/React.forwardRef(function FormGroup(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiFormGroup'
  });

  const {
    className,
    row = false
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const styleProps = _extends({}, props, {
    row
  });

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(FormGroupRoot, _extends({
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? FormGroup.propTypes
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
   * Display group of elements in a compact row.
   * @default false
   */
  row: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default FormGroup;