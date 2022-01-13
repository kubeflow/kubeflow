import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import Paper from '../Paper';
import { getAppBarUtilityClass } from './appBarClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var color = styleProps.color,
      position = styleProps.position,
      classes = styleProps.classes;
  var slots = {
    root: ['root', "color".concat(capitalize(color)), "position".concat(capitalize(position))]
  };
  return composeClasses(slots, getAppBarUtilityClass, classes);
};

var AppBarRoot = styled(Paper, {
  name: 'MuiAppBar',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles["position".concat(capitalize(styleProps.position))], styles["color".concat(capitalize(styleProps.color))]];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  var backgroundColorDefault = theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900];
  return _extends({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    // Prevent padding issue with the Modal and fixed positioned AppBar.
    flexShrink: 0
  }, styleProps.position === 'fixed' && {
    position: 'fixed',
    zIndex: theme.zIndex.appBar,
    top: 0,
    left: 'auto',
    right: 0,
    '@media print': {
      // Prevent the app bar to be visible on each printed page.
      position: 'absolute'
    }
  }, styleProps.position === 'absolute' && {
    position: 'absolute',
    zIndex: theme.zIndex.appBar,
    top: 0,
    left: 'auto',
    right: 0
  }, styleProps.position === 'sticky' && {
    // ⚠️ sticky is not supported by IE11.
    position: 'sticky',
    zIndex: theme.zIndex.appBar,
    top: 0,
    left: 'auto',
    right: 0
  }, styleProps.position === 'static' && {
    position: 'static'
  }, styleProps.position === 'relative' && {
    position: 'relative'
  }, styleProps.color === 'default' && {
    backgroundColor: backgroundColorDefault,
    color: theme.palette.getContrastText(backgroundColorDefault)
  }, styleProps.color && styleProps.color !== 'default' && styleProps.color !== 'inherit' && styleProps.color !== 'transparent' && {
    backgroundColor: theme.palette[styleProps.color].main,
    color: theme.palette[styleProps.color].contrastText
  }, styleProps.color === 'inherit' && {
    color: 'inherit'
  }, styleProps.color === 'transparent' && {
    backgroundColor: 'transparent',
    color: 'inherit'
  }, theme.palette.mode === 'dark' && !styleProps.enableColorOnDark && {
    backgroundColor: null,
    color: null
  });
});
var AppBar = /*#__PURE__*/React.forwardRef(function AppBar(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiAppBar'
  });

  var className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'primary' : _props$color,
      _props$enableColorOnD = props.enableColorOnDark,
      enableColorOnDark = _props$enableColorOnD === void 0 ? false : _props$enableColorOnD,
      _props$position = props.position,
      position = _props$position === void 0 ? 'fixed' : _props$position,
      other = _objectWithoutProperties(props, ["className", "color", "enableColorOnDark", "position"]);

  var styleProps = _extends({}, props, {
    color: color,
    position: position,
    enableColorOnDark: enableColorOnDark
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(AppBarRoot, _extends({
    square: true,
    component: "header",
    styleProps: styleProps,
    elevation: 4,
    className: clsx(classes.root, className, position === 'fixed' && 'mui-fixed'),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? AppBar.propTypes
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary', 'transparent']), PropTypes.string]),

  /**
   * If true, the `color` prop is applied in dark mode.
   * @default false
   */
  enableColorOnDark: PropTypes.bool,

  /**
   * The positioning type. The behavior of the different options is described
   * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
   * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
   * @default 'fixed'
   */
  position: PropTypes.oneOf(['absolute', 'fixed', 'relative', 'static', 'sticky']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default AppBar;