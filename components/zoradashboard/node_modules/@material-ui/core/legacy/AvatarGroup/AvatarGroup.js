import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { isFragment } from 'react-is';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Avatar from '../Avatar';
import avatarGroupClasses, { getAvatarGroupUtilityClass } from './avatarGroupClasses';
import { jsxs as _jsxs } from "react/jsx-runtime";
var SPACINGS = {
  small: -16,
  medium: null
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes;
  var slots = {
    root: ['root'],
    avatar: ['avatar']
  };
  return composeClasses(slots, getAvatarGroupUtilityClass, classes);
};

var AvatarGroupRoot = styled('div', {
  name: 'MuiAvatarGroup',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return _extends(_defineProperty({}, "& .".concat(avatarGroupClasses.avatar), styles.avatar), styles.root);
  }
})(function (_ref) {
  var _ref2;

  var theme = _ref.theme;
  return _ref2 = {}, _defineProperty(_ref2, "& .MuiAvatar-root", {
    border: "2px solid ".concat(theme.palette.background.default),
    boxSizing: 'content-box',
    marginLeft: -8,
    '&:last-child': {
      marginLeft: 0
    }
  }), _defineProperty(_ref2, "display", 'flex'), _defineProperty(_ref2, "flexDirection", 'row-reverse'), _ref2;
});
var AvatarGroupAvatar = styled(Avatar, {
  name: 'MuiAvatarGroup',
  slot: 'Avatar',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.avatar;
  }
})(function (_ref3) {
  var theme = _ref3.theme;
  return {
    border: "2px solid ".concat(theme.palette.background.default),
    boxSizing: 'content-box',
    marginLeft: -8,
    '&:last-child': {
      marginLeft: 0
    }
  };
});
var AvatarGroup = /*#__PURE__*/React.forwardRef(function AvatarGroup(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiAvatarGroup'
  });

  var childrenProp = props.children,
      className = props.className,
      _props$max = props.max,
      max = _props$max === void 0 ? 5 : _props$max,
      _props$spacing = props.spacing,
      spacing = _props$spacing === void 0 ? 'medium' : _props$spacing,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'circular' : _props$variant,
      other = _objectWithoutProperties(props, ["children", "className", "max", "spacing", "variant"]);

  var clampedMax = max < 2 ? 2 : max;

  var styleProps = _extends({}, props, {
    max: max,
    spacing: spacing,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  var children = React.Children.toArray(childrenProp).filter(function (child) {
    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(["Material-UI: The AvatarGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    return /*#__PURE__*/React.isValidElement(child);
  });
  var extraAvatars = children.length > clampedMax ? children.length - clampedMax + 1 : 0;
  var marginLeft = spacing && SPACINGS[spacing] !== undefined ? SPACINGS[spacing] : -spacing;
  return /*#__PURE__*/_jsxs(AvatarGroupRoot, _extends({
    styleProps: styleProps,
    className: clsx(classes.root, className),
    ref: ref
  }, other, {
    children: [extraAvatars ? /*#__PURE__*/_jsxs(AvatarGroupAvatar, {
      styleProps: styleProps,
      className: classes.avatar,
      style: {
        marginLeft: marginLeft
      },
      variant: variant,
      children: ["+", extraAvatars]
    }) : null, children.slice(0, children.length - extraAvatars).reverse().map(function (child) {
      return /*#__PURE__*/React.cloneElement(child, {
        className: clsx(child.props.className, classes.avatar),
        style: _extends({
          marginLeft: marginLeft
        }, child.props.style),
        variant: child.props.variant || variant
      });
    })]
  }));
});
process.env.NODE_ENV !== "production" ? AvatarGroup.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The avatars to stack.
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
   * Max avatars to show before +x.
   * @default 5
   */
  max: chainPropTypes(PropTypes.number, function (props) {
    if (props.max < 2) {
      return new Error(['Material-UI: The prop `max` should be equal to 2 or above.', 'A value below is clamped to 2.'].join('\n'));
    }

    return null;
  }),

  /**
   * Spacing between avatars.
   * @default 'medium'
   */
  spacing: PropTypes.oneOfType([PropTypes.oneOf(['medium', 'small']), PropTypes.number]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The variant to use.
   * @default 'circular'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['circular', 'rounded', 'square']), PropTypes.string])
} : void 0;
export default AvatarGroup;