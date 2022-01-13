import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import NativeSelectInput from './NativeSelectInput';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import Input from '../Input';
import useThemeProps from '../styles/useThemeProps';
import { getNativeSelectUtilityClasses } from './nativeSelectClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};

var defaultInput = /*#__PURE__*/_jsx(Input, {});
/**
 * An alternative to `<Select native />` with a much smaller bundle size footprint.
 */


var NativeSelect = /*#__PURE__*/React.forwardRef(function NativeSelect(inProps, ref) {
  var props = useThemeProps({
    name: 'MuiNativeSelect',
    props: inProps
  });

  var className = props.className,
      children = props.children,
      _props$classes = props.classes,
      classesProp = _props$classes === void 0 ? {} : _props$classes,
      _props$IconComponent = props.IconComponent,
      IconComponent = _props$IconComponent === void 0 ? ArrowDropDownIcon : _props$IconComponent,
      _props$input = props.input,
      input = _props$input === void 0 ? defaultInput : _props$input,
      inputProps = props.inputProps,
      variant = props.variant,
      other = _objectWithoutProperties(props, ["className", "children", "classes", "IconComponent", "input", "inputProps", "variant"]);

  var muiFormControl = useFormControl();
  var fcs = formControlState({
    props: props,
    muiFormControl: muiFormControl,
    states: ['variant']
  });

  var styleProps = _extends({}, props, {
    classes: classesProp
  });

  var classes = useUtilityClasses(styleProps);

  var root = classesProp.root,
      otherClasses = _objectWithoutProperties(classesProp, ["root"]);

  return /*#__PURE__*/React.cloneElement(input, _extends({
    // Most of the logic is implemented in `NativeSelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent: NativeSelectInput,
    inputProps: _extends({
      children: children,
      classes: otherClasses,
      IconComponent: IconComponent,
      variant: fcs.variant,
      type: undefined
    }, inputProps, input ? input.props.inputProps : {}),
    ref: ref
  }, other, {
    className: clsx(classes.root, input.props.className, className)
  }));
});
process.env.NODE_ENV !== "production" ? NativeSelect.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * @default {}
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: PropTypes.elementType,

  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   * @default <Input />
   */
  input: PropTypes.element,

  /**
   * <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes">Attributes</a> applied to the `select` element.
   */
  inputProps: PropTypes.object,

  /**
   * Callback fired when a menu item is selected.
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The `input` value. The DOM API casts this to a string.
   */
  value: PropTypes.any,

  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
NativeSelect.muiName = 'Select';
export default NativeSelect;