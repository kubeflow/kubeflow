import * as React from 'react';
export function useOpenState(_ref) {
  var open = _ref.open,
      onOpen = _ref.onOpen,
      onClose = _ref.onClose;
  var isControllingOpenProp = React.useRef(typeof open === 'boolean').current;

  var _React$useState = React.useState(false),
      openState = _React$useState[0],
      setIsOpenState = _React$useState[1]; // It is required to update inner state in useEffect in order to avoid situation when
  // Our component is not mounted yet, but `open` state is set to `true` (e.g. initially opened)


  React.useEffect(function () {
    if (isControllingOpenProp) {
      if (typeof open !== 'boolean') {
        throw new Error('You must not mix controlling and uncontrolled mode for `open` prop');
      }

      setIsOpenState(open);
    }
  }, [isControllingOpenProp, open]);
  var setIsOpen = React.useCallback(function (newIsOpen) {
    if (!isControllingOpenProp) {
      setIsOpenState(newIsOpen);
    }

    if (newIsOpen && onOpen) {
      onOpen();
    }

    if (!newIsOpen && onClose) {
      onClose();
    }
  }, [isControllingOpenProp, onOpen, onClose]);
  return {
    isOpen: openState,
    setIsOpen: setIsOpen
  };
}
export default useOpenState;