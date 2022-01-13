import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@material-ui/core/styles';
import { generateUtilityClasses } from '@material-ui/unstyled';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { jsx as _jsx } from "react/jsx-runtime";
var classes = generateUtilityClasses('PrivatePickersSlideTransition', ['root', 'slideEnter-left', 'slideEnter-right', 'slideEnterActive', 'slideEnterActive', 'slideExit', 'slideExitActiveLeft-left', 'slideExitActiveLeft-right']);
export var slideAnimationDuration = 350;
var PickersSlideTransitionRoot = styled(TransitionGroup, {
  skipSx: true
})(function (_ref) {
  var _ref2;

  var theme = _ref.theme;
  var slideTransition = theme.transitions.create('transform', {
    duration: slideAnimationDuration,
    easing: 'cubic-bezier(0.35, 0.8, 0.4, 1)'
  });
  return _ref2 = {
    display: 'block',
    position: 'relative',
    overflowX: 'hidden',
    '& > *': {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0
    }
  }, _defineProperty(_ref2, "& .".concat(classes['slideEnter-left']), {
    willChange: 'transform',
    transform: 'translate(100%)',
    zIndex: 1
  }), _defineProperty(_ref2, "& .".concat(classes['slideEnter-right']), {
    willChange: 'transform',
    transform: 'translate(-100%)',
    zIndex: 1
  }), _defineProperty(_ref2, "& .".concat(classes.slideEnterActive), {
    transform: 'translate(0%)',
    transition: slideTransition
  }), _defineProperty(_ref2, "& .".concat(classes.slideExit), {
    transform: 'translate(0%)'
  }), _defineProperty(_ref2, "& .".concat(classes['slideExitActiveLeft-left']), {
    willChange: 'transform',
    transform: 'translate(-100%)',
    transition: slideTransition,
    zIndex: 0
  }), _defineProperty(_ref2, "& .".concat(classes['slideExitActiveLeft-right']), {
    willChange: 'transform',
    transform: 'translate(100%)',
    transition: slideTransition,
    zIndex: 0
  }), _ref2;
});
/**
 * @ignore - do not document.
 */

var PickersSlideTransition = function PickersSlideTransition(_ref3) {
  var children = _ref3.children,
      className = _ref3.className,
      reduceAnimations = _ref3.reduceAnimations,
      slideDirection = _ref3.slideDirection,
      transKey = _ref3.transKey,
      other = _objectWithoutProperties(_ref3, ["children", "className", "reduceAnimations", "slideDirection", "transKey"]);

  if (reduceAnimations) {
    return /*#__PURE__*/_jsx("div", {
      className: clsx(classes.root, className),
      children: children
    });
  }

  var transitionClasses = {
    exit: classes.slideExit,
    enterActive: classes.slideEnterActive,
    enter: classes["slideEnter-".concat(slideDirection)],
    exitActive: classes["slideExitActiveLeft-".concat(slideDirection)]
  };
  return /*#__PURE__*/_jsx(PickersSlideTransitionRoot, {
    className: clsx(classes.root, className),
    childFactory: function childFactory(element) {
      return /*#__PURE__*/React.cloneElement(element, {
        classNames: transitionClasses
      });
    },
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