"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _utils = require("../utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    return (0, _utils.useEventCallback)(event => {
      eventCallback == null ? void 0 : eventCallback(event);

      if (!skipRippleAction && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }

      return true;
    });
  }

  const keydownRef = React.useRef(false);
  const handleKeyDown = (0, _utils.useEventCallback)(event => {
    if (!disableFocusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === ' ') {
      keydownRef.current = true;
      rippleRef.current.stop(event, () => {
        var _rippleRef$current2;

        rippleRef == null ? void 0 : (_rippleRef$current2 = rippleRef.current) == null ? void 0 : _rippleRef$current2.start(event);
      });
    }
  });
  const handleKeyUp = (0, _utils.useEventCallback)(event => {
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

var _default = useTouchRipple;
exports.default = _default;