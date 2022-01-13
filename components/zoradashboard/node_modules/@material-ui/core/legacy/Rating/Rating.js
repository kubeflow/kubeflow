import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes, visuallyHidden } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { useTheme } from '../styles';
import { capitalize, useForkRef, useIsFocusVisible, useControlled, unstable_useId as useId } from '../utils';
import Star from '../internal/svg-icons/Star';
import StarBorder from '../internal/svg-icons/StarBorder';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import ratingClasses, { getRatingUtilityClass } from './ratingClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

function getDecimalPrecision(num) {
  var decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToPrecision(value, precision) {
  if (value == null) {
    return value;
  }

  var nearest = Math.round(value / precision) * precision;
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
}

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      size = styleProps.size,
      readOnly = styleProps.readOnly,
      disabled = styleProps.disabled,
      emptyValueFocused = styleProps.emptyValueFocused,
      focusVisible = styleProps.focusVisible;
  var slots = {
    root: ['root', "size".concat(capitalize(size)), disabled && 'disabled', focusVisible && 'focusVisible', readOnly && 'readyOnly'],
    label: ['label', 'pristine'],
    labelEmptyValue: [emptyValueFocused && 'labelEmptyValueActive'],
    icon: ['icon'],
    iconEmpty: ['iconEmpty'],
    iconFilled: ['iconFilled'],
    iconHover: ['iconHover'],
    iconFocus: ['iconFocus'],
    iconActive: ['iconActive'],
    decimal: ['decimal'],
    visuallyHidden: ['visuallyHidden']
  };
  return composeClasses(slots, getRatingUtilityClass, classes);
};

var RatingRoot = styled('span', {
  name: 'MuiRating',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [_defineProperty({}, "& .".concat(ratingClasses.visuallyHidden), styles.visuallyHidden), styles.root, styles["size".concat(capitalize(styleProps.size))], styleProps.readOnly && styles.readOnly];
  }
})(function (_ref2) {
  var _extends2;

  var theme = _ref2.theme,
      styleProps = _ref2.styleProps;
  return _extends((_extends2 = {
    display: 'inline-flex',
    // Required to position the pristine input absolutely
    position: 'relative',
    fontSize: theme.typography.pxToRem(24),
    color: '#faaf00',
    cursor: 'pointer',
    textAlign: 'left',
    WebkitTapHighlightColor: 'transparent'
  }, _defineProperty(_extends2, "&.".concat(ratingClasses.disabled), {
    opacity: theme.palette.action.disabledOpacity,
    pointerEvents: 'none'
  }), _defineProperty(_extends2, "&.".concat(ratingClasses.focusVisible, " .").concat(ratingClasses.iconActive), {
    outline: '1px solid #999'
  }), _defineProperty(_extends2, "& .".concat(ratingClasses.visuallyHidden), visuallyHidden), _extends2), styleProps.size === 'small' && {
    fontSize: theme.typography.pxToRem(18)
  }, styleProps.size === 'large' && {
    fontSize: theme.typography.pxToRem(30)
  }, styleProps.readOnly && {
    pointerEvents: 'none'
  });
});
var RatingLabel = styled('label', {
  name: 'MuiRating',
  slot: 'Label',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.label;
  }
})(function (_ref3) {
  var styleProps = _ref3.styleProps;
  return _extends({
    cursor: 'inherit'
  }, styleProps.emptyValueFocused && {
    top: 0,
    bottom: 0,
    position: 'absolute',
    outline: '1px solid #999',
    width: '100%'
  });
});
var RatingIcon = styled('span', {
  name: 'MuiRating',
  slot: 'Icon',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.icon, styleProps.iconEmpty && styles.iconEmpty, styleProps.iconFilled && styles.iconFilled, styleProps.iconHover && styles.iconHover, styleProps.iconFocus && styles.iconFocus, styleProps.iconActive && styles.iconActive];
  }
})(function (_ref4) {
  var theme = _ref4.theme,
      styleProps = _ref4.styleProps;
  return _extends({
    // Fit wrapper to actual icon size.
    display: 'flex',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    // Fix mouseLeave issue.
    // https://github.com/facebook/react/issues/4492
    pointerEvents: 'none'
  }, styleProps.iconActive && {
    transform: 'scale(1.2)'
  }, styleProps.iconEmpty && {
    color: theme.palette.action.disabled
  });
});
var RatingDecimal = styled('span', {
  name: 'MuiRating',
  slot: 'Decimal',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.decimal, styleProps.iconActive && styles.iconActive];
  }
})(function (_ref5) {
  var styleProps = _ref5.styleProps;
  return _extends({
    position: 'relative'
  }, styleProps.iconActive && {
    transform: 'scale(1.2)'
  });
});

function IconContainer(props) {
  var value = props.value,
      other = _objectWithoutProperties(props, ["value"]);

  return /*#__PURE__*/_jsx("span", _extends({}, other));
}

process.env.NODE_ENV !== "production" ? IconContainer.propTypes = {
  value: PropTypes.number.isRequired
} : void 0;

function RatingItem(props) {
  var classes = props.classes,
      disabled = props.disabled,
      emptyIcon = props.emptyIcon,
      focus = props.focus,
      getLabelText = props.getLabelText,
      highlightSelectedOnly = props.highlightSelectedOnly,
      hover = props.hover,
      icon = props.icon,
      IconContainerComponent = props.IconContainerComponent,
      isActive = props.isActive,
      itemValue = props.itemValue,
      labelProps = props.labelProps,
      name = props.name,
      onBlur = props.onBlur,
      onChange = props.onChange,
      onClick = props.onClick,
      onFocus = props.onFocus,
      readOnly = props.readOnly,
      styleProps = props.styleProps,
      ratingValue = props.ratingValue,
      ratingValueRounded = props.ratingValueRounded;
  var isFilled = highlightSelectedOnly ? itemValue === ratingValue : itemValue <= ratingValue;
  var isHovered = itemValue <= hover;
  var isFocused = itemValue <= focus;
  var isChecked = itemValue === ratingValueRounded;
  var id = useId();

  var container = /*#__PURE__*/_jsx(RatingIcon, {
    as: IconContainerComponent,
    value: itemValue,
    className: clsx(classes.icon, isFilled ? classes.iconFilled : classes.iconEmpty, isHovered && classes.iconHover, isFocused && classes.iconFocus, isActive && classes.iconActive),
    styleProps: _extends({}, styleProps, {
      iconEmpty: !isFilled,
      iconFilled: isFilled,
      iconHover: isHovered,
      iconFocus: isFocused,
      iconActive: isActive
    }),
    children: emptyIcon && !isFilled ? emptyIcon : icon
  });

  if (readOnly) {
    return /*#__PURE__*/_jsx("span", _extends({}, labelProps, {
      children: container
    }));
  }

  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsxs(RatingLabel, _extends({
      styleProps: _extends({}, styleProps, {
        emptyValueFocused: undefined
      }),
      htmlFor: id
    }, labelProps, {
      children: [container, /*#__PURE__*/_jsx("span", {
        className: classes.visuallyHidden,
        children: getLabelText(itemValue)
      })]
    })), /*#__PURE__*/_jsx("input", {
      className: classes.visuallyHidden,
      onFocus: onFocus,
      onBlur: onBlur,
      onChange: onChange,
      onClick: onClick,
      disabled: disabled,
      value: itemValue,
      id: id,
      type: "radio",
      name: name,
      checked: isChecked
    })]
  });
}

process.env.NODE_ENV !== "production" ? RatingItem.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  emptyIcon: PropTypes.node,
  focus: PropTypes.number.isRequired,
  getLabelText: PropTypes.func.isRequired,
  highlightSelectedOnly: PropTypes.bool.isRequired,
  hover: PropTypes.number.isRequired,
  icon: PropTypes.node,
  IconContainerComponent: PropTypes.elementType.isRequired,
  isActive: PropTypes.bool.isRequired,
  itemValue: PropTypes.number.isRequired,
  labelProps: PropTypes.object,
  name: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  ratingValue: PropTypes.number,
  ratingValueRounded: PropTypes.number,
  readOnly: PropTypes.bool.isRequired,
  styleProps: PropTypes.object.isRequired
} : void 0;

var defaultIcon = /*#__PURE__*/_jsx(Star, {
  fontSize: "inherit"
});

var defaultEmptyIcon = /*#__PURE__*/_jsx(StarBorder, {
  fontSize: "inherit"
});

function defaultLabelText(value) {
  return "".concat(value, " Star").concat(value !== 1 ? 's' : '');
}

var Rating = /*#__PURE__*/React.forwardRef(function Rating(inProps, ref) {
  var props = useThemeProps({
    name: 'MuiRating',
    props: inProps
  });

  var className = props.className,
      _props$defaultValue = props.defaultValue,
      defaultValue = _props$defaultValue === void 0 ? null : _props$defaultValue,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$emptyIcon = props.emptyIcon,
      emptyIcon = _props$emptyIcon === void 0 ? defaultEmptyIcon : _props$emptyIcon,
      _props$emptyLabelText = props.emptyLabelText,
      emptyLabelText = _props$emptyLabelText === void 0 ? 'Empty' : _props$emptyLabelText,
      _props$getLabelText = props.getLabelText,
      getLabelText = _props$getLabelText === void 0 ? defaultLabelText : _props$getLabelText,
      _props$highlightSelec = props.highlightSelectedOnly,
      highlightSelectedOnly = _props$highlightSelec === void 0 ? false : _props$highlightSelec,
      _props$icon = props.icon,
      icon = _props$icon === void 0 ? defaultIcon : _props$icon,
      _props$IconContainerC = props.IconContainerComponent,
      IconContainerComponent = _props$IconContainerC === void 0 ? IconContainer : _props$IconContainerC,
      _props$max = props.max,
      max = _props$max === void 0 ? 5 : _props$max,
      nameProp = props.name,
      onChange = props.onChange,
      onChangeActive = props.onChangeActive,
      onMouseLeave = props.onMouseLeave,
      onMouseMove = props.onMouseMove,
      _props$precision = props.precision,
      precision = _props$precision === void 0 ? 1 : _props$precision,
      _props$readOnly = props.readOnly,
      readOnly = _props$readOnly === void 0 ? false : _props$readOnly,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      valueProp = props.value,
      other = _objectWithoutProperties(props, ["className", "defaultValue", "disabled", "emptyIcon", "emptyLabelText", "getLabelText", "highlightSelectedOnly", "icon", "IconContainerComponent", "max", "name", "onChange", "onChangeActive", "onMouseLeave", "onMouseMove", "precision", "readOnly", "size", "value"]);

  var name = useId(nameProp);

  var _useControlled = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'Rating'
  }),
      _useControlled2 = _slicedToArray(_useControlled, 2),
      valueDerived = _useControlled2[0],
      setValueState = _useControlled2[1];

  var valueRounded = roundValueToPrecision(valueDerived, precision);
  var theme = useTheme();

  var _React$useState = React.useState({
    hover: -1,
    focus: -1
  }),
      _React$useState$ = _React$useState[0],
      hover = _React$useState$.hover,
      focus = _React$useState$.focus,
      setState = _React$useState[1];

  var value = valueRounded;

  if (hover !== -1) {
    value = hover;
  }

  if (focus !== -1) {
    value = focus;
  }

  var _useIsFocusVisible = useIsFocusVisible(),
      isFocusVisibleRef = _useIsFocusVisible.isFocusVisibleRef,
      handleBlurVisible = _useIsFocusVisible.onBlur,
      handleFocusVisible = _useIsFocusVisible.onFocus,
      focusVisibleRef = _useIsFocusVisible.ref;

  var _React$useState2 = React.useState(false),
      focusVisible = _React$useState2[0],
      setFocusVisible = _React$useState2[1];

  var rootRef = React.useRef();
  var handleFocusRef = useForkRef(focusVisibleRef, rootRef);
  var handleRef = useForkRef(handleFocusRef, ref);

  var handleMouseMove = function handleMouseMove(event) {
    if (onMouseMove) {
      onMouseMove(event);
    }

    var rootNode = rootRef.current;

    var _rootNode$getBounding = rootNode.getBoundingClientRect(),
        right = _rootNode$getBounding.right,
        left = _rootNode$getBounding.left;

    var _rootNode$firstChild$ = rootNode.firstChild.getBoundingClientRect(),
        width = _rootNode$firstChild$.width;

    var percent;

    if (theme.direction === 'rtl') {
      percent = (right - event.clientX) / (width * max);
    } else {
      percent = (event.clientX - left) / (width * max);
    }

    var newHover = roundValueToPrecision(max * percent + precision / 2, precision);
    newHover = clamp(newHover, precision, max);
    setState(function (prev) {
      return prev.hover === newHover && prev.focus === newHover ? prev : {
        hover: newHover,
        focus: newHover
      };
    });
    setFocusVisible(false);

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  var handleMouseLeave = function handleMouseLeave(event) {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    var newHover = -1;
    setState({
      hover: newHover,
      focus: newHover
    });

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  var handleChange = function handleChange(event) {
    var newValue = event.target.value === '' ? null : parseFloat(event.target.value); // Give mouse priority over keyboard
    // Fix https://github.com/mui-org/material-ui/issues/22827

    if (hover !== -1) {
      newValue = hover;
    }

    setValueState(newValue);

    if (onChange) {
      onChange(event, newValue);
    }
  };

  var handleClear = function handleClear(event) {
    // Ignore keyboard events
    // https://github.com/facebook/react/issues/7407
    if (event.clientX === 0 && event.clientY === 0) {
      return;
    }

    setState({
      hover: -1,
      focus: -1
    });
    setValueState(null);

    if (onChange && parseFloat(event.target.value) === valueRounded) {
      onChange(event, null);
    }
  };

  var handleFocus = function handleFocus(event) {
    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
    }

    var newFocus = parseFloat(event.target.value);
    setState(function (prev) {
      return {
        hover: prev.hover,
        focus: newFocus
      };
    });
  };

  var handleBlur = function handleBlur(event) {
    if (hover !== -1) {
      return;
    }

    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    var newFocus = -1;
    setState(function (prev) {
      return {
        hover: prev.hover,
        focus: newFocus
      };
    });
  };

  var _React$useState3 = React.useState(false),
      emptyValueFocused = _React$useState3[0],
      setEmptyValueFocused = _React$useState3[1];

  var styleProps = _extends({}, props, {
    defaultValue: defaultValue,
    disabled: disabled,
    emptyIcon: emptyIcon,
    emptyLabelText: emptyLabelText,
    emptyValueFocused: emptyValueFocused,
    focusVisible: focusVisible,
    getLabelText: getLabelText,
    icon: icon,
    IconContainerComponent: IconContainerComponent,
    max: max,
    precision: precision,
    readOnly: readOnly,
    size: size
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsxs(RatingRoot, _extends({
    ref: handleRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: clsx(classes.root, className),
    styleProps: styleProps,
    role: readOnly ? 'img' : null,
    "aria-label": readOnly ? getLabelText(value) : null
  }, other, {
    children: [Array.from(new Array(max)).map(function (_, index) {
      var itemValue = index + 1;
      var ratingItemProps = {
        classes: classes,
        disabled: disabled,
        emptyIcon: emptyIcon,
        focus: focus,
        getLabelText: getLabelText,
        highlightSelectedOnly: highlightSelectedOnly,
        hover: hover,
        icon: icon,
        IconContainerComponent: IconContainerComponent,
        name: name,
        onBlur: handleBlur,
        onChange: handleChange,
        onClick: handleClear,
        onFocus: handleFocus,
        ratingValue: value,
        ratingValueRounded: valueRounded,
        readOnly: readOnly,
        styleProps: styleProps
      };
      var isActive = itemValue === Math.ceil(value) && (hover !== -1 || focus !== -1);

      if (precision < 1) {
        var items = Array.from(new Array(1 / precision));
        return /*#__PURE__*/_jsx(RatingDecimal, {
          className: clsx(classes.decimal, isActive && classes.iconActive),
          styleProps: _extends({}, styleProps, {
            iconActive: isActive
          }),
          children: items.map(function ($, indexDecimal) {
            var itemDecimalValue = roundValueToPrecision(itemValue - 1 + (indexDecimal + 1) * precision, precision);
            return /*#__PURE__*/_jsx(RatingItem, _extends({}, ratingItemProps, {
              // The icon is already displayed as active
              isActive: false,
              itemValue: itemDecimalValue,
              labelProps: {
                style: items.length - 1 === indexDecimal ? {} : {
                  width: itemDecimalValue === value ? "".concat((indexDecimal + 1) * precision * 100, "%") : '0%',
                  overflow: 'hidden',
                  zIndex: 1,
                  position: 'absolute'
                }
              }
            }), itemDecimalValue);
          })
        }, itemValue);
      }

      return /*#__PURE__*/_jsx(RatingItem, _extends({}, ratingItemProps, {
        isActive: isActive,
        itemValue: itemValue
      }), itemValue);
    }), !readOnly && !disabled && /*#__PURE__*/_jsxs(RatingLabel, {
      className: clsx(classes.label, classes.labelEmptyValue),
      styleProps: styleProps,
      children: [/*#__PURE__*/_jsx("input", {
        className: classes.visuallyHidden,
        value: "",
        id: "".concat(name, "-empty"),
        type: "radio",
        name: name,
        checked: valueRounded == null,
        onFocus: function onFocus() {
          return setEmptyValueFocused(true);
        },
        onBlur: function onBlur() {
          return setEmptyValueFocused(false);
        },
        onChange: handleChange
      }), /*#__PURE__*/_jsx("span", {
        className: classes.visuallyHidden,
        children: emptyLabelText
      })]
    })]
  }));
});
process.env.NODE_ENV !== "production" ? Rating.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The default value. Use when the component is not controlled.
   * @default null
   */
  defaultValue: PropTypes.number,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * The icon to display when empty.
   * @default <StarBorder fontSize="inherit" />
   */
  emptyIcon: PropTypes.node,

  /**
   * The label read when the rating input is empty.
   * @default 'Empty'
   */
  emptyLabelText: PropTypes.node,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @param {number} value The rating label's value to format.
   * @returns {string}
   * @default function defaultLabelText(value) {
   *   return `${value} Star${value !== 1 ? 's' : ''}`;
   * }
   */
  getLabelText: PropTypes.func,

  /**
   * If `true`, only the selected icon will be highlighted.
   * @default false
   */
  highlightSelectedOnly: PropTypes.bool,

  /**
   * The icon to display.
   * @default <Star fontSize="inherit" />
   */
  icon: PropTypes.node,

  /**
   * The component containing the icon.
   * @default function IconContainer(props) {
   *   const { value, ...other } = props;
   *   return <span {...other} />;
   * }
   */
  IconContainerComponent: PropTypes.elementType,

  /**
   * Maximum rating.
   * @default 5
   */
  max: PropTypes.number,

  /**
   * The name attribute of the radio `input` elements.
   * This input `name` should be unique within the page.
   * Being unique within a form is insufficient since the `name` is used to generated IDs.
   */
  name: PropTypes.string,

  /**
   * Callback fired when the value changes.
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {number|null} value The new value.
   */
  onChange: PropTypes.func,

  /**
   * Callback function that is fired when the hover state changes.
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChangeActive: PropTypes.func,

  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,

  /**
   * @ignore
   */
  onMouseMove: PropTypes.func,

  /**
   * The minimum increment value change allowed.
   * @default 1
   */
  precision: chainPropTypes(PropTypes.number, function (props) {
    if (props.precision < 0.1) {
      return new Error(['Material-UI: The prop `precision` should be above 0.1.', 'A value below this limit has an imperceptible impact.'].join('\n'));
    }

    return null;
  }),

  /**
   * Removes all hover effects and pointer events.
   * @default false
   */
  readOnly: PropTypes.bool,

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
   * The rating value.
   */
  value: PropTypes.number
} : void 0;
export default Rating;