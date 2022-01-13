import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Paper from '../Paper';
import { getCardUtilityClass } from './cardClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getCardUtilityClass, classes);
};

var CardRoot = styled(Paper, {
  name: 'MuiCard',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})(function () {
  return {
    overflow: 'hidden'
  };
});
var Card = /*#__PURE__*/React.forwardRef(function Card(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiCard'
  });

  var className = props.className,
      _props$raised = props.raised,
      raised = _props$raised === void 0 ? false : _props$raised,
      other = _objectWithoutProperties(props, ["className", "raised"]);

  var styleProps = _extends({}, props, {
    raised: raised
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(CardRoot, _extends({
    className: clsx(classes.root, className),
    elevation: raised ? 8 : undefined,
    ref: ref,
    styleProps: styleProps
  }, other));
});
process.env.NODE_ENV !== "production" ? Card.propTypes
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
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised: chainPropTypes(PropTypes.bool, function (props) {
    if (props.raised && props.variant === 'outlined') {
      return new Error('Material-UI: Combining `raised={true}` with `variant="outlined"` has no effect.');
    }

    return null;
  }),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default Card;