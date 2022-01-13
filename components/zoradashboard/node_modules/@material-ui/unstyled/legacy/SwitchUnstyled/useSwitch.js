import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { unstable_useControlled as useControlled, unstable_useEventCallback as useEventCallback, unstable_useForkRef as useForkRef, unstable_useIsFocusVisible as useIsFocusVisible } from '@material-ui/utils';

/**
 * The basic building block for creating custom switches.
 *
 * Demos:
 *
 * - [Switches](https://material-ui.com/components/switches/)
 */
export default function useSwitch(props) {
  var checkedProp = props.checked,
      defaultChecked = props.defaultChecked,
      disabled = props.disabled,
      onBlur = props.onBlur,
      onChange = props.onChange,
      onFocus = props.onFocus,
      onFocusVisible = props.onFocusVisible,
      readOnly = props.readOnly,
      required = props.required;

  var _useControlled = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'Switch',
    state: 'checked'
  }),
      _useControlled2 = _slicedToArray(_useControlled, 2),
      checked = _useControlled2[0],
      setCheckedState = _useControlled2[1];

  var handleInputChange = useEventCallback(function (event, otherHandler) {
    // Workaround for https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented) {
      return;
    }

    setCheckedState(event.target.checked);
    onChange == null ? void 0 : onChange(event);
    otherHandler == null ? void 0 : otherHandler(event);
  });

  var _useIsFocusVisible = useIsFocusVisible(),
      isFocusVisibleRef = _useIsFocusVisible.isFocusVisibleRef,
      handleBlurVisible = _useIsFocusVisible.onBlur,
      handleFocusVisible = _useIsFocusVisible.onFocus,
      focusVisibleRef = _useIsFocusVisible.ref;

  var _React$useState = React.useState(false),
      focusVisible = _React$useState[0],
      setFocusVisible = _React$useState[1];

  if (disabled && focusVisible) {
    setFocusVisible(false);
  }

  React.useEffect(function () {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  var inputRef = React.useRef(null);
  var handleFocus = useEventCallback(function (event, otherHandler) {
    // Fix for https://github.com/facebook/react/issues/7769
    if (!inputRef.current) {
      inputRef.current = event.currentTarget;
    }

    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      onFocusVisible == null ? void 0 : onFocusVisible(event);
    }

    onFocus == null ? void 0 : onFocus(event);
    otherHandler == null ? void 0 : otherHandler(event);
  });
  var handleBlur = useEventCallback(function (event, otherHandler) {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    onBlur == null ? void 0 : onBlur(event);
    otherHandler == null ? void 0 : otherHandler(event);
  });
  var handleRefChange = useForkRef(focusVisibleRef, inputRef);

  var getInputProps = function getInputProps() {
    var otherProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _extends({
      checked: checkedProp,
      defaultChecked: defaultChecked,
      disabled: disabled,
      readOnly: readOnly,
      required: required,
      type: 'checkbox'
    }, otherProps, {
      onChange: function onChange(event) {
        return handleInputChange(event, otherProps.onChange);
      },
      onFocus: function onFocus(event) {
        return handleFocus(event, otherProps.onFocus);
      },
      onBlur: function onBlur(event) {
        return handleBlur(event, otherProps.onBlur);
      },
      ref: handleRefChange
    });
  };

  return {
    checked: checked,
    disabled: Boolean(disabled),
    focusVisible: focusVisible,
    getInputProps: getInputProps,
    readOnly: Boolean(readOnly)
  };
}