import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import cardActionAreaClasses, { getCardActionAreaUtilityClass } from './cardActionAreaClasses';
import ButtonBase from '../ButtonBase';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes;
  var slots = {
    root: ['root'],
    focusHighlight: ['focusHighlight']
  };
  return composeClasses(slots, getCardActionAreaUtilityClass, classes);
};

var CardActionAreaRoot = styled(ButtonBase, {
  name: 'MuiCardActionArea',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.root;
  }
})(function (_ref) {
  var _ref2;

  var theme = _ref.theme;
  return _ref2 = {
    display: 'block',
    textAlign: 'inherit',
    width: '100%'
  }, _defineProperty(_ref2, "&:hover .".concat(cardActionAreaClasses.focusHighlight), {
    opacity: theme.palette.action.hoverOpacity,
    '@media (hover: none)': {
      opacity: 0
    }
  }), _defineProperty(_ref2, "&.".concat(cardActionAreaClasses.focusVisible, " .").concat(cardActionAreaClasses.focusHighlight), {
    opacity: theme.palette.action.focusOpacity
  }), _ref2;
});
var CardActionAreaFocusHighlight = styled('span', {
  name: 'MuiCardActionArea',
  slot: 'FocusHighlight',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.focusHighlight;
  }
})(function (_ref3) {
  var theme = _ref3.theme;
  return {
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 'inherit',
    opacity: 0,
    backgroundColor: 'currentcolor',
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.short
    })
  };
});
var CardActionArea = /*#__PURE__*/React.forwardRef(function CardActionArea(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiCardActionArea'
  });

  var children = props.children,
      className = props.className,
      focusVisibleClassName = props.focusVisibleClassName,
      other = _objectWithoutProperties(props, ["children", "className", "focusVisibleClassName"]);

  var styleProps = props;
  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsxs(CardActionAreaRoot, _extends({
    className: clsx(classes.root, className),
    focusVisibleClassName: clsx(focusVisibleClassName, classes.focusVisible),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: [children, /*#__PURE__*/_jsx(CardActionAreaFocusHighlight, {
      className: classes.focusHighlight,
      styleProps: styleProps
    })]
  }));
});
process.env.NODE_ENV !== "production" ? CardActionArea.propTypes
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
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default CardActionArea;