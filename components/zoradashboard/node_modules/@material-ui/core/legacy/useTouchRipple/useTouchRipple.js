import * as React from 'react';
import { useEventCallback } from '../utils';

var useTouchRipple = function useTouchRipple(props) {
  var disabled = props.disabled,
      disableFocusRipple = props.disableFocusRipple,
      disableRipple = props.disableRipple,
      disableTouchRipple = props.disableTouchRipple,
      focusVisible = props.focusVisible,
      rippleRef = props.rippleRef;
  React.useEffect(function () {
    if (focusVisible && !disableFocusRipple && !disableRipple) {
      var _rippleRef$current;

      (_rippleRef$current = rippleRef.current) == null ? void 0 : _rippleRef$current.pulsate();
    }
  }, [rippleRef, focusVisible, disableFocusRipple, disableRipple]);

  function useRippleHandler(rippleAction, eventCallback) {
    var skipRippleAction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : disableTouchRipple;
    return useEventCallback(function (event) {
      eventCallback == null ? void 0 : eventCallback(event);

      if (!skipRippleAction && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }

      return true;
    });
  }

  var keydownRef = React.useRef(false);
  var handleKeyDown = useEventCallback(function (event) {
    if (!disableFocusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === ' ') {
      keydownRef.current = true;
      rippleRef.current.stop(event, function () {
        var _rippleRef$current2;

        rippleRef == null ? void 0 : (_rippleRef$current2 = rippleRef.current) == null ? void 0 : _rippleRef$current2.start(event);
      });
    }
  });
  var handleKeyUp = useEventCallback(function (event) {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0
    if (!disableFocusRipple && event.key === ' ' && rippleRef.current && focusVisible && !event.defaultPrevented) {
      keydownRef.current = false;
      rippleRef.current.stop(event, function () {
        var _rippleRef$current3;

        rippleRef == null ? void 0 : (_rippleRef$current3 = rippleRef.current) == null ? void 0 : _rippleRef$current3.pulsate(event);
      });
    }
  });
  var handleBlur = useRippleHandler('stop');
  var handleMouseDown = useRippleHandler('start');
  var handleContextMenu = useRippleHandler('stop');
  var handleDragLeave = useRippleHandler('stop');
  var handleMouseUp = useRippleHandler('stop');
  var handleMouseLeave = useRippleHandler('stop');
  var handleTouchStart = useRippleHandler('start');
  var handleTouchEnd = useRippleHandler('stop');
  var handleTouchMove = useRippleHandler('stop');

  var _React$useState = React.useState(false),
      mountedState = _React$useState[0],
      setMountedState = _React$useState[1];

  React.useEffect(function () {
    setMountedState(true);
  }, []);
  var enableTouchRipple = mountedState && !disableRipple && !disabled;
  var getRippleHandlers = React.useMemo(function () {
    var rippleHandlers = {
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onContextMenu: handleContextMenu,
      onDragLeave: handleDragLeave,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchMove: handleTouchMove
    };
    return function () {
      var otherEvents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var eventNames = Object.keys(rippleHandlers);
      var wrappedEvents = eventNames.map(function (eventName) {
        return {
          name: eventName,
          handler: function handler(ev) {
            var _otherEvents$eventNam;

            (_otherEvents$eventNam = otherEvents[eventName]) == null ? void 0 : _otherEvents$eventNam.call(otherEvents, ev);
            rippleHandlers[eventName](ev);
          }
        };
      });
      return wrappedEvents.reduce(function (acc, current) {
        acc[current.name] = current.handler;
        return acc;
      }, {});
    };
  }, [handleBlur, handleKeyDown, handleKeyUp, handleMouseDown, handleMouseUp, handleMouseLeave, handleContextMenu, handleDragLeave, handleTouchStart, handleTouchEnd, handleTouchMove]);
  return {
    enableTouchRipple: enableTouchRipple,
    getRippleHandlers: getRippleHandlers
  };
};

export default useTouchRipple;