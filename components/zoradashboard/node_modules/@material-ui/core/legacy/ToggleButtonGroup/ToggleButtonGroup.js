import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import isValueSelected from './isValueSelected';
import toggleButtonGroupClasses, { getToggleButtonGroupUtilityClass } from './toggleButtonGroupClasses';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      orientation = styleProps.orientation,
      fullWidth = styleProps.fullWidth;
  var slots = {
    root: ['root', orientation === 'vertical' && 'vertical', fullWidth && 'fullWidth'],
    grouped: ['grouped', "grouped".concat(capitalize(orientation))]
  };
  return composeClasses(slots, getToggleButtonGroupUtilityClass, classes);
};

var ToggleButtonGroupRoot = styled('div', {
  name: 'MuiToggleButtonGroup',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [_defineProperty({}, "& .".concat(toggleButtonGroupClasses.grouped), styles.grouped), _defineProperty({}, "& .".concat(toggleButtonGroupClasses.grouped), styles["grouped".concat(capitalize(styleProps.orientation))]), styles.root, styleProps.orientation === 'vertical' && styles.vertical, styleProps.fullWidth && styles.fullWidth];
  }
})(function (_ref3) {
  var styleProps = _ref3.styleProps,
      theme = _ref3.theme;
  return _extends({
    display: 'inline-flex',
    borderRadius: theme.shape.borderRadius
  }, styleProps.orientation === 'vertical' && {
    flexDirection: 'column'
  }, styleProps.fullWidth && {
    width: '100%'
  }, _defineProperty({}, "& .".concat(toggleButtonGroupClasses.grouped), _extends({}, styleProps.orientation === 'horizontal' ? _defineProperty({
    '&:not(:first-of-type)': {
      marginLeft: -1,
      borderLeft: '1px solid transparent',
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    },
    '&:not(:last-of-type)': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    }
  }, "&.".concat(toggleButtonGroupClasses.selected, " + .").concat(toggleButtonGroupClasses.grouped, ".").concat(toggleButtonGroupClasses.selected), {
    borderLeft: 0,
    marginLeft: 0
  }) : _defineProperty({
    '&:not(:first-of-type)': {
      marginTop: -1,
      borderTop: '1px solid transparent',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    },
    '&:not(:last-of-type)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
  }, "&.".concat(toggleButtonGroupClasses.selected, " + .").concat(toggleButtonGroupClasses.grouped, ".").concat(toggleButtonGroupClasses.selected), {
    borderTop: 0,
    marginTop: 0
  }))));
});
var ToggleButtonGroup = /*#__PURE__*/React.forwardRef(function ToggleButtonGroup(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiToggleButtonGroup'
  });

  var children = props.children,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'standard' : _props$color,
      _props$exclusive = props.exclusive,
      exclusive = _props$exclusive === void 0 ? false : _props$exclusive,
      _props$fullWidth = props.fullWidth,
      fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
      onChange = props.onChange,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      value = props.value,
      other = _objectWithoutProperties(props, ["children", "className", "color", "exclusive", "fullWidth", "onChange", "orientation", "size", "value"]);

  var styleProps = _extends({}, props, {
    fullWidth: fullWidth,
    orientation: orientation,
    size: size
  });

  var classes = useUtilityClasses(styleProps);

  var handleChange = function handleChange(event, buttonValue) {
    if (!onChange) {
      return;
    }

    var index = value && value.indexOf(buttonValue);
    var newValue;

    if (value && index >= 0) {
      newValue = value.slice();
      newValue.splice(index, 1);
    } else {
      newValue = value ? value.concat(buttonValue) : [buttonValue];
    }

    onChange(event, newValue);
  };

  var handleExclusiveChange = function handleExclusiveChange(event, buttonValue) {
    if (!onChange) {
      return;
    }

    onChange(event, value === buttonValue ? null : buttonValue);
  };

  return /*#__PURE__*/_jsx(ToggleButtonGroupRoot, _extends({
    role: "group",
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: React.Children.map(children, function (child) {
      if (! /*#__PURE__*/React.isValidElement(child)) {
        return null;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (isFragment(child)) {
          console.error(["Material-UI: The ToggleButtonGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
        }
      }

      return /*#__PURE__*/React.cloneElement(child, {
        className: clsx(classes.grouped, child.props.className),
        onChange: exclusive ? handleExclusiveChange : handleChange,
        selected: child.props.selected === undefined ? isValueSelected(child.props.value, value) : child.props.selected,
        size: child.props.size || size,
        fullWidth: fullWidth,
        color: child.props.color || color
      });
    })
  }));
});
process.env.NODE_ENV !== "production" ? ToggleButtonGroup.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
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
   * The color of a button when it is selected.
   * @default 'standard'
   */
  color: PropTypes.oneOf(['error', 'info', 'primary', 'secondary', 'standard', 'success', 'warning']),

  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   * @default false
   */
  exclusive: PropTypes.bool,

  /**
   * If `true`, the button group will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,

  /**
   * Callback fired when the value changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange: PropTypes.func,

  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['small', 'medium', 'large']), PropTypes.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   *
   * The value must have reference equality with the option in order to be selected.
   */
  value: PropTypes.any
} : void 0;
export default ToggleButtonGroup;