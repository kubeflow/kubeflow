import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { elementTypeAcceptingRef } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { duration } from '../styles/createTransitions';
import { getTransitionProps } from '../transitions/utils';
import useTheme from '../styles/useTheme';
import { useForkRef } from '../utils';
import { getCollapseUtilityClass } from './collapseClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var orientation = styleProps.orientation,
      classes = styleProps.classes;
  var slots = {
    root: ['root', "".concat(orientation)],
    entered: ['entered'],
    hidden: ['hidden'],
    wrapper: ['wrapper', "".concat(orientation)],
    wrapperInner: ['wrapperInner', "".concat(orientation)]
  };
  return composeClasses(slots, getCollapseUtilityClass, classes);
};

var CollapseRoot = styled('div', {
  name: 'MuiCollapse',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, styles[styleProps.orientation], styleProps.state === 'entered' && styles.entered, styleProps.state === 'exited' && !styleProps.in && styleProps.collapsedSize === '0px' && styles.hidden];
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    height: 0,
    overflow: 'hidden',
    transition: theme.transitions.create('height')
  }, styleProps.orientation === 'horizontal' && {
    height: 'auto',
    width: 0,
    transition: theme.transitions.create('width')
  }, styleProps.state === 'entered' && _extends({
    height: 'auto',
    overflow: 'visible'
  }, styleProps.orientation === 'horizontal' && {
    width: 'auto'
  }), styleProps.state === 'exited' && !styleProps.in && styleProps.collapsedSize === '0px' && {
    visibility: 'hidden'
  });
});
var CollapseWrapper = styled('div', {
  name: 'MuiCollapse',
  slot: 'Wrapper',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.wrapper;
  }
})(function (_ref2) {
  var styleProps = _ref2.styleProps;
  return _extends({
    // Hack to get children with a negative margin to not falsify the height computation.
    display: 'flex',
    width: '100%'
  }, styleProps.orientation === 'horizontal' && {
    width: 'auto',
    height: '100%'
  });
});
var CollapseWrapperInner = styled('div', {
  name: 'MuiCollapse',
  slot: 'WrapperInner',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.wrapperInner;
  }
})(function (_ref3) {
  var styleProps = _ref3.styleProps;
  return _extends({
    width: '100%'
  }, styleProps.orientation === 'horizontal' && {
    width: 'auto',
    height: '100%'
  });
});
/**
 * The Collapse transition is used by the
 * [Vertical Stepper](/components/steppers/#vertical-stepper) StepContent component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */

var Collapse = /*#__PURE__*/React.forwardRef(function Collapse(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiCollapse'
  });

  var _children = props.children,
      className = props.className,
      _props$collapsedSize = props.collapsedSize,
      collapsedSizeProp = _props$collapsedSize === void 0 ? '0px' : _props$collapsedSize,
      component = props.component,
      easing = props.easing,
      inProp = props.in,
      onEnter = props.onEnter,
      onEntered = props.onEntered,
      onEntering = props.onEntering,
      onExit = props.onExit,
      onExited = props.onExited,
      onExiting = props.onExiting,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? 'vertical' : _props$orientation,
      style = props.style,
      _props$timeout = props.timeout,
      timeout = _props$timeout === void 0 ? duration.standard : _props$timeout,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? Transition : _props$TransitionComp,
      other = _objectWithoutProperties(props, ["children", "className", "collapsedSize", "component", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "orientation", "style", "timeout", "TransitionComponent"]);

  var styleProps = _extends({}, props, {
    orientation: orientation,
    collapsedSize: collapsedSizeProp
  });

  var classes = useUtilityClasses(styleProps);
  var theme = useTheme();
  var timer = React.useRef();
  var wrapperRef = React.useRef(null);
  var autoTransitionDuration = React.useRef();
  var collapsedSize = typeof collapsedSizeProp === 'number' ? "".concat(collapsedSizeProp, "px") : collapsedSizeProp;
  var isHorizontal = orientation === 'horizontal';
  var size = isHorizontal ? 'width' : 'height';
  React.useEffect(function () {
    return function () {
      clearTimeout(timer.current);
    };
  }, []);
  var nodeRef = React.useRef(null);
  var handleRef = useForkRef(ref, nodeRef);

  var normalizedTransitionCallback = function normalizedTransitionCallback(callback) {
    return function (maybeIsAppearing) {
      if (callback) {
        var node = nodeRef.current; // onEnterXxx and onExitXxx callbacks have a different arguments.length value.

        if (maybeIsAppearing === undefined) {
          callback(node);
        } else {
          callback(node, maybeIsAppearing);
        }
      }
    };
  };

  var getWrapperSize = function getWrapperSize() {
    return wrapperRef.current ? wrapperRef.current[isHorizontal ? 'clientWidth' : 'clientHeight'] : 0;
  };

  var handleEnter = normalizedTransitionCallback(function (node, isAppearing) {
    if (wrapperRef.current && isHorizontal) {
      // Set absolute position to get the size of collapsed content
      wrapperRef.current.style.position = 'absolute';
    }

    node.style[size] = collapsedSize;

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  var handleEntering = normalizedTransitionCallback(function (node, isAppearing) {
    var wrapperSize = getWrapperSize();

    if (wrapperRef.current && isHorizontal) {
      // After the size is read reset the position back to default
      wrapperRef.current.style.position = '';
    }

    var _getTransitionProps = getTransitionProps({
      style: style,
      timeout: timeout,
      easing: easing
    }, {
      mode: 'enter'
    }),
        transitionDuration = _getTransitionProps.duration,
        transitionTimingFunction = _getTransitionProps.easing;

    if (timeout === 'auto') {
      var duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = "".concat(duration2, "ms");
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration = typeof transitionDuration === 'string' ? transitionDuration : "".concat(transitionDuration, "ms");
    }

    node.style[size] = "".concat(wrapperSize, "px");
    node.style.transitionTimingFunction = transitionTimingFunction;

    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });
  var handleEntered = normalizedTransitionCallback(function (node, isAppearing) {
    node.style[size] = 'auto';

    if (onEntered) {
      onEntered(node, isAppearing);
    }
  });
  var handleExit = normalizedTransitionCallback(function (node) {
    node.style[size] = "".concat(getWrapperSize(), "px");

    if (onExit) {
      onExit(node);
    }
  });
  var handleExited = normalizedTransitionCallback(onExited);
  var handleExiting = normalizedTransitionCallback(function (node) {
    var wrapperSize = getWrapperSize();

    var _getTransitionProps2 = getTransitionProps({
      style: style,
      timeout: timeout,
      easing: easing
    }, {
      mode: 'exit'
    }),
        transitionDuration = _getTransitionProps2.duration,
        transitionTimingFunction = _getTransitionProps2.easing;

    if (timeout === 'auto') {
      // TODO: rename getAutoHeightDuration to something more generic (width support)
      // Actually it just calculates animation duration based on size
      var duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = "".concat(duration2, "ms");
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration = typeof transitionDuration === 'string' ? transitionDuration : "".concat(transitionDuration, "ms");
    }

    node.style[size] = collapsedSize;
    node.style.transitionTimingFunction = transitionTimingFunction;

    if (onExiting) {
      onExiting(node);
    }
  });

  var addEndListener = function addEndListener(next) {
    if (timeout === 'auto') {
      timer.current = setTimeout(next, autoTransitionDuration.current || 0);
    }
  };

  return /*#__PURE__*/_jsx(TransitionComponent, _extends({
    in: inProp,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: addEndListener,
    nodeRef: nodeRef,
    timeout: timeout === 'auto' ? null : timeout
  }, other, {
    children: function children(state, childProps) {
      return /*#__PURE__*/_jsx(CollapseRoot, _extends({
        as: component,
        className: clsx(classes.root, className, {
          'entered': classes.entered,
          'exited': !inProp && collapsedSize === '0px' && classes.hidden
        }[state]),
        style: _extends(_defineProperty({}, isHorizontal ? 'minWidth' : 'minHeight', collapsedSize), style),
        styleProps: _extends({}, styleProps, {
          state: state
        }),
        ref: handleRef
      }, childProps, {
        children: /*#__PURE__*/_jsx(CollapseWrapper, {
          styleProps: _extends({}, styleProps, {
            state: state
          }),
          className: classes.wrapper,
          ref: wrapperRef,
          children: /*#__PURE__*/_jsx(CollapseWrapperInner, {
            styleProps: _extends({}, styleProps, {
              state: state
            }),
            className: classes.wrapperInner,
            children: _children
          })
        })
      }));
    }
  }));
});
process.env.NODE_ENV !== "production" ? Collapse.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content node to be collapsed.
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
   * The width (horizontal) or height (vertical) of the container when collapsed.
   * @default '0px'
   */
  collapsedSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,

  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: PropTypes.oneOfType([PropTypes.shape({
    enter: PropTypes.string,
    exit: PropTypes.string
  }), PropTypes.string]),

  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,

  /**
   * @ignore
   */
  onEnter: PropTypes.func,

  /**
   * @ignore
   */
  onEntered: PropTypes.func,

  /**
   * @ignore
   */
  onEntering: PropTypes.func,

  /**
   * @ignore
   */
  onExit: PropTypes.func,

  /**
   * @ignore
   */
  onExited: PropTypes.func,

  /**
   * @ignore
   */
  onExiting: PropTypes.func,

  /**
   * The transition orientation.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * @ignore
   */
  style: PropTypes.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default duration.standard
   */
  timeout: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
Collapse.muiSupportAuto = true;
export default Collapse;