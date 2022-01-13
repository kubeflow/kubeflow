import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["children", "className", "reduceAnimations", "slideDirection", "transKey"];
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@material-ui/core/styles';
import { generateUtilityClasses } from '@material-ui/unstyled';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { jsx as _jsx } from "react/jsx-runtime";
const classes = generateUtilityClasses('PrivatePickersSlideTransition', ['root', 'slideEnter-left', 'slideEnter-right', 'slideEnterActive', 'slideEnterActive', 'slideExit', 'slideExitActiveLeft-left', 'slideExitActiveLeft-right']);
export const slideAnimationDuration = 350;
const PickersSlideTransitionRoot = styled(TransitionGroup, {
  skipSx: true
})(({
  theme
}) => {
  const slideTransition = theme.transitions.create('transform', {
    duration: slideAnimationDuration,
    easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)'
  });
  return {
    display: 'block',
    position: 'relative',
    overflowX: 'hidden',
    '& > *': {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0
    },
    [`& .${classes['slideEnter-left']}`]: {
      willChange: 'transform',
      transform: 'translate(100%)',
      zIndex: 1
    },
    [`& .${classes['slideEnter-right']}`]: {
      willChange: 'transform',
      transform: 'translate(-100%)',
      zIndex: 1
    },
    [`& .${classes.slideEnterActive}`]: {
      transform: 'translate(0%)',
      transition: slideTransition
    },
    [`& .${classes.slideExit}`]: {
      transform: 'translate(0%)'
    },
    [`& .${classes['slideExitActiveLeft-left']}`]: {
      willChange: 'transform',
      transform: 'translate(-100%)',
      transition: slideTransition,
      zIndex: 0
    },
    [`& .${classes['slideExitActiveLeft-right']}`]: {
      willChange: 'transform',
      transform: 'translate(100%)',
      transition: slideTransition,
      zIndex: 0
    }
  };
});
/**
 * @ignore - do not document.
 */

const PickersSlideTransition = _ref => {
  let {
    children,
    className,
    reduceAnimations,
    slideDirection,
    transKey
  } = _ref,
      other = _objectWithoutPropertiesLoose(_ref, _excluded);

  if (reduceAnimations) {
    return /*#__PURE__*/_jsx("div", {
      className: clsx(classes.root, className),
      children: children
    });
  }

  const transitionClasses = {
    exit: classes.slideExit,
    enterActive: classes.slideEnterActive,
    enter: classes[`slideEnter-${slideDirection}`],
    exitActive: classes[`slideExitActiveLeft-${slideDirection}`]
  };
  return /*#__PURE__*/_jsx(PickersSlideTransitionRoot, {
    className: clsx(classes.root, className),
    childFactory: element => /*#__PURE__*/React.cloneElement(element, {
      classNames: transitionClasses
    }),
    children: /*#__PURE__*/_jsx(CSSTransition, _extends({
      mountOnEnter: true,
      unmountOnExit: true,
      timeout: slideAnimationDuration,
      classNames: transitionClasses
    }, other, {
      children: children
    }), transKey)
  });
};

export default PickersSlideTransition;