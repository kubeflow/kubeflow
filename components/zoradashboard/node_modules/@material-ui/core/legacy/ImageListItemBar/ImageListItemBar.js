import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import { getImageListItemBarUtilityClass } from './imageListItemBarClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      position = styleProps.position,
      actionIcon = styleProps.actionIcon,
      actionPosition = styleProps.actionPosition;
  var slots = {
    root: ['root', "position".concat(capitalize(position))],
    titleWrap: ['titleWrap', "titleWrap".concat(capitalize(position)), actionIcon && "titleWrapActionPos".concat(capitalize(actionPosition))],
    title: ['title'],
    subtitle: ['subtitle'],
    actionIcon: ['actionIcon', "actionIconActionPos".concat(capitalize(actionPosition))]
  };
  return composeClasses(slots, getImageListItemBarUtilityClass, classes);
};

var ImageListItemBarRoot = styled('div', {
  name: 'MuiImageListItemBar',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles["position".concat(capitalize(styleProps.position))]];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    position: 'absolute',
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.typography.fontFamily
  }, styleProps.position === 'bottom' && {
    bottom: 0
  }, styleProps.position === 'top' && {
    top: 0
  }, styleProps.position === 'below' && {
    position: 'relative',
    background: 'transparent',
    alignItems: 'normal'
  });
});
var ImageListItemBarTitleWrap = styled('div', {
  name: 'MuiImageListItemBar',
  slot: 'TitleWrap',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.titleWrap, styles["titleWrap".concat(capitalize(styleProps.position))], styleProps.actionIcon && styles["titleWrapActionPos".concat(capitalize(styleProps.actionPosition))]];
  }
})(function (_ref2) {
  var theme = _ref2.theme,
      styleProps = _ref2.styleProps;
  return _extends({
    flexGrow: 1,
    padding: '12px 16px',
    color: theme.palette.common.white,
    overflow: 'hidden'
  }, styleProps.position === 'below' && {
    padding: '6px 0 12px',
    color: 'inherit'
  }, styleProps.actionIcon && styleProps.actionPosition === 'left' && {
    paddingLeft: 0
  }, styleProps.actionIcon && styleProps.actionPosition === 'right' && {
    paddingRight: 0
  });
});
var ImageListItemBarTitle = styled('div', {
  name: 'MuiImageListItemBar',
  slot: 'Title',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.title;
  }
})(function (_ref3) {
  var theme = _ref3.theme;
  return {
    fontSize: theme.typography.pxToRem(16),
    lineHeight: '24px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  };
});
var ImageListItemBarSubtitle = styled('div', {
  name: 'MuiImageListItemBar',
  slot: 'Subtitle',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.subtitle;
  }
})(function (_ref4) {
  var theme = _ref4.theme;
  return {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  };
});
var ImageListItemBarActionIcon = styled('div', {
  name: 'MuiImageListItemBar',
  slot: 'ActionIcon',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.actionIcon, styles["actionIconActionPos".concat(capitalize(styleProps.actionPosition))]];
  }
})(function (_ref5) {
  var styleProps = _ref5.styleProps;
  return _extends({}, styleProps.actionPosition === 'left' && {
    order: -1
  });
});
var ImageListItemBar = /*#__PURE__*/React.forwardRef(function ImageListItemBar(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiImageListItemBar'
  });

  var actionIcon = props.actionIcon,
      _props$actionPosition = props.actionPosition,
      actionPosition = _props$actionPosition === void 0 ? 'right' : _props$actionPosition,
      className = props.className,
      subtitle = props.subtitle,
      title = props.title,
      _props$position = props.position,
      position = _props$position === void 0 ? 'bottom' : _props$position,
      other = _objectWithoutProperties(props, ["actionIcon", "actionPosition", "className", "subtitle", "title", "position"]);

  var styleProps = _extends({}, props, {
    position: position,
    actionPosition: actionPosition
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsxs(ImageListItemBarRoot, _extends({
    styleProps: styleProps,
    className: clsx(classes.root, className),
    ref: ref
  }, other, {
    children: [/*#__PURE__*/_jsxs(ImageListItemBarTitleWrap, {
      styleProps: styleProps,
      className: classes.titleWrap,
      children: [/*#__PURE__*/_jsx(ImageListItemBarTitle, {
        className: classes.title,
        children: title
      }), subtitle ? /*#__PURE__*/_jsx(ImageListItemBarSubtitle, {
        className: classes.subtitle,
        children: subtitle
      }) : null]
    }), actionIcon ? /*#__PURE__*/_jsx(ImageListItemBarActionIcon, {
      styleProps: styleProps,
      className: classes.actionIcon,
      children: actionIcon
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" ? ImageListItemBar.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the item itself).
   */
  actionIcon: PropTypes.node,

  /**
   * Position of secondary action IconButton.
   * @default 'right'
   */
  actionPosition: PropTypes.oneOf(['left', 'right']),

  /**
   * @ignore
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
   * Position of the title bar.
   * @default 'bottom'
   */
  position: PropTypes.oneOf(['below', 'bottom', 'top']),

  /**
   * String or element serving as subtitle (support text).
   */
  subtitle: PropTypes.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * Title to be displayed.
   */
  title: PropTypes.node
} : void 0;
export default ImageListItemBar;