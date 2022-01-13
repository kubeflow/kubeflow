"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SliderMarkLabel = exports.SliderMark = exports.SliderValueLabel = exports.SliderThumb = exports.SliderTrack = exports.SliderRail = exports.SliderRoot = exports.sliderClasses = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _SliderUnstyled = _interopRequireWildcard(require("@material-ui/unstyled/SliderUnstyled"));

var _system = require("@material-ui/system");

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useTheme = _interopRequireDefault(require("../styles/useTheme"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["components", "componentsProps", "color", "size"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const sliderClasses = (0, _extends2.default)({}, _SliderUnstyled.sliderUnstyledClasses, (0, _unstyled.generateUtilityClasses)('MuiSlider', ['colorPrimary', 'colorSecondary', 'thumbColorPrimary', 'thumbColorSecondary', 'sizeSmall', 'thumbSizeSmall']));
exports.sliderClasses = sliderClasses;
const SliderRoot = (0, _styled.default)('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    const marks = styleProps.marksProp === true && styleProps.step !== null ? [...Array(Math.floor((styleProps.max - styleProps.min) / styleProps.step) + 1)].map((_, index) => ({
      value: styleProps.min + styleProps.step * index
    })) : styleProps.marksProp || [];
    const marked = marks.length > 0 && marks.some(mark => mark.label);
    return [styles.root, styles[`color${(0, _capitalize.default)(styleProps.color)}`], styleProps.size !== 'medium' && styles[`size${(0, _capitalize.default)(styleProps.size)}`], marked && styles.marked, styleProps.orientation === 'vertical' && styles.vertical, styleProps.track === 'inverted' && styles.trackInverted, styleProps.track === false && styles.trackFalse];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  borderRadius: 12,
  boxSizing: 'content-box',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  touchAction: 'none',
  color: theme.palette[styleProps.color].main,
  WebkitTapHighlightColor: 'transparent'
}, styleProps.orientation === 'horizontal' && (0, _extends2.default)({
  height: 4,
  width: '100%',
  padding: '13px 0',
  // The primary input mechanism of the device includes a pointing device of limited accuracy.
  '@media (pointer: coarse)': {
    // Reach 42px touch target, about ~8mm on screen.
    padding: '20px 0'
  }
}, styleProps.size === 'small' && {
  height: 2
}, styleProps.marked && {
  marginBottom: 20
}), styleProps.orientation === 'vertical' && (0, _extends2.default)({
  height: '100%',
  width: 4,
  padding: '0 13px',
  // The primary input mechanism of the device includes a pointing device of limited accuracy.
  '@media (pointer: coarse)': {
    // Reach 42px touch target, about ~8mm on screen.
    padding: '0 20px'
  }
}, styleProps.size === 'small' && {
  width: 2
}, styleProps.marked && {
  marginRight: 44
}), {
  '@media print': {
    colorAdjust: 'exact'
  },
  [`&.${sliderClasses.disabled}`]: {
    pointerEvents: 'none',
    cursor: 'default',
    color: theme.palette.grey[400]
  },
  [`&.${sliderClasses.dragging}`]: {
    [`& .${sliderClasses.thumb}, & .${sliderClasses.track}`]: {
      transition: 'none'
    }
  }
}));
exports.SliderRoot = SliderRoot;
const SliderRail = (0, _styled.default)('span', {
  name: 'MuiSlider',
  slot: 'Rail',
  overridesResolver: (props, styles) => styles.rail
})(({
  styleProps
}) => (0, _extends2.default)({
  display: 'block',
  position: 'absolute',
  borderRadius: 'inherit',
  backgroundColor: 'currentColor',
  opacity: 0.38
}, styleProps.orientation === 'horizontal' && {
  width: '100%',
  height: 'inherit',
  top: '50%',
  transform: 'translateY(-50%)'
}, styleProps.orientation === 'vertical' && {
  height: '100%',
  width: 'inherit',
  left: '50%',
  transform: 'translateX(-50%)'
}, styleProps.track === 'inverted' && {
  opacity: 1
}));
exports.SliderRail = SliderRail;
const SliderTrack = (0, _styled.default)('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track
})(({
  theme,
  styleProps
}) => {
  const color = // Same logic as the LinearProgress track color
  theme.palette.mode === 'light' ? (0, _system.lighten)(theme.palette[styleProps.color].main, 0.62) : (0, _system.darken)(theme.palette[styleProps.color].main, 0.5);
  return (0, _extends2.default)({
    display: 'block',
    position: 'absolute',
    borderRadius: 'inherit',
    border: '1px solid currentColor',
    backgroundColor: 'currentColor',
    transition: theme.transitions.create(['left', 'width', 'bottom', 'height'], {
      duration: theme.transitions.duration.shortest
    })
  }, styleProps.size === 'small' && {
    border: 'none'
  }, styleProps.orientation === 'horizontal' && {
    height: 'inherit',
    top: '50%',
    transform: 'translateY(-50%)'
  }, styleProps.orientation === 'vertical' && {
    width: 'inherit',
    left: '50%',
    transform: 'translateX(-50%)'
  }, styleProps.track === false && {
    display: 'none'
  }, styleProps.track === 'inverted' && {
    backgroundColor: color,
    borderColor: color
  });
});
exports.SliderTrack = SliderTrack;
const SliderThumb = (0, _styled.default)('span', {
  name: 'MuiSlider',
  slot: 'Thumb',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.thumb, styles[`thumbColor${(0, _capitalize.default)(styleProps.color)}`], styleProps.size !== 'medium' && styles[`thumbSize${(0, _capitalize.default)(styleProps.size)}`]];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  position: 'absolute',
  width: 20,
  height: 20,
  boxSizing: 'border-box',
  borderRadius: '50%',
  outline: 0,
  backgroundColor: 'currentColor',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: theme.transitions.create(['box-shadow', 'left', 'bottom'], {
    duration: theme.transitions.duration.shortest
  })
}, styleProps.size === 'small' && {
  width: 12,
  height: 12
}, styleProps.orientation === 'horizontal' && {
  top: '50%',
  transform: 'translate(-50%, -50%)'
}, styleProps.orientation === 'vertical' && {
  left: '50%',
  transform: 'translate(-50%, 50%)'
}, {
  '&:before': (0, _extends2.default)({
    position: 'absolute',
    content: '""',
    borderRadius: 'inherit',
    width: '100%',
    height: '100%',
    boxShadow: theme.shadows[2]
  }, styleProps.size === 'small' && {
    boxShadow: 'none'
  }),
  '&::after': {
    position: 'absolute',
    content: '""',
    borderRadius: '50%',
    // 42px is the hit target
    width: 42,
    height: 42,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  [`&:hover, &.${sliderClasses.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px ${(0, _system.alpha)(theme.palette[styleProps.color].main, 0.16)}`,
    '@media (hover: none)': {
      boxShadow: 'none'
    }
  },
  [`&.${sliderClasses.active}`]: {
    boxShadow: `0px 0px 0px 14px ${(0, _system.alpha)(theme.palette[styleProps.color].main, 0.16)}`
  },
  [`&.${sliderClasses.disabled}`]: {
    '&:hover': {
      boxShadow: 'none'
    }
  }
}));
exports.SliderThumb = SliderThumb;
const SliderValueLabel = (0, _styled.default)(_SliderUnstyled.SliderValueLabelUnstyled, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (props, styles) => styles.valueLabel
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  [`&.${sliderClasses.valueLabelOpen}`]: {
    transform: 'translateY(-100%) scale(1)'
  },
  zIndex: 1,
  whiteSpace: 'nowrap'
}, theme.typography.body2, {
  fontWeight: 500,
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.shortest
  }),
  top: -10,
  transformOrigin: 'bottom center',
  transform: 'translateY(-100%) scale(0)',
  position: 'absolute',
  backgroundColor: theme.palette.grey[600],
  borderRadius: 2,
  color: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.25rem 0.75rem'
}, styleProps.size === 'small' && {
  fontSize: theme.typography.pxToRem(12),
  padding: '0.25rem 0.5rem'
}, {
  '&:before': {
    position: 'absolute',
    content: '""',
    width: 8,
    height: 8,
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 50%) rotate(45deg)',
    backgroundColor: 'inherit'
  }
}));
exports.SliderValueLabel = SliderValueLabel;
const SliderMark = (0, _styled.default)('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  overridesResolver: (props, styles) => styles.mark
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  position: 'absolute',
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: 'currentColor'
}, styleProps.orientation === 'horizontal' && {
  top: '50%',
  transform: 'translate(-1px, -50%)'
}, styleProps.orientation === 'vertical' && {
  left: '50%',
  transform: 'translate(-50%, 1px)'
}, styleProps.markActive && {
  backgroundColor: theme.palette.background.paper,
  opacity: 0.8
}));
exports.SliderMark = SliderMark;
const SliderMarkLabel = (0, _styled.default)('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  overridesResolver: (props, styles) => styles.markLabel
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({}, theme.typography.body2, {
  color: theme.palette.text.secondary,
  position: 'absolute',
  whiteSpace: 'nowrap'
}, styleProps.orientation === 'horizontal' && {
  top: 30,
  transform: 'translateX(-50%)',
  '@media (pointer: coarse)': {
    top: 40
  }
}, styleProps.orientation === 'vertical' && {
  left: 36,
  transform: 'translateY(50%)',
  '@media (pointer: coarse)': {
    left: 44
  }
}, styleProps.markLabelActive && {
  color: theme.palette.text.primary
}));
exports.SliderMarkLabel = SliderMarkLabel;
SliderRoot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  children: _propTypes.default.node,

  /**
   * @ignore
   */
  styleProps: _propTypes.default.shape({
    'aria-label': _propTypes.default.string,
    'aria-labelledby': _propTypes.default.string,
    'aria-valuetext': _propTypes.default.string,
    classes: _propTypes.default.object,
    color: _propTypes.default.oneOf(['primary', 'secondary']),
    defaultValue: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number]),
    disabled: _propTypes.default.bool,
    getAriaLabel: _propTypes.default.func,
    getAriaValueText: _propTypes.default.func,
    isRtl: _propTypes.default.bool,
    marks: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.shape({
      label: _propTypes.default.node,
      value: _propTypes.default.number.isRequired
    })), _propTypes.default.bool]),
    max: _propTypes.default.number,
    min: _propTypes.default.number,
    name: _propTypes.default.string,
    onChange: _propTypes.default.func,
    onChangeCommitted: _propTypes.default.func,
    orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),
    scale: _propTypes.default.func,
    step: _propTypes.default.number,
    track: _propTypes.default.oneOf(['inverted', 'normal', false]),
    value: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number]),
    valueLabelDisplay: _propTypes.default.oneOf(['auto', 'off', 'on']),
    valueLabelFormat: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string])
  })
};

const extendUtilityClasses = styleProps => {
  const {
    color,
    size,
    classes = {}
  } = styleProps;
  return (0, _extends2.default)({}, classes, {
    root: (0, _clsx.default)(classes.root, (0, _SliderUnstyled.getSliderUtilityClass)(`color${(0, _capitalize.default)(color)}`), classes[`color${(0, _capitalize.default)(color)}`], size && [(0, _SliderUnstyled.getSliderUtilityClass)(`size${(0, _capitalize.default)(size)}`), classes[`size${(0, _capitalize.default)(size)}`]]),
    thumb: (0, _clsx.default)(classes.thumb, (0, _SliderUnstyled.getSliderUtilityClass)(`thumbColor${(0, _capitalize.default)(color)}`), classes[`thumbColor${(0, _capitalize.default)(color)}`], size && [(0, _SliderUnstyled.getSliderUtilityClass)(`thumbSize${(0, _capitalize.default)(size)}`), classes[`thumbSize${(0, _capitalize.default)(size)}`]])
  });
};

const shouldSpreadStyleProps = Component => {
  return !Component || !(0, _unstyled.isHostComponent)(Component);
};

const Slider = /*#__PURE__*/React.forwardRef(function Slider(inputProps, ref) {
  var _componentsProps$root, _componentsProps$thum, _componentsProps$trac, _componentsProps$valu;

  const props = (0, _useThemeProps.default)({
    props: inputProps,
    name: 'MuiSlider'
  });
  const theme = (0, _useTheme.default)();
  const isRtl = theme.direction === 'rtl';
  const {
    components = {},
    componentsProps = {},
    color = 'primary',
    size = 'medium'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const styleProps = (0, _extends2.default)({}, props, {
    color,
    size
  });
  const classes = extendUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SliderUnstyled.default, (0, _extends2.default)({}, other, {
    isRtl: isRtl,
    components: (0, _extends2.default)({
      Root: SliderRoot,
      Rail: SliderRail,
      Track: SliderTrack,
      Thumb: SliderThumb,
      ValueLabel: SliderValueLabel,
      Mark: SliderMark,
      MarkLabel: SliderMarkLabel
    }, components),
    componentsProps: (0, _extends2.default)({}, componentsProps, {
      root: (0, _extends2.default)({}, componentsProps.root, shouldSpreadStyleProps(components.Root) && {
        styleProps: (0, _extends2.default)({}, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.styleProps, {
          color,
          size
        })
      }),
      thumb: (0, _extends2.default)({}, componentsProps.thumb, shouldSpreadStyleProps(components.Thumb) && {
        styleProps: (0, _extends2.default)({}, (_componentsProps$thum = componentsProps.thumb) == null ? void 0 : _componentsProps$thum.styleProps, {
          color,
          size
        })
      }),
      track: (0, _extends2.default)({}, componentsProps.track, shouldSpreadStyleProps(components.Track) && {
        styleProps: (0, _extends2.default)({}, (_componentsProps$trac = componentsProps.track) == null ? void 0 : _componentsProps$trac.styleProps, {
          color,
          size
        })
      }),
      valueLabel: (0, _extends2.default)({}, componentsProps.valueLabel, shouldSpreadStyleProps(components.ValueLabel) && {
        styleProps: (0, _extends2.default)({}, (_componentsProps$valu = componentsProps.valueLabel) == null ? void 0 : _componentsProps$valu.styleProps, {
          color,
          size
        })
      })
    }),
    classes: classes,
    ref: ref
  }));
});
process.env.NODE_ENV !== "production" ? Slider.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The label of the slider.
   */
  'aria-label': (0, _utils.chainPropTypes)(_propTypes.default.string, props => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-label'] != null) {
      return new Error('Material-UI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.');
    }

    return null;
  }),

  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby': _propTypes.default.string,

  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext': (0, _utils.chainPropTypes)(_propTypes.default.string, props => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-valuetext'] != null) {
      return new Error('Material-UI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.');
    }

    return null;
  }),

  /**
   * @ignore
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['primary', 'secondary']), _propTypes.default.string]),

  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: _propTypes.default.shape({
    Mark: _propTypes.default.elementType,
    MarkLabel: _propTypes.default.elementType,
    Rail: _propTypes.default.elementType,
    Root: _propTypes.default.elementType,
    Thumb: _propTypes.default.elementType,
    Track: _propTypes.default.elementType,
    ValueLabel: _propTypes.default.elementType
  }),

  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  componentsProps: _propTypes.default.object,

  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number]),

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
   * @default false
   */
  disableSwap: _propTypes.default.bool,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel: _propTypes.default.func,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText: _propTypes.default.func,

  /**
   * Indicates whether the theme context has rtl direction. It is set automatically.
   * @default false
   */
  isRtl: _propTypes.default.bool,

  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.node,
    value: _propTypes.default.number.isRequired
  })), _propTypes.default.bool]),

  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max: _propTypes.default.number,

  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min: _propTypes.default.number,

  /**
   * Name attribute of the hidden `input` element.
   */
  name: _propTypes.default.string,

  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange: _propTypes.default.func,

  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted: _propTypes.default.func,

  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),

  /**
   * A transformation function, to change the scale of the slider.
   * @default (x) => x
   */
  scale: _propTypes.default.func,

  /**
   * The size of the slider.
   * @default 'medium'
   */
  size: _propTypes.default.oneOf(['small', 'medium']),

  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step: _propTypes.default.number,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex: _propTypes.default.number,

  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track: _propTypes.default.oneOf(['inverted', 'normal', false]),

  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number]),

  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay: _propTypes.default.oneOf(['auto', 'off', 'on']),

  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @default (x) => x
   */
  valueLabelFormat: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string])
} : void 0;
var _default = Slider;
exports.default = _default;