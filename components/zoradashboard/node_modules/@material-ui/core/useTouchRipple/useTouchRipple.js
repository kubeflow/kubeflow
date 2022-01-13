import * as React from 'react';
import { useEventCallback } from '../utils';

const useTouchRipple = props => {
  const {
    disabled,
    disableFocusRipple,
    disableRipple,
    disableTouchRipple,
    focusVisible,
    rippleRef
  } = props;
  React.useEffect(() => {
    if (focusVisible && !disableFocusRipple && !disableRipple) {
      var _rippleRef$current;

      (_rippleRef$current = rippleRef.current) == null ? void 0 : _rippleRef$current.pulsate();
    }
  }, [rippleRef, focusVisible, disableFocusRipple, disableRipple]);

  function useRippleHandler(rippleAction, eventCallback, skipRippleAction = disableTouchRipple) {
    return useEventCallback(event => {
      eventCallback == null ? void 0 : eventCallback(event);

      if (!skipRippleAction && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }

      return true;
    });
  }

  const keydownRef = React.useRef(false);
  const handleKeyDown = useEventCallback(event => {
    if (!disableFocusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === ' ') {
      keydownRef.current = true;
      rippleRef.current.stop(event, () => {
        var _rippleRef$current2;

        rippleRef == null ? void 0 : (_rippleRef$current2 = rippleRef.current) == null ? void 0 : _rippleRef$current2.start(event);
      });
    }
  });
  const handleKeyUp = useEventCallback(event => {
    // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
    // https://codesandbox.io/s/button-keyup-preventdefault-dn7f0
    if (!disableFocusRipple && event.key === ' ' && rippleRef.current && focusVisible && !event.defaultPrevented) {
      keydownRef.current = false;
      rippleRef.current.stop(event, () => {
        var _rippleRef$current3;

        rippleRef == null ? void 0 : (_rippleRef$current3 = rippleRef.current) == null ? void 0 : _rippleRef$current3.pulsate(event);
      });
    }
  });
  const handleBlur = useRippleHandler('stop');
  const handleMouseDown = useRippleHandler('start');
  const handleContextMenu = useRippleHandler('stop');
  const handleDragLeave = useRippleHandler('stop');
  const handleMouseUp = useRippleHandler('stop');
  const handleMouseLeave = useRippleHandler('stop');
  const handleTouchStart = useRippleHandler('start');
  const handleTouchEnd = useRippleHandler('stop');
  const handleTouchMove = useRippleHandler('stop');
  const [mountedState, setMountedState] = React.useState(false);
  React.useEffect(() => {
    setMountedState(true);
  }, []);
  const enableTouchRipple = mountedState && !disableRipple && !disabled;
  const getRippleHandlers = React.useMemo(() => {
    const rippleHandlers = {
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
    return (otherEvents = {}) => {
      const eventNames = Object.keys(rippleHandlers);
      const wrappedEvents = eventNames.map(eventName => ({
        name: eventName,
        handler: ev => {
          var _otherEvents$eventNam;

          (_otherEvents$eventNam = otherEvents[eventName]) == null ? void 0 : _otherEvents$eventNam.call(otherEvents, ev);
          rippleHandlers[eventName](ev);
        }
      }));
      return wrappedEvents.reduce((acc, current) => {
        acc[current.name] = current.handler;
        return acc;
      }, {});
    };
  }, [handleBlur, handleKeyDown, handleKeyUp, handleMouseDown, handleMouseUp, handleMouseLeave, handleContextMenu, handleDragLeave, handleTouchStart, handleTouchEnd, handleTouchMove]);
  return {
    enableTouchRipple,
    getRippleHandlers
  };
};

export default useTouchRipple;