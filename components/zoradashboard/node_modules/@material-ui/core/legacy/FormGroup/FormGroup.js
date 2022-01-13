import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getFormGroupUtilityClass } from './formGroupClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      row = styleProps.row;
  var slots = {
    root: ['root', row && 'row']
  };
  return composeClasses(slots, getFormGroupUtilityClass, classes);
};

var FormGroupRoot = styled('div', {
  name: 'MuiFormGroup',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styleProps.row && styles.row];
  }
})(function (_ref) {
  var styleProps = _ref.styleProps;
  return _extends({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  }, styleProps.row && {
    flexDirection: 'row'
  });
});
/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */

var FormGroup = /*#__PURE__*/React.forwardRef(function FormGroup(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiFormGroup'
  });

  var className = props.className,
      _props$row = props.row,
      row = _props$row === void 0 ? false : _props$row,
      other = _objectWithoutProperties(props, ["className", "row"]);

  var styleProps = _extends({}, props, {
    row: row
  });

  var classes = useUtilityClasses(styleProps);
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