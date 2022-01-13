import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

var _ClearIcon, _ArrowDropDownIcon;

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes, integerPropType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { alpha } from '@material-ui/system';
import Popper from '../Popper';
import ListSubheader from '../ListSubheader';
import Paper from '../Paper';
import IconButton from '../IconButton';
import Chip from '../Chip';
import ClearIcon from '../internal/svg-icons/Close';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import useAutocomplete, { createFilterOptions } from '../useAutocomplete';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import autocompleteClasses, { getAutocompleteUtilityClass } from './autocompleteClasses';
import capitalize from '../utils/capitalize';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      disablePortal = styleProps.disablePortal,
      focused = styleProps.focused,
      fullWidth = styleProps.fullWidth,
      hasClearIcon = styleProps.hasClearIcon,
      hasPopupIcon = styleProps.hasPopupIcon,
      inputFocused = styleProps.inputFocused,
      popupOpen = styleProps.popupOpen,
      size = styleProps.size;
  var slots = {
    root: ['root', focused && 'focused', fullWidth && 'fullWidth', hasClearIcon && 'hasClearIcon', hasPopupIcon && 'hasPopupIcon'],
    inputRoot: ['inputRoot'],
    input: ['input', inputFocused && 'inputFocused'],
    tag: ['tag', "tagSize".concat(capitalize(size))],
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
  return composeClasses(slots, getAutocompleteUtilityClass, classes);
};

var AutocompleteRoot = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    var fullWidth = styleProps.fullWidth,
        hasClearIcon = styleProps.hasClearIcon,
        hasPopupIcon = styleProps.hasPopupIcon,
        inputFocused = styleProps.inputFocused,
        size = styleProps.size;
    return [_defineProperty({}, "& .".concat(autocompleteClasses.tag), styles.tag), _defineProperty({}, "& .".concat(autocompleteClasses.tag), styles["tagSize".concat(capitalize(size))]), _defineProperty({}, "& .".concat(autocompleteClasses.inputRoot), styles.inputRoot), _defineProperty({}, "& .".concat(autocompleteClasses.input), styles.input), _defineProperty({}, "& .".concat(autocompleteClasses.input), inputFocused && styles.inputFocused), styles.root, fullWidth && styles.fullWidth, hasPopupIcon && styles.hasPopupIcon, hasClearIcon && styles.hasClearIcon];
  }
})(function (_ref6) {
  var _extends2, _$concat, _MuiOutlinedInput, _MuiFilledInputRo, _extends3;

  var styleProps = _ref6.styleProps;
  return _extends((_extends2 = {}, _defineProperty(_extends2, "&.".concat(autocompleteClasses.focused, " .").concat(autocompleteClasses.clearIndicator), {
    visibility: 'visible'
  }), _defineProperty(_extends2, '@media (pointer: fine)', _defineProperty({}, "&:hover .".concat(autocompleteClasses.clearIndicator), {
    visibility: 'visible'
  })), _extends2), styleProps.fullWidth && {
    width: '100%'
  }, (_extends3 = {}, _defineProperty(_extends3, "& .".concat(autocompleteClasses.tag), _extends({
    margin: 3,
    maxWidth: 'calc(100% - 6px)'
  }, styleProps.size === 'small' && {
    margin: 2,
    maxWidth: 'calc(100% - 4px)'
  })), _defineProperty(_extends3, "& .".concat(autocompleteClasses.inputRoot), (_$concat = {
    flexWrap: 'wrap'
  }, _defineProperty(_$concat, ".".concat(autocompleteClasses.hasPopupIcon, "&, .").concat(autocompleteClasses.hasClearIcon, "&"), {
    paddingRight: 26 + 4
  }), _defineProperty(_$concat, ".".concat(autocompleteClasses.hasPopupIcon, ".").concat(autocompleteClasses.hasClearIcon, "&"), {
    paddingRight: 52 + 4
  }), _defineProperty(_$concat, "& .".concat(autocompleteClasses.input), {
    width: 0,
    minWidth: 30
  }), _$concat)), _defineProperty(_extends3, '& .MuiInput-root', {
    paddingBottom: 1,
    '& .MuiInput-input': {
      padding: '4px 4px 4px 0px'
    }
  }), _defineProperty(_extends3, '& .MuiInput-root.MuiInputBase-sizeSmall', {
    '& .MuiInput-input': {
      padding: '2px 4px 3px 0'
    }
  }), _defineProperty(_extends3, '& .MuiOutlinedInput-root', (_MuiOutlinedInput = {
    padding: 9
  }, _defineProperty(_MuiOutlinedInput, ".".concat(autocompleteClasses.hasPopupIcon, "&, .").concat(autocompleteClasses.hasClearIcon, "&"), {
    paddingRight: 26 + 4 + 9
  }), _defineProperty(_MuiOutlinedInput, ".".concat(autocompleteClasses.hasPopupIcon, ".").concat(autocompleteClasses.hasClearIcon, "&"), {
    paddingRight: 52 + 4 + 9
  }), _defineProperty(_MuiOutlinedInput, "& .".concat(autocompleteClasses.input), {
    padding: '7.5px 4px 7.5px 6px'
  }), _defineProperty(_MuiOutlinedInput, "& .".concat(autocompleteClasses.endAdornment), {
    right: 9
  }), _MuiOutlinedInput)), _defineProperty(_extends3, '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall', _defineProperty({
    padding: 6
  }, "& .".concat(autocompleteClasses.input), {
    padding: '2.5px 4px 2.5px 6px'
  })), _defineProperty(_extends3, '& .MuiFilledInput-root', (_MuiFilledInputRo = {
    paddingTop: 19,
    paddingLeft: 8
  }, _defineProperty(_MuiFilledInputRo, ".".concat(autocompleteClasses.hasPopupIcon, "&, .").concat(autocompleteClasses.hasClearIcon, "&"), {
    paddingRight: 26 + 4 + 9
  }), _defineProperty(_MuiFilledInputRo, ".".concat(autocompleteClasses.hasPopupIcon, ".").concat(autocompleteClasses.hasClearIcon, "&"), {
    paddingRight: 52 + 4 + 9
  }), _defineProperty(_MuiFilledInputRo, '& .MuiFilledInput-input', {
    padding: '7px 4px'
  }), _defineProperty(_MuiFilledInputRo, "& .".concat(autocompleteClasses.endAdornment), {
    right: 9
  }), _MuiFilledInputRo)), _defineProperty(_extends3, '& .MuiFilledInput-root.MuiInputBase-sizeSmall', {
    paddingBottom: 1,
    '& .MuiFilledInput-input': {
      padding: '2.5px 4px'
    }
  }), _defineProperty(_extends3, "& .".concat(autocompleteClasses.input), _extends({
    flexGrow: 1,
    textOverflow: 'ellipsis',
    opacity: 0
  }, styleProps.inputFocused && {
    opacity: 1
  })), _extends3));
});
var AutocompleteEndAdornment = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'EndAdornment',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.endAdornment;
  }
})({
  // We use a position absolute to support wrapping tags.
  position: 'absolute',
  right: 0,
  top: 'calc(50% - 14px)' // Center vertically

});
var AutocompleteClearIndicator = styled(IconButton, {
  name: 'MuiAutocomplete',
  slot: 'ClearIndicator',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.clearIndicator;
  }
})({
  marginRight: -2,
  padding: 4,
  visibility: 'hidden'
});
var AutocompletePopupIndicator = styled(IconButton, {
  name: 'MuiAutocomplete',
  slot: 'PopupIndicator',
  overridesResolver: function overridesResolver(_ref7, styles) {
    var styleProps = _ref7.styleProps;
    return _extends({}, styles.popupIndicator, styleProps.popupOpen && styles.popupIndicatorOpen);
  }
})(function (_ref8) {
  var styleProps = _ref8.styleProps;
  return _extends({
    padding: 2,
    marginRight: -2
  }, styleProps.popupOpen && {
    transform: 'rotate(180deg)'
  });
});
var AutocompletePopper = styled(Popper, {
  name: 'MuiAutocomplete',
  slot: 'Popper',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [_defineProperty({}, "& .".concat(autocompleteClasses.option), styles.option), styles.popper, styleProps.disablePortal && styles.popperDisablePortal];
  }
})(function (_ref10) {
  var theme = _ref10.theme,
      styleProps = _ref10.styleProps;
  return _extends({
    zIndex: theme.zIndex.modal
  }, styleProps.disablePortal && {
    position: 'absolute'
  });
});
var AutocompletePaper = styled(Paper, {
  name: 'MuiAutocomplete',
  slot: 'Paper',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.paper;
  }
})(function (_ref11) {
  var theme = _ref11.theme;
  return _extends({}, theme.typography.body1, {
    overflow: 'auto'
  });
});
var AutocompleteLoading = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'Loading',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.loading;
  }
})(function (_ref12) {
  var theme = _ref12.theme;
  return {
    color: theme.palette.text.secondary,
    padding: '14px 16px'
  };
});
var AutocompleteNoOptions = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'NoOptions',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.noOptions;
  }
})(function (_ref13) {
  var theme = _ref13.theme;
  return {
    color: theme.palette.text.secondary,
    padding: '14px 16px'
  };
});
var AutocompleteListbox = styled('div', {
  name: 'MuiAutocomplete',
  slot: 'Listbox',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.listbox;
  }
})(function (_ref14) {
  var _ariaSelectedTru, _$concat2;

  var theme = _ref14.theme;
  return _defineProperty({
    listStyle: 'none',
    margin: 0,
    padding: '8px 0',
    maxHeight: '40vh',
    overflow: 'auto'
  }, "& .".concat(autocompleteClasses.option), (_$concat2 = {
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
    paddingRight: 16
  }, _defineProperty(_$concat2, theme.breakpoints.up('sm'), {
    minHeight: 'auto'
  }), _defineProperty(_$concat2, "&.".concat(autocompleteClasses.focused), {
    backgroundColor: theme.palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }), _defineProperty(_$concat2, '&[aria-disabled="true"]', {
    opacity: theme.palette.action.disabledOpacity,
    pointerEvents: 'none'
  }), _defineProperty(_$concat2, "&.".concat(autocompleteClasses.focusVisible), {
    backgroundColor: theme.palette.action.focus
  }), _defineProperty(_$concat2, '&[aria-selected="true"]', (_ariaSelectedTru = {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
  }, _defineProperty(_ariaSelectedTru, "&.".concat(autocompleteClasses.focused), {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.palette.action.selected
    }
  }), _defineProperty(_ariaSelectedTru, "&.".concat(autocompleteClasses.focusVisible), {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
  }), _ariaSelectedTru)), _$concat2));
});
var AutocompleteGroupLabel = styled(ListSubheader, {
  name: 'MuiAutocomplete',
  slot: 'GroupLabel',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.groupLabel;
  }
})(function (_ref16) {
  var theme = _ref16.theme;
  return {
    backgroundColor: theme.palette.background.paper,
    top: -8
  };
});
var AutocompleteGroupUl = styled('ul', {
  name: 'MuiAutocomplete',
  slot: 'GroupUl',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.groupUl;
  }
})(_defineProperty({
  padding: 0
}, "& .".concat(autocompleteClasses.option), {
  paddingLeft: 24
}));
export { createFilterOptions };
var Autocomplete = /*#__PURE__*/React.forwardRef(function Autocomplete(inProps, ref) {
  var _componentsProps$clea;

  var props = useThemeProps({
    props: inProps,
    name: 'MuiAutocomplete'
  });
  /* eslint-disable @typescript-eslint/no-unused-vars */

  var _props$autoComplete = props.autoComplete,
      autoComplete = _props$autoComplete === void 0 ? false : _props$autoComplete,
      _props$autoHighlight = props.autoHighlight,
      autoHighlight = _props$autoHighlight === void 0 ? false : _props$autoHighlight,
      _props$autoSelect = props.autoSelect,
      autoSelect = _props$autoSelect === void 0 ? false : _props$autoSelect,
      _props$blurOnSelect = props.blurOnSelect,
      blurOnSelect = _props$blurOnSelect === void 0 ? false : _props$blurOnSelect,
      ChipProps = props.ChipProps,
      className = props.className,
      _props$clearIcon = props.clearIcon,
      clearIcon = _props$clearIcon === void 0 ? _ClearIcon || (_ClearIcon = /*#__PURE__*/_jsx(ClearIcon, {
    fontSize: "small"
  })) : _props$clearIcon,
      _props$clearOnBlur = props.clearOnBlur,
      clearOnBlur = _props$clearOnBlur === void 0 ? !props.freeSolo : _props$clearOnBlur,
      _props$clearOnEscape = props.clearOnEscape,
      clearOnEscape = _props$clearOnEscape === void 0 ? false : _props$clearOnEscape,
      _props$clearText = props.clearText,
      clearText = _props$clearText === void 0 ? 'Clear' : _props$clearText,
      _props$closeText = props.closeText,
      closeText = _props$closeText === void 0 ? 'Close' : _props$closeText,
      _props$componentsProp = props.componentsProps,
      componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
      _props$defaultValue = props.defaultValue,
      defaultValue = _props$defaultValue === void 0 ? props.multiple ? [] : null : _props$defaultValue,
      _props$disableClearab = props.disableClearable,
      disableClearable = _props$disableClearab === void 0 ? false : _props$disableClearab,
      _props$disableCloseOn = props.disableCloseOnSelect,
      disableCloseOnSelect = _props$disableCloseOn === void 0 ? false : _props$disableCloseOn,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disabledItemsF = props.disabledItemsFocusable,
      disabledItemsFocusable = _props$disabledItemsF === void 0 ? false : _props$disabledItemsF,
      _props$disableListWra = props.disableListWrap,
      disableListWrap = _props$disableListWra === void 0 ? false : _props$disableListWra,
      _props$disablePortal = props.disablePortal,
      disablePortal = _props$disablePortal === void 0 ? false : _props$disablePortal,
      filterOptions = props.filterOptions,
      _props$filterSelected = props.filterSelectedOptions,
      filterSelectedOptions = _props$filterSelected === void 0 ? false : _props$filterSelected,
      _props$forcePopupIcon = props.forcePopupIcon,
      forcePopupIcon = _props$forcePopupIcon === void 0 ? 'auto' : _props$forcePopupIcon,
      _props$freeSolo = props.freeSolo,
      freeSolo = _props$freeSolo === void 0 ? false : _props$freeSolo,
      _props$fullWidth = props.fullWidth,
      fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
      _props$getLimitTagsTe = props.getLimitTagsText,
      getLimitTagsText = _props$getLimitTagsTe === void 0 ? function (more) {
    return "+".concat(more);
  } : _props$getLimitTagsTe,
      getOptionDisabled = props.getOptionDisabled,
      _props$getOptionLabel = props.getOptionLabel,
      getOptionLabel = _props$getOptionLabel === void 0 ? function (option) {
    var _option$label;

    return (_option$label = option.label) != null ? _option$label : option;
  } : _props$getOptionLabel,
      isOptionEqualToValue = props.isOptionEqualToValue,
      groupBy = props.groupBy,
      _props$handleHomeEndK = props.handleHomeEndKeys,
      handleHomeEndKeys = _props$handleHomeEndK === void 0 ? !props.freeSolo : _props$handleHomeEndK,
      idProp = props.id,
      _props$includeInputIn = props.includeInputInList,
      includeInputInList = _props$includeInputIn === void 0 ? false : _props$includeInputIn,
      inputValueProp = props.inputValue,
      _props$limitTags = props.limitTags,
      limitTags = _props$limitTags === void 0 ? -1 : _props$limitTags,
      _props$ListboxCompone = props.ListboxComponent,
      ListboxComponent = _props$ListboxCompone === void 0 ? 'ul' : _props$ListboxCompone,
      ListboxProps = props.ListboxProps,
      _props$loading = props.loading,
      loading = _props$loading === void 0 ? false : _props$loading,
      _props$loadingText = props.loadingText,
      loadingText = _props$loadingText === void 0 ? 'Loading…' : _props$loadingText,
      _props$multiple = props.multiple,
      multiple = _props$multiple === void 0 ? false : _props$multiple,
      _props$noOptionsText = props.noOptionsText,
      noOptionsText = _props$noOptionsText === void 0 ? 'No options' : _props$noOptionsText,
      onChange = props.onChange,
      onClose = props.onClose,
      onHighlightChange = props.onHighlightChange,
      onInputChange = props.onInputChange,
      onOpen = props.onOpen,
      open = props.open,
      _props$openOnFocus = props.openOnFocus,
      openOnFocus = _props$openOnFocus === void 0 ? false : _props$openOnFocus,
      _props$openText = props.openText,
      openText = _props$openText === void 0 ? 'Open' : _props$openText,
      options = props.options,
      _props$PaperComponent = props.PaperComponent,
      PaperComponent = _props$PaperComponent === void 0 ? Paper : _props$PaperComponent,
      _props$PopperComponen = props.PopperComponent,
      PopperComponent = _props$PopperComponen === void 0 ? Popper : _props$PopperComponen,
      _props$popupIcon = props.popupIcon,
      popupIcon = _props$popupIcon === void 0 ? _ArrowDropDownIcon || (_ArrowDropDownIcon = /*#__PURE__*/_jsx(ArrowDropDownIcon, {})) : _props$popupIcon,
      renderGroupProp = props.renderGroup,
      renderInput = props.renderInput,
      renderOptionProp = props.renderOption,
      renderTags = props.renderTags,
      _props$selectOnFocus = props.selectOnFocus,
      selectOnFocus = _props$selectOnFocus === void 0 ? !props.freeSolo : _props$selectOnFocus,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      valueProp = props.value,
      other = _objectWithoutProperties(props, ["autoComplete", "autoHighlight", "autoSelect", "blurOnSelect", "ChipProps", "className", "clearIcon", "clearOnBlur", "clearOnEscape", "clearText", "closeText", "componentsProps", "defaultValue", "disableClearable", "disableCloseOnSelect", "disabled", "disabledItemsFocusable", "disableListWrap", "disablePortal", "filterOptions", "filterSelectedOptions", "forcePopupIcon", "freeSolo", "fullWidth", "getLimitTagsText", "getOptionDisabled", "getOptionLabel", "isOptionEqualToValue", "groupBy", "handleHomeEndKeys", "id", "includeInputInList", "inputValue", "limitTags", "ListboxComponent", "ListboxProps", "loading", "loadingText", "multiple", "noOptionsText", "onChange", "onClose", "onHighlightChange", "onInputChange", "onOpen", "open", "openOnFocus", "openText", "options", "PaperComponent", "PopperComponent", "popupIcon", "renderGroup", "renderInput", "renderOption", "renderTags", "selectOnFocus", "size", "value"]);
  /* eslint-enable @typescript-eslint/no-unused-vars */


  var _useAutocomplete = useAutocomplete(_extends({}, props, {
    componentName: 'Autocomplete'
  })),
      getRootProps = _useAutocomplete.getRootProps,
      getInputProps = _useAutocomplete.getInputProps,
      getInputLabelProps = _useAutocomplete.getInputLabelProps,
      getPopupIndicatorProps = _useAutocomplete.getPopupIndicatorProps,
      getClearProps = _useAutocomplete.getClearProps,
      getTagProps = _useAutocomplete.getTagProps,
      getListboxProps = _useAutocomplete.getListboxProps,
      getOptionProps = _useAutocomplete.getOptionProps,
      value = _useAutocomplete.value,
      dirty = _useAutocomplete.dirty,
      id = _useAutocomplete.id,
      popupOpen = _useAutocomplete.popupOpen,
      focused = _useAutocomplete.focused,
      focusedTag = _useAutocomplete.focusedTag,
      anchorEl = _useAutocomplete.anchorEl,
      setAnchorEl = _useAutocomplete.setAnchorEl,
      inputValue = _useAutocomplete.inputValue,
      groupedOptions = _useAutocomplete.groupedOptions;

  var hasClearIcon = !disableClearable && !disabled && dirty;
  var hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;

  var styleProps = _extends({}, props, {
    disablePortal: disablePortal,
    focused: focused,
    fullWidth: fullWidth,
    hasClearIcon: hasClearIcon,
    hasPopupIcon: hasPopupIcon,
    inputFocused: focusedTag === -1,
    popupOpen: popupOpen,
    size: size
  });

  var classes = useUtilityClasses(styleProps);
  var startAdornment;

  if (multiple && value.length > 0) {
    var getCustomizedTagProps = function getCustomizedTagProps(params) {
      return _extends({
        className: clsx(classes.tag),
        disabled: disabled
      }, getTagProps(params));
    };

    if (renderTags) {
      startAdornment = renderTags(value, getCustomizedTagProps);
    } else {
      startAdornment = value.map(function (option, index) {
        return /*#__PURE__*/_jsx(Chip, _extends({
          label: getOptionLabel(option),
          size: size
        }, getCustomizedTagProps({
          index: index
        }), ChipProps));
      });
    }
  }

  if (limitTags > -1 && Array.isArray(startAdornment)) {
    var more = startAdornment.length - limitTags;

    if (!focused && more > 0) {
      startAdornment = startAdornment.splice(0, limitTags);
      startAdornment.push( /*#__PURE__*/_jsx("span", {
        className: classes.tag,
        children: getLimitTagsText(more)
      }, startAdornment.length));
    }
  }

  var defaultRenderGroup = function defaultRenderGroup(params) {
    return /*#__PURE__*/_jsxs("li", {
      children: [/*#__PURE__*/_jsx(AutocompleteGroupLabel, {
        className: classes.groupLabel,
        styleProps: styleProps,
        component: "div",
        children: params.group
      }), /*#__PURE__*/_jsx(AutocompleteGroupUl, {
        className: classes.groupUl,
        styleProps: styleProps,
        children: params.children
      })]
    }, params.key);
  };

  var renderGroup = renderGroupProp || defaultRenderGroup;

  var defaultRenderOption = function defaultRenderOption(props2, option) {
    return /*#__PURE__*/_jsx("li", _extends({}, props2, {
      children: getOptionLabel(option)
    }));
  };

  var renderOption = renderOptionProp || defaultRenderOption;

  var renderListOption = function renderListOption(option, index) {
    var optionProps = getOptionProps({
      option: option,
      index: index
    });
    return renderOption(_extends({}, optionProps, {
      className: classes.option
    }), option, {
      selected: optionProps['aria-selected'],
      inputValue: inputValue
    });
  };

  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(AutocompleteRoot, _extends({
      ref: ref,
      className: clsx(classes.root, className),
      styleProps: styleProps
    }, getRootProps(other), {
      children: renderInput({
        id: id,
        disabled: disabled,
        fullWidth: true,
        size: size === 'small' ? 'small' : undefined,
        InputLabelProps: getInputLabelProps(),
        InputProps: {
          ref: setAnchorEl,
          className: classes.inputRoot,
          startAdornment: startAdornment,
          endAdornment: /*#__PURE__*/_jsxs(AutocompleteEndAdornment, {
            className: classes.endAdornment,
            styleProps: styleProps,
            children: [hasClearIcon ? /*#__PURE__*/_jsx(AutocompleteClearIndicator, _extends({}, getClearProps(), {
              "aria-label": clearText,
              title: clearText,
              styleProps: styleProps
            }, componentsProps.clearIndicator, {
              className: clsx(classes.clearIndicator, (_componentsProps$clea = componentsProps.clearIndicator) == null ? void 0 : _componentsProps$clea.className),
              children: clearIcon
            })) : null, hasPopupIcon ? /*#__PURE__*/_jsx(AutocompletePopupIndicator, _extends({}, getPopupIndicatorProps(), {
              disabled: disabled,
              "aria-label": popupOpen ? closeText : openText,
              title: popupOpen ? closeText : openText,
              className: clsx(classes.popupIndicator),
              styleProps: styleProps,
              children: popupIcon
            })) : null]
          })
        },
        inputProps: _extends({
          className: clsx(classes.input),
          disabled: disabled
        }, getInputProps())
      })
    })), popupOpen && anchorEl ? /*#__PURE__*/_jsx(AutocompletePopper, {
      as: PopperComponent,
      className: clsx(classes.popper),
      disablePortal: disablePortal,
      style: {
        width: anchorEl ? anchorEl.clientWidth : null
      },
      styleProps: styleProps,
      role: "presentation",
      anchorEl: anchorEl,
      open: true,
      children: /*#__PURE__*/_jsxs(AutocompletePaper, {
        as: PaperComponent,
        className: classes.paper,
        styleProps: styleProps,
        children: [loading && groupedOptions.length === 0 ? /*#__PURE__*/_jsx(AutocompleteLoading, {
          className: classes.loading,
          styleProps: styleProps,
          children: loadingText
        }) : null, groupedOptions.length === 0 && !freeSolo && !loading ? /*#__PURE__*/_jsx(AutocompleteNoOptions, {
          className: classes.noOptions,
          styleProps: styleProps,
          role: "presentation",
          onMouseDown: function onMouseDown(event) {
            // Prevent input blur when interacting with the "no options" content
            event.preventDefault();
          },
          children: noOptionsText
        }) : null, groupedOptions.length > 0 ? /*#__PURE__*/_jsx(AutocompleteListbox, _extends({
          as: ListboxComponent,
          className: classes.listbox,
          styleProps: styleProps
        }, getListboxProps(), ListboxProps, {
          children: groupedOptions.map(function (option, index) {
            if (groupBy) {
              return renderGroup({
                key: option.key,
                group: option.group,
                children: option.options.map(function (option2, index2) {
                  return renderListOption(option2, option.index + index2);
                })
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
  autoComplete: PropTypes.bool,

  /**
   * If `true`, the first option is automatically highlighted.
   * @default false
   */
  autoHighlight: PropTypes.bool,

  /**
   * If `true`, the selected option becomes the value of the input
   * when the Autocomplete loses focus unless the user chooses
   * a different option or changes the character string in the input.
   * @default false
   */
  autoSelect: PropTypes.bool,

  /**
   * Control if the input should be blurred when an option is selected:
   *
   * - `false` the input is not blurred.
   * - `true` the input is always blurred.
   * - `touch` the input is blurred after a touch event.
   * - `mouse` the input is blurred after a mouse event.
   * @default false
   */
  blurOnSelect: PropTypes.oneOfType([PropTypes.oneOf(['mouse', 'touch']), PropTypes.bool]),

  /**
   * Props applied to the [`Chip`](/api/chip/) element.
   */
  ChipProps: PropTypes.object,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The icon to display in place of the default clear icon.
   * @default <ClearIcon fontSize="small" />
   */
  clearIcon: PropTypes.node,

  /**
   * If `true`, the input's text is cleared on blur if no value is selected.
   *
   * Set to `true` if you want to help the user enter a new value.
   * Set to `false` if you want to help the user resume his search.
   * @default !props.freeSolo
   */
  clearOnBlur: PropTypes.bool,

  /**
   * If `true`, clear all values when the user presses escape and the popup is closed.
   * @default false
   */
  clearOnEscape: PropTypes.bool,

  /**
   * Override the default text for the *clear* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Clear'
   */
  clearText: PropTypes.string,

  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Close'
   */
  closeText: PropTypes.string,

  /**
   * The props used for each slot inside.
   * @default {}
   */
  componentsProps: PropTypes.object,

  /**
   * The default value. Use when the component is not controlled.
   * @default props.multiple ? [] : null
   */
  defaultValue: PropTypes.any,

  /**
   * If `true`, the input can't be cleared.
   * @default false
   */
  disableClearable: PropTypes.bool,

  /**
   * If `true`, the popup won't close when a value is selected.
   * @default false
   */
  disableCloseOnSelect: PropTypes.bool,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: PropTypes.bool,

  /**
   * If `true`, the list box in the popup will not wrap focus.
   * @default false
   */
  disableListWrap: PropTypes.bool,

  /**
   * If `true`, the `Popper` content will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,

  /**
   * A filter function that determines the options that are eligible.
   *
   * @param {T[]} options The options to render.
   * @param {object} state The state of the component.
   * @returns {T[]}
   */
  filterOptions: PropTypes.func,

  /**
   * If `true`, hide the selected options from the list box.
   * @default false
   */
  filterSelectedOptions: PropTypes.bool,

  /**
   * Force the visibility display of the popup icon.
   * @default 'auto'
   */
  forcePopupIcon: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.bool]),

  /**
   * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
   * @default false
   */
  freeSolo: PropTypes.bool,

  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,

  /**
   * The label to display when the tags are truncated (`limitTags`).
   *
   * @param {number} more The number of truncated tags.
   * @returns {ReactNode}
   * @default (more) => `+${more}`
   */
  getLimitTagsText: PropTypes.func,

  /**
   * Used to determine the disabled state for a given option.
   *
   * @param {T} option The option to test.
   * @returns {boolean}
   */
  getOptionDisabled: PropTypes.func,

  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   *
   * @param {T} option
   * @returns {string}
   * @default (option) => option.label ?? option
   */
  getOptionLabel: PropTypes.func,

  /**
   * If provided, the options will be grouped under the returned string.
   * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
   *
   * @param {T} options The options to group.
   * @returns {string}
   */
  groupBy: PropTypes.func,

  /**
   * If `true`, the component handles the "Home" and "End" keys when the popup is open.
   * It should move focus to the first option and last option, respectively.
   * @default !props.freeSolo
   */
  handleHomeEndKeys: PropTypes.bool,

  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide an id it will fall back to a randomly generated one.
   */
  id: PropTypes.string,

  /**
   * If `true`, the highlight can move to the input.
   * @default false
   */
  includeInputInList: PropTypes.bool,

  /**
   * The input value.
   */
  inputValue: PropTypes.string,

  /**
   * Used to determine if the option represents the given value.
   * Uses strict equality by default.
   * ⚠️ Both arguments need to be handled, an option can only match with one value.
   *
   * @param {T} option The option to test.
   * @param {T} value The value to test against.
   * @returns {boolean}
   */
  isOptionEqualToValue: PropTypes.func,

  /**
   * The maximum number of tags that will be visible when not focused.
   * Set `-1` to disable the limit.
   * @default -1
   */
  limitTags: integerPropType,

  /**
   * The component used to render the listbox.
   * @default 'ul'
   */
  ListboxComponent: PropTypes.elementType,

  /**
   * Props applied to the Listbox element.
   */
  ListboxProps: PropTypes.object,

  /**
   * If `true`, the component is in a loading state.
   * This shows the `loadingText` in place of suggestions (only if there are no suggestions to show, e.g. `options` are empty).
   * @default false
   */
  loading: PropTypes.bool,

  /**
   * Text to display when in a loading state.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Loading…'
   */
  loadingText: PropTypes.node,

  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: PropTypes.bool,

  /**
   * Text to display when there are no options.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'No options'
   */
  noOptionsText: PropTypes.node,

  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {T|T[]} value The new value of the component.
   * @param {string} reason One of "createOption", "selectOption", "removeOption", "blur" or "clear".
   * @param {string} [details]
   */
  onChange: PropTypes.func,

  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string} reason Can be: `"toggleInput"`, `"escape"`, `"selectOption"`, `"removeOption"`, `"blur"`.
   */
  onClose: PropTypes.func,

  /**
   * Callback fired when the highlight option changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {T} option The highlighted option.
   * @param {string} reason Can be: `"keyboard"`, `"auto"`, `"mouse"`.
   */
  onHighlightChange: PropTypes.func,

  /**
   * Callback fired when the input value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string} value The new value of the text input.
   * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`.
   */
  onInputChange: PropTypes.func,

  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: PropTypes.func,

  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,

  /**
   * If `true`, the popup will open on input focus.
   * @default false
   */
  openOnFocus: PropTypes.bool,

  /**
   * Override the default text for the *open popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Open'
   */
  openText: PropTypes.string,

  /**
   * Array of options.
   */
  options: PropTypes.array.isRequired,

  /**
   * The component used to render the body of the popup.
   * @default Paper
   */
  PaperComponent: PropTypes.elementType,

  /**
   * The component used to position the popup.
   * @default Popper
   */
  PopperComponent: PropTypes.elementType,

  /**
   * The icon to display in place of the default popup icon.
   * @default <ArrowDropDownIcon />
   */
  popupIcon: PropTypes.node,

  /**
   * Render the group.
   *
   * @param {any} option The group to render.
   * @returns {ReactNode}
   */
  renderGroup: PropTypes.func,

  /**
   * Render the input.
   *
   * @param {object} params
   * @returns {ReactNode}
   */
  renderInput: PropTypes.func.isRequired,

  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {object} props The props to apply on the li element.
   * @param {T} option The option to render.
   * @param {object} state The state of the component.
   * @returns {ReactNode}
   */
  renderOption: PropTypes.func,

  /**
   * Render the selected value.
   *
   * @param {T[]} value The `value` provided to the component.
   * @param {function} getTagProps A tag props getter.
   * @returns {ReactNode}
   */
  renderTags: PropTypes.func,

  /**
   * If `true`, the input's text is selected on focus.
   * It helps the user clear the selected value.
   * @default !props.freeSolo
   */
  selectOnFocus: PropTypes.bool,

  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['small', 'medium']), PropTypes.string]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The value of the autocomplete.
   *
   * The value must have reference equality with the option in order to be selected.
   * You can customize the equality behavior with the `isOptionEqualToValue` prop.
   */
  value: chainPropTypes(PropTypes.any, function (props) {
    if (props.multiple && props.value !== undefined && !Array.isArray(props.value)) {
      return new Error(['Material-UI: The Autocomplete expects the `value` prop to be an array or undefined.', "However, ".concat(props.value, " was provided.")].join('\n'));
    }

    return null;
  })
} : void 0;
export default Autocomplete;