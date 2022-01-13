"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createFilterOptions", {
  enumerable: true,
  get: function () {
    return _useAutocomplete.createFilterOptions;
  }
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _system = require("@material-ui/system");

var _Popper = _interopRequireDefault(require("../Popper"));

var _ListSubheader = _interopRequireDefault(require("../ListSubheader"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _Chip = _interopRequireDefault(require("../Chip"));

var _Close = _interopRequireDefault(require("../internal/svg-icons/Close"));

var _ArrowDropDown = _interopRequireDefault(require("../internal/svg-icons/ArrowDropDown"));

var _useAutocomplete = _interopRequireWildcard(require("../useAutocomplete"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _autocompleteClasses = _interopRequireWildcard(require("./autocompleteClasses"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _jsxRuntime = require("react/jsx-runtime");

var _ClearIcon, _ArrowDropDownIcon;

const _excluded = ["autoComplete", "autoHighlight", "autoSelect", "blurOnSelect", "ChipProps", "className", "clearIcon", "clearOnBlur", "clearOnEscape", "clearText", "closeText", "componentsProps", "defaultValue", "disableClearable", "disableCloseOnSelect", "disabled", "disabledItemsFocusable", "disableListWrap", "disablePortal", "filterOptions", "filterSelectedOptions", "forcePopupIcon", "freeSolo", "fullWidth", "getLimitTagsText", "getOptionDisabled", "getOptionLabel", "isOptionEqualToValue", "groupBy", "handleHomeEndKeys", "id", "includeInputInList", "inputValue", "limitTags", "ListboxComponent", "ListboxProps", "loading", "loadingText", "multiple", "noOptionsText", "onChange", "onClose", "onHighlightChange", "onInputChange", "onOpen", "open", "openOnFocus", "openText", "options", "PaperComponent", "PopperComponent", "popupIcon", "renderGroup", "renderInput", "renderOption", "renderTags", "selectOnFocus", "size", "value"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = styleProps => {
  const {
    classes,
    disablePortal,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused,
    popupOpen,
    size
  } = styleProps;
  const slots = {
    root: ['root', focused && 'focused', fullWidth && 'fullWidth', hasClearIcon && 'hasClearIcon', hasPopupIcon && 'hasPopupIcon'],
    inputRoot: ['inputRoot'],
    input: ['input', inputFocused && 'inputFocused'],
    tag: ['tag', `tagSize${(0, _capitalize.default)(size)}`],
    endAdornment: ['endAdornment'],
    clearIndicator: ['clearIndicator'],
    popupIndicator: ['popupIndicator', popupOpen && 'popupIndicatorOpen'],
    popper: ['popper', disablePortal && 'popperDisablePortal'],
    paper: ['paper'],
    listbox: ['listbox'],
    loading: ['loading'],
    noOptions: ['noOptions'],
    option: ['option'],
    groupLabel: ['groupLabel'],
    groupUl: ['groupUl']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _autocompleteClasses.getAutocompleteUtilityClass, classes);
};

const AutocompleteRoot = (0, _styled.default)('div', {
  name: 'MuiAutocomplete',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    const {
      fullWidth,
      hasClearIcon,
      hasPopupIcon,
      inputFocused,
      size
    } = styleProps;
    return [{
      [`& .${_autocompleteClasses.default.tag}`]: styles.tag
    }, {
      [`& .${_autocompleteClasses.default.tag}`]: styles[`tagSize${(0, _capitalize.default)(size)}`]
    }, {
      [`& .${_autocompleteClasses.default.inputRoot}`]: styles.inputRoot
    }, {
      [`& .${_autocompleteClasses.default.input}`]: styles.input
    }, {
      [`& .${_autocompleteClasses.default.input}`]: inputFocused && styles.inputFocused
    }, styles.root, fullWidth && styles.fullWidth, hasPopupIcon && styles.hasPopupIcon, hasClearIcon && styles.hasClearIcon];
  }
})(({
  styleProps
}) => (0, _extends2.default)({
  [`&.${_autocompleteClasses.default.focused} .${_autocompleteClasses.default.clearIndicator}`]: {
    visibility: 'visible'
  },

  /* Avoid double tap issue on iOS */
  '@media (pointer: fine)': {
    [`&:hover .${_autocompleteClasses.default.clearIndicator}`]: {
      visibility: 'visible'
    }
  }
}, styleProps.fullWidth && {
  width: '100%'
}, {
  [`& .${_autocompleteClasses.default.tag}`]: (0, _extends2.default)({
    margin: 3,
    maxWidth: 'calc(100% - 6px)'
  }, styleProps.size === 'small' && {
    margin: 2,
    maxWidth: 'calc(100% - 4px)'
  }),
  [`& .${_autocompleteClasses.default.inputRoot}`]: {
    flexWrap: 'wrap',
    [`.${_autocompleteClasses.default.hasPopupIcon}&, .${_autocompleteClasses.default.hasClearIcon}&`]: {
      paddingRight: 26 + 4
    },
    [`.${_autocompleteClasses.default.hasPopupIcon}.${_autocompleteClasses.default.hasClearIcon}&`]: {
      paddingRight: 52 + 4
    },
    [`& .${_autocompleteClasses.default.input}`]: {
      width: 0,
      minWidth: 30
    }
  },
  '& .MuiInput-root': {
    paddingBottom: 1,
    '& .MuiInput-input': {
      padding: '4px 4px 4px 0px'
    }
  },
  '& .MuiInput-root.MuiInputBase-sizeSmall': {
    '& .MuiInput-input': {
      padding: '2px 4px 3px 0'
    }
  },
  '& .MuiOutlinedInput-root': {
    padding: 9,
    [`.${_autocompleteClasses.default.hasPopupIcon}&, .${_autocompleteClasses.default.hasClearIcon}&`]: {
      paddingRight: 26 + 4 + 9
    },
    [`.${_autocompleteClasses.default.hasPopupIcon}.${_autocompleteClasses.default.hasClearIcon}&`]: {
      paddingRight: 52 + 4 + 9
    },
    [`& .${_autocompleteClasses.default.input}`]: {
      padding: '7.5px 4px 7.5px 6px'
    },
    [`& .${_autocompleteClasses.default.endAdornment}`]: {
      right: 9
    }
  },
  '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
    padding: 6,
    [`& .${_autocompleteClasses.default.input}`]: {
      padding: '2.5px 4px 2.5px 6px'
    }
  },
  '& .MuiFilledInput-root': {
    paddingTop: 19,
    paddingLeft: 8,
    [`.${_autocompleteClasses.default.hasPopupIcon}&, .${_autocompleteClasses.default.hasClearIcon}&`]: {
      paddingRight: 26 + 4 + 9
    },
    [`.${_autocompleteClasses.default.hasPopupIcon}.${_autocompleteClasses.default.hasClearIcon}&`]: {
      paddingRight: 52 + 4 + 9
    },
    '& .MuiFilledInput-input': {
      padding: '7px 4px'
    },
    [`& .${_autocompleteClasses.default.endAdornment}`]: {
      right: 9
    }
  },
  '& .MuiFilledInput-root.MuiInputBase-sizeSmall': {
    paddingBottom: 1,
    '& .MuiFilledInput-input': {
      padding: '2.5px 4px'
    }
  },
  [`& .${_autocompleteClasses.default.input}`]: (0, _extends2.default)({
    flexGrow: 1,
    textOverflow: 'ellipsis',
    opacity: 0
  }, styleProps.inputFocused && {
    opacity: 1
  })
}));
const AutocompleteEndAdornment = (0, _styled.default)('div', {
  name: 'MuiAutocomplete',
  slot: 'EndAdornment',
  overridesResolver: (props, styles) => styles.endAdornment
})({
  // We use a position absolute to support wrapping tags.
  position: 'absolute',
  right: 0,
  top: 'calc(50% - 14px)' // Center vertically

});
const AutocompleteClearIndicator = (0, _styled.default)(_IconButton.default, {
  name: 'MuiAutocomplete',
  slot: 'ClearIndicator',
  overridesResolver: (props, styles) => styles.clearIndicator
})({
  marginRight: -2,
  padding: 4,
  visibility: 'hidden'
});
const AutocompletePopupIndicator = (0, _styled.default)(_IconButton.default, {
  name: 'MuiAutocomplete',
  slot: 'PopupIndicator',
  overridesResolver: ({
    styleProps
  }, styles) => (0, _extends2.default)({}, styles.popupIndicator, styleProps.popupOpen && styles.popupIndicatorOpen)
})(({
  styleProps
}) => (0, _extends2.default)({
  padding: 2,
  marginRight: -2
}, styleProps.popupOpen && {
  transform: 'rotate(180deg)'
}));
const AutocompletePopper = (0, _styled.default)(_Popper.default, {
  name: 'MuiAutocomplete',
  slot: 'Popper',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [{
      [`& .${_autocompleteClasses.default.option}`]: styles.option
    }, styles.popper, styleProps.disablePortal && styles.popperDisablePortal];
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  zIndex: theme.zIndex.modal
}, styleProps.disablePortal && {
  position: 'absolute'
}));
const AutocompletePaper = (0, _styled.default)(_Paper.default, {
  name: 'MuiAutocomplete',
  slot: 'Paper',
  overridesResolver: (props, styles) => styles.paper
})(({
  theme
}) => (0, _extends2.default)({}, theme.typography.body1, {
  overflow: 'auto'
}));
const AutocompleteLoading = (0, _styled.default)('div', {
  name: 'MuiAutocomplete',
  slot: 'Loading',
  overridesResolver: (props, styles) => styles.loading
})(({
  theme
}) => ({
  color: theme.palette.text.secondary,
  padding: '14px 16px'
}));
const AutocompleteNoOptions = (0, _styled.default)('div', {
  name: 'MuiAutocomplete',
  slot: 'NoOptions',
  overridesResolver: (props, styles) => styles.noOptions
})(({
  theme
}) => ({
  color: theme.palette.text.secondary,
  padding: '14px 16px'
}));
const AutocompleteListbox = (0, _styled.default)('div', {
  name: 'MuiAutocomplete',
  slot: 'Listbox',
  overridesResolver: (props, styles) => styles.listbox
})(({
  theme
}) => ({
  listStyle: 'none',
  margin: 0,
  padding: '8px 0',
  maxHeight: '40vh',
  overflow: 'auto',
  [`& .${_autocompleteClasses.default.option}`]: {
    minHeight: 48,
    display: 'flex',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
    paddingTop: 6,
    boxSizing: 'border-box',
    outline: '0',
    WebkitTapHighlightColor: 'transparent',
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.up('sm')]: {
      minHeight: 'auto'
    },
    [`&.${_autocompleteClasses.default.focused}`]: {
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    '&[aria-disabled="true"]': {
      opacity: theme.palette.action.disabledOpacity,
      pointerEvents: 'none'
    },
    [`&.${_autocompleteClasses.default.focusVisible}`]: {
      backgroundColor: theme.palette.action.focus
    },
    '&[aria-selected="true"]': {
      backgroundColor: (0, _system.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      [`&.${_autocompleteClasses.default.focused}`]: {
        backgroundColor: (0, _system.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.action.selected
        }
      },
      [`&.${_autocompleteClasses.default.focusVisible}`]: {
        backgroundColor: (0, _system.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
      }
    }
  }
}));
const AutocompleteGroupLabel = (0, _styled.default)(_ListSubheader.default, {
  name: 'MuiAutocomplete',
  slot: 'GroupLabel',
  overridesResolver: (props, styles) => styles.groupLabel
})(({
  theme
}) => ({
  backgroundColor: theme.palette.background.paper,
  top: -8
}));
const AutocompleteGroupUl = (0, _styled.default)('ul', {
  name: 'MuiAutocomplete',
  slot: 'GroupUl',
  overridesResolver: (props, styles) => styles.groupUl
})({
  padding: 0,
  [`& .${_autocompleteClasses.default.option}`]: {
    paddingLeft: 24
  }
});
const Autocomplete = /*#__PURE__*/React.forwardRef(function Autocomplete(inProps, ref) {
  var _componentsProps$clea;

  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiAutocomplete'
  });
  /* eslint-disable @typescript-eslint/no-unused-vars */

  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    ChipProps,
    className,
    clearIcon = _ClearIcon || (_ClearIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Close.default, {
      fontSize: "small"
    })),
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    clearText = 'Clear',
    closeText = 'Close',
    componentsProps = {},
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabled = false,
    disabledItemsFocusable = false,
    disableListWrap = false,
    disablePortal = false,
    filterSelectedOptions = false,
    forcePopupIcon = 'auto',
    freeSolo = false,
    fullWidth = false,
    getLimitTagsText = more => `+${more}`,
    getOptionLabel = option => {
      var _option$label;

      return (_option$label = option.label) != null ? _option$label : option;
    },
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    includeInputInList = false,
    limitTags = -1,
    ListboxComponent = 'ul',
    ListboxProps,
    loading = false,
    loadingText = 'Loading…',
    multiple = false,
    noOptionsText = 'No options',
    openOnFocus = false,
    openText = 'Open',
    PaperComponent = _Paper.default,
    PopperComponent = _Popper.default,
    popupIcon = _ArrowDropDownIcon || (_ArrowDropDownIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_ArrowDropDown.default, {})),
    renderGroup: renderGroupProp,
    renderInput,
    renderOption: renderOptionProp,
    renderTags,
    selectOnFocus = !props.freeSolo,
    size = 'medium'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const {
    getRootProps,
    getInputProps,
    getInputLabelProps,
    getPopupIndicatorProps,
    getClearProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    value,
    dirty,
    id,
    popupOpen,
    focused,
    focusedTag,
    anchorEl,
    setAnchorEl,
    inputValue,
    groupedOptions
  } = (0, _useAutocomplete.default)((0, _extends2.default)({}, props, {
    componentName: 'Autocomplete'
  }));
  const hasClearIcon = !disableClearable && !disabled && dirty;
  const hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;
  const styleProps = (0, _extends2.default)({}, props, {
    disablePortal,
    focused,
    fullWidth,
    hasClearIcon,
    hasPopupIcon,
    inputFocused: focusedTag === -1,
    popupOpen,
    size
  });
  const classes = useUtilityClasses(styleProps);
  let startAdornment;

  if (multiple && value.length > 0) {
    const getCustomizedTagProps = params => (0, _extends2.default)({
      className: (0, _clsx.default)(classes.tag),
      disabled
    }, getTagProps(params));

    if (renderTags) {
      startAdornment = renderTags(value, getCustomizedTagProps);
    } else {
      startAdornment = value.map((option, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Chip.default, (0, _extends2.default)({
        label: getOptionLabel(option),
        size: size
      }, getCustomizedTagProps({
        index
      }), ChipProps)));
    }
  }

  if (limitTags > -1 && Array.isArray(startAdornment)) {
    const more = startAdornment.length - limitTags;

    if (!focused && more > 0) {
      startAdornment = startAdornment.splice(0, limitTags);
      startAdornment.push( /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: classes.tag,
        children: getLimitTagsText(more)
      }, startAdornment.length));
    }
  }

  const defaultRenderGroup = params => /*#__PURE__*/(0, _jsxRuntime.jsxs)("li", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(AutocompleteGroupLabel, {
      className: classes.groupLabel,
      styleProps: styleProps,
      component: "div",
      children: params.group
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(AutocompleteGroupUl, {
      className: classes.groupUl,
      styleProps: styleProps,
      children: params.children
    })]
  }, params.key);

  const renderGroup = renderGroupProp || defaultRenderGroup;

  const defaultRenderOption = (props2, option) => /*#__PURE__*/(0, _jsxRuntime.jsx)("li", (0, _extends2.default)({}, props2, {
    children: getOptionLabel(option)
  }));

  const renderOption = renderOptionProp || defaultRenderOption;

  const renderListOption = (option, index) => {
    const optionProps = getOptionProps({
      option,
      index
    });
    return renderOption((0, _extends2.default)({}, optionProps, {
      className: classes.option
    }), option, {
      selected: optionProps['aria-selected'],
      inputValue
    });
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(AutocompleteRoot, (0, _extends2.default)({
      ref: ref,
      className: (0, _clsx.default)(classes.root, className),
      styleProps: styleProps
    }, getRootProps(other), {
      children: renderInput({
        id,
        disabled,
        fullWidth: true,
        size: size === 'small' ? 'small' : undefined,
        InputLabelProps: getInputLabelProps(),
        InputProps: {
          ref: setAnchorEl,
          className: classes.inputRoot,
          startAdornment,
          endAdornment: /*#__PURE__*/(0, _jsxRuntime.jsxs)(AutocompleteEndAdornment, {
            className: classes.endAdornment,
            styleProps: styleProps,
            children: [hasClearIcon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(AutocompleteClearIndicator, (0, _extends2.default)({}, getClearProps(), {
              "aria-label": clearText,
              title: clearText,
              styleProps: styleProps
            }, componentsProps.clearIndicator, {
              className: (0, _clsx.default)(classes.clearIndicator, (_componentsProps$clea = componentsProps.clearIndicator) == null ? void 0 : _componentsProps$clea.className),
              children: clearIcon
            })) : null, hasPopupIcon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(AutocompletePopupIndicator, (0, _extends2.default)({}, getPopupIndicatorProps(), {
              disabled: disabled,
              "aria-label": popupOpen ? closeText : openText,
              title: popupOpen ? closeText : openText,
              className: (0, _clsx.default)(classes.popupIndicator),
              styleProps: styleProps,
              children: popupIcon
            })) : null]
          })
        },
        inputProps: (0, _extends2.default)({
          className: (0, _clsx.default)(classes.input),
          disabled
        }, getInputProps())
      })
    })), popupOpen && anchorEl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(AutocompletePopper, {
      as: PopperComponent,
      className: (0, _clsx.default)(classes.popper),
      disablePortal: disablePortal,
      style: {
        width: anchorEl ? anchorEl.clientWidth : null
      },
      styleProps: styleProps,
      role: "presentation",
      anchorEl: anchorEl,
      open: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(AutocompletePaper, {
        as: PaperComponent,
        className: classes.paper,
        styleProps: styleProps,
        children: [loading && groupedOptions.length === 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(AutocompleteLoading, {
          className: classes.loading,
          styleProps: styleProps,
          children: loadingText
        }) : null, groupedOptions.length === 0 && !freeSolo && !loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(AutocompleteNoOptions, {
          className: classes.noOptions,
          styleProps: styleProps,
          role: "presentation",
          onMouseDown: event => {
            // Prevent input blur when interacting with the "no options" content
            event.preventDefault();
          },
          children: noOptionsText
        }) : null, groupedOptions.length > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(AutocompleteListbox, (0, _extends2.default)({
          as: ListboxComponent,
          className: classes.listbox,
          styleProps: styleProps
        }, getListboxProps(), ListboxProps, {
          children: groupedOptions.map((option, index) => {
            if (groupBy) {
              return renderGroup({
                key: option.key,
                group: option.group,
                children: option.options.map((option2, index2) => renderListOption(option2, option.index + index2))
              });
            }

            return renderListOption(option, index);
          })
        })) : null]
      })
    }) : null]
  });
});
process.env.NODE_ENV !== "production" ? Autocomplete.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the portion of the selected suggestion that has not been typed by the user,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   * @default false
   */
  autoComplete: _propTypes.default.bool,

  /**
   * If `true`, the first option is automatically highlighted.
   * @default false
   */
  autoHighlight: _propTypes.default.bool,

  /**
   * If `true`, the selected option becomes the value of the input
   * when the Autocomplete loses focus unless the user chooses
   * a different option or changes the character string in the input.
   * @default false
   */
  autoSelect: _propTypes.default.bool,

  /**
   * Control if the input should be blurred when an option is selected:
   *
   * - `false` the input is not blurred.
   * - `true` the input is always blurred.
   * - `touch` the input is blurred after a touch event.
   * - `mouse` the input is blurred after a mouse event.
   * @default false
   */
  blurOnSelect: _propTypes.default.oneOfType([_propTypes.default.oneOf(['mouse', 'touch']), _propTypes.default.bool]),

  /**
   * Props applied to the [`Chip`](/api/chip/) element.
   */
  ChipProps: _propTypes.default.object,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The icon to display in place of the default clear icon.
   * @default <ClearIcon fontSize="small" />
   */
  clearIcon: _propTypes.default.node,

  /**
   * If `true`, the input's text is cleared on blur if no value is selected.
   *
   * Set to `true` if you want to help the user enter a new value.
   * Set to `false` if you want to help the user resume his search.
   * @default !props.freeSolo
   */
  clearOnBlur: _propTypes.default.bool,

  /**
   * If `true`, clear all values when the user presses escape and the popup is closed.
   * @default false
   */
  clearOnEscape: _propTypes.default.bool,

  /**
   * Override the default text for the *clear* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Clear'
   */
  clearText: _propTypes.default.string,

  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Close'
   */
  closeText: _propTypes.default.string,

  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: _propTypes.default.object,

  /**
   * The default value. Use when the component is not controlled.
   * @default props.multiple ? [] : null
   */
  defaultValue: _propTypes.default.any,

  /**
   * If `true`, the input can't be cleared.
   * @default false
   */
  disableClearable: _propTypes.default.bool,

  /**
   * If `true`, the popup won't close when a value is selected.
   * @default false
   */
  disableCloseOnSelect: _propTypes.default.bool,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: _propTypes.default.bool,

  /**
   * If `true`, the list box in the popup will not wrap focus.
   * @default false
   */
  disableListWrap: _propTypes.default.bool,

  /**
   * If `true`, the `Popper` content will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: _propTypes.default.bool,

  /**
   * A filter function that determines the options that are eligible.
   *
   * @param {T[]} options The options to render.
   * @param {object} state The state of the component.
   * @returns {T[]}
   */
  filterOptions: _propTypes.default.func,

  /**
   * If `true`, hide the selected options from the list box.
   * @default false
   */
  filterSelectedOptions: _propTypes.default.bool,

  /**
   * Force the visibility display of the popup icon.
   * @default 'auto'
   */
  forcePopupIcon: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.bool]),

  /**
   * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
   * @default false
   */
  freeSolo: _propTypes.default.bool,

  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: _propTypes.default.bool,

  /**
   * The label to display when the tags are truncated (`limitTags`).
   *
   * @param {number} more The number of truncated tags.
   * @returns {ReactNode}
   * @default (more) => `+${more}`
   */
  getLimitTagsText: _propTypes.default.func,

  /**
   * Used to determine the disabled state for a given option.
   *
   * @param {T} option The option to test.
   * @returns {boolean}
   */
  getOptionDisabled: _propTypes.default.func,

  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   *
   * @param {T} option
   * @returns {string}
   * @default (option) => option.label ?? option
   */
  getOptionLabel: _propTypes.default.func,

  /**
   * If provided, the options will be grouped under the returned string.
   * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
   *
   * @param {T} options The options to group.
   * @returns {string}
   */
  groupBy: _propTypes.default.func,

  /**
   * If `true`, the component handles the "Home" and "End" keys when the popup is open.
   * It should move focus to the first option and last option, respectively.
   * @default !props.freeSolo
   */
  handleHomeEndKeys: _propTypes.default.bool,

  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide an id it will fall back to a randomly generated one.
   */
  id: _propTypes.default.string,

  /**
   * If `true`, the highlight can move to the input.
   * @default false
   */
  includeInputInList: _propTypes.default.bool,

  /**
   * The input value.
   */
  inputValue: _propTypes.default.string,

  /**
   * Used to determine if the option represents the given value.
   * Uses strict equality by default.
   * ⚠️ Both arguments need to be handled, an option can only match with one value.
   *
   * @param {T} option The option to test.
   * @param {T} value The value to test against.
   * @returns {boolean}
   */
  isOptionEqualToValue: _propTypes.default.func,

  /**
   * The maximum number of tags that will be visible when not focused.
   * Set `-1` to disable the limit.
   * @default -1
   */
  limitTags: _utils.integerPropType,

  /**
   * The component used to render the listbox.
   * @default 'ul'
   */
  ListboxComponent: _propTypes.default.elementType,

  /**
   * Props applied to the Listbox element.
   */
  ListboxProps: _propTypes.default.object,

  /**
   * If `true`, the component is in a loading state.
   * This shows the `loadingText` in place of suggestions (only if there are no suggestions to show, e.g. `options` are empty).
   * @default false
   */
  loading: _propTypes.default.bool,

  /**
   * Text to display when in a loading state.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Loading…'
   */
  loadingText: _propTypes.default.node,

  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: _propTypes.default.bool,

  /**
   * Text to display when there are no options.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'No options'
   */
  noOptionsText: _propTypes.default.node,

  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {T|T[]} value The new value of the component.
   * @param {string} reason One of "createOption", "selectOption", "removeOption", "blur" or "clear".
   * @param {string} [details]
   */
  onChange: _propTypes.default.func,

  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string} reason Can be: `"toggleInput"`, `"escape"`, `"selectOption"`, `"removeOption"`, `"blur"`.
   */
  onClose: _propTypes.default.func,

  /**
   * Callback fired when the highlight option changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {T} option The highlighted option.
   * @param {string} reason Can be: `"keyboard"`, `"auto"`, `"mouse"`.
   */
  onHighlightChange: _propTypes.default.func,

  /**
   * Callback fired when the input value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string} value The new value of the text input.
   * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`.
   */
  onInputChange: _propTypes.default.func,

  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: _propTypes.default.func,

  /**
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool,

  /**
   * If `true`, the popup will open on input focus.
   * @default false
   */
  openOnFocus: _propTypes.default.bool,

  /**
   * Override the default text for the *open popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Open'
   */
  openText: _propTypes.default.string,

  /**
   * Array of options.
   */
  options: _propTypes.default.array.isRequired,

  /**
   * The component used to render the body of the popup.
   * @default Paper
   */
  PaperComponent: _propTypes.default.elementType,

  /**
   * The component used to position the popup.
   * @default Popper
   */
  PopperComponent: _propTypes.default.elementType,

  /**
   * The icon to display in place of the default popup icon.
   * @default <ArrowDropDownIcon />
   */
  popupIcon: _propTypes.default.node,

  /**
   * Render the group.
   *
   * @param {any} option The group to render.
   * @returns {ReactNode}
   */
  renderGroup: _propTypes.default.func,

  /**
   * Render the input.
   *
   * @param {object} params
   * @returns {ReactNode}
   */
  renderInput: _propTypes.default.func.isRequired,

  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {object} props The props to apply on the li element.
   * @param {T} option The option to render.
   * @param {object} state The state of the component.
   * @returns {ReactNode}
   */
  renderOption: _propTypes.default.func,

  /**
   * Render the selected value.
   *
   * @param {T[]} value The `value` provided to the component.
   * @param {function} getTagProps A tag props getter.
   * @returns {ReactNode}
   */
  renderTags: _propTypes.default.func,

  /**
   * If `true`, the input's text is selected on focus.
   * It helps the user clear the selected value.
   * @default !props.freeSolo
   */
  selectOnFocus: _propTypes.default.bool,

  /**
   * The size of the component.
   * @default 'medium'
   */
  size: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['small', 'medium']), _propTypes.default.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The value of the autocomplete.
   *
   * The value must have reference equality with the option in order to be selected.
   * You can customize the equality behavior with the `isOptionEqualToValue` prop.
   */
  value: (0, _utils.chainPropTypes)(_propTypes.default.any, props => {
    if (props.multiple && props.value !== undefined && !Array.isArray(props.value)) {
      return new Error(['Material-UI: The Autocomplete expects the `value` prop to be an array or undefined.', `However, ${props.value} was provided.`].join('\n'));
    }

    return null;
  })
} : void 0;
var _default = Autocomplete;
exports.default = _default;