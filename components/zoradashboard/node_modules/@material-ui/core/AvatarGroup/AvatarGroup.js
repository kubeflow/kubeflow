import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["children", "className", "max", "spacing", "variant"];
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
const SPACINGS = {
  small: -16,
  medium: null
};

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root'],
    avatar: ['avatar']
  };
  return composeClasses(slots, getAvatarGroupUtilityClass, classes);
};

const AvatarGroupRoot = styled('div', {
  name: 'MuiAvatarGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => _extends({
    [`& .${avatarGroupClasses.avatar}`]: styles.avatar
  }, styles.root)
})(({
  theme
}) => ({
  [`& .MuiAvatar-root`]: {
    border: `2px solid ${theme.palette.background.default}`,
    boxSizing: 'content-box',
    marginLeft: -8,
    '&:last-child': {
      marginLeft: 0
    }
  },
  display: 'flex',
  flexDirection: 'row-reverse'
}));
const AvatarGroupAvatar = styled(Avatar, {
  name: 'MuiAvatarGroup',
  slot: 'Avatar',
  overridesResolver: (props, styles) => styles.avatar
})(({
  theme
}) => ({
  border: `2px solid ${theme.palette.background.default}`,
  boxSizing: 'content-box',
  marginLeft: -8,
  '&:last-child': {
    marginLeft: 0
  }
}));
const AvatarGroup = /*#__PURE__*/React.forwardRef(function AvatarGroup(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiAvatarGroup'
  });

  const {
    children: childrenProp,
    className,
    max = 5,
    spacing = 'medium',
    variant = 'circular'
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const clampedMax = max < 2 ? 2 : max;

  const styleProps = _extends({}, props, {
    max,
    spacing,
    variant
  });

  const classes = useUtilityClasses(styleProps);
  const children = React.Children.toArray(childrenProp).filter(child => {
    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(["Material-UI: The AvatarGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    return /*#__PURE__*/React.isValidElement(child);
  });
  const extraAvatars = children.length > clampedMax ? children.length - clampedMax + 1 : 0;
  const marginLeft = spacing && SPACINGS[spacing] !== undefined ? SPACINGS[spacing] : -spacing;
  return /*#__PURE__*/_jsxs(AvatarGroupRoot, _extends({
    styleProps: styleProps,
    className: clsx(classes.root, className),
    ref: ref
  }, other, {
    children: [extraAvatars ? /*#__PURE__*/_jsxs(AvatarGroupAvatar, {
      styleProps: styleProps,
      className: classes.avatar,
      style: {
        marginLeft
      },
      variant: variant,
      children: ["+", extraAvatars]
    }) : null, children.slice(0, children.length - extraAvatars).reverse().map(child => {
      return /*#__PURE__*/React.cloneElement(child, {
        className: clsx(child.props.className, classes.avatar),
        style: _extends({
          marginLeft
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
  max: chainPropTypes(PropTypes.number, props => {
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