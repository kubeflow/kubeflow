import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Person from '../internal/svg-icons/Person';
import { getAvatarUtilityClass } from './avatarClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      variant = styleProps.variant,
      colorDefault = styleProps.colorDefault;
  var slots = {
    root: ['root', variant, colorDefault && 'colorDefault'],
    img: ['img'],
    fallback: ['fallback']
  };
  return composeClasses(slots, getAvatarUtilityClass, classes);
};

var AvatarRoot = styled('div', {
  name: 'MuiAvatar',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles[styleProps.variant], styleProps.colorDefault && styles.colorDefault];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 40,
    height: 40,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(20),
    lineHeight: 1,
    borderRadius: '50%',
    overflow: 'hidden',
    userSelect: 'none'
  }, styleProps.variant === 'rounded' && {
    borderRadius: theme.shape.borderRadius
  }, styleProps.variant === 'square' && {
    borderRadius: 0
  }, styleProps.colorDefault && {
    color: theme.palette.background.default,
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
  });
});
var AvatarImg = styled('img', {
  name: 'MuiAvatar',
  slot: 'Img',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.img;
  }
})({
  width: '100%',
  height: '100%',
  textAlign: 'center',
  // Handle non-square image. The property isn't supported by IE11.
  objectFit: 'cover',
  // Hide alt text.
  color: 'transparent',
  // Hide the image broken icon, only works on Chrome.
  textIndent: 10000
});
var AvatarFallback = styled(Person, {
  name: 'MuiAvatar',
  slot: 'Fallback',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.fallback;
  }
})({
  width: '75%',
  height: '75%'
});

function useLoaded(_ref2) {
  var crossOrigin = _ref2.crossOrigin,
      referrerPolicy = _ref2.referrerPolicy,
      src = _ref2.src,
      srcSet = _ref2.srcSet;

  var _React$useState = React.useState(false),
      loaded = _React$useState[0],
      setLoaded = _React$useState[1];

  React.useEffect(function () {
    if (!src && !srcSet) {
      return undefined;
    }

    setLoaded(false);
    var active = true;
    var image = new Image();

    image.onload = function () {
      if (!active) {
        return;
      }

      setLoaded('loaded');
    };

    image.onerror = function () {
      if (!active) {
        return;
      }

      setLoaded('error');
    };

    image.crossOrigin = crossOrigin;
    image.referrerPolicy = referrerPolicy;
    image.src = src;

    if (srcSet) {
      image.srcset = srcSet;
    }

    return function () {
      active = false;
    };
  }, [crossOrigin, referrerPolicy, src, srcSet]);
  return loaded;
}

var Avatar = /*#__PURE__*/React.forwardRef(function Avatar(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiAvatar'
  });

  var alt = props.alt,
      childrenProp = props.children,
      className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? 'div' : _props$component,
      imgProps = props.imgProps,
      sizes = props.sizes,
      src = props.src,
      srcSet = props.srcSet,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'circular' : _props$variant,
      other = _objectWithoutProperties(props, ["alt", "children", "className", "component", "imgProps", "sizes", "src", "srcSet", "variant"]);

  var children = null; // Use a hook instead of onError on the img element to support server-side rendering.

  var loaded = useLoaded(_extends({}, imgProps, {
    src: src,
    srcSet: srcSet
  }));
  var hasImg = src || srcSet;
  var hasImgNotFailing = hasImg && loaded !== 'error';

  var styleProps = _extends({}, props, {
    colorDefault: !hasImgNotFailing,
    component: component,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);

  if (hasImgNotFailing) {
    children = /*#__PURE__*/_jsx(AvatarImg, _extends({
      alt: alt,
      src: src,
      srcSet: srcSet,
      sizes: sizes,
      styleProps: styleProps,
      className: classes.img
    }, imgProps));
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (hasImg && alt) {
    children = alt[0];
  } else {
    children = /*#__PURE__*/_jsx(AvatarFallback, {
      className: classes.fallback
    });
  }

  return /*#__PURE__*/_jsx(AvatarRoot, _extends({
    as: component,
    styleProps: styleProps,
    className: clsx(classes.root, className),
    ref: ref
  }, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? Avatar.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: PropTypes.string,

  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
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
  component: PropTypes.elementType,

  /**
   * <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes">Attributes</a> applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
   */
  imgProps: PropTypes.object,

  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes: PropTypes.string,

  /**
   * The `src` attribute for the `img` element.
   */
  src: PropTypes.string,

  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet: PropTypes.string,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The shape of the avatar.
   * @default 'circular'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['circular', 'rounded', 'square']), PropTypes.string])
} : void 0;
export default Avatar;