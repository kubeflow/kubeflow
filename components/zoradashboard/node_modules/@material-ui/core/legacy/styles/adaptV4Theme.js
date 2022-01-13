import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createBreakpoints, createSpacing } from '@material-ui/system';
export default function adaptV4Theme(inputTheme) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(['Material-UI: adaptV4Theme() is deprecated.', 'Follow the upgrade guide on https://material-ui.com/r/migration-v4#theme.'].join('\n'));
  }

  var _inputTheme$defaultPr = inputTheme.defaultProps,
      defaultProps = _inputTheme$defaultPr === void 0 ? {} : _inputTheme$defaultPr,
      _inputTheme$mixins = inputTheme.mixins,
      mixins = _inputTheme$mixins === void 0 ? {} : _inputTheme$mixins,
      _inputTheme$overrides = inputTheme.overrides,
      overrides = _inputTheme$overrides === void 0 ? {} : _inputTheme$overrides,
      _inputTheme$palette = inputTheme.palette,
      palette = _inputTheme$palette === void 0 ? {} : _inputTheme$palette,
      _inputTheme$props = inputTheme.props,
      props = _inputTheme$props === void 0 ? {} : _inputTheme$props,
      _inputTheme$styleOver = inputTheme.styleOverrides,
      styleOverrides = _inputTheme$styleOver === void 0 ? {} : _inputTheme$styleOver,
      other = _objectWithoutProperties(inputTheme, ["defaultProps", "mixins", "overrides", "palette", "props", "styleOverrides"]);

  var theme = _extends({}, other, {
    components: {}
  }); // default props


  Object.keys(defaultProps).forEach(function (component) {
    var componentValue = theme.components[component] || {};
    componentValue.defaultProps = defaultProps[component];
    theme.components[component] = componentValue;
  });
  Object.keys(props).forEach(function (component) {
    var componentValue = theme.components[component] || {};
    componentValue.defaultProps = props[component];
    theme.components[component] = componentValue;
  }); // css overrides

  Object.keys(styleOverrides).forEach(function (component) {
    var componentValue = theme.components[component] || {};
    componentValue.styleOverrides = styleOverrides[component];
    theme.components[component] = componentValue;
  });
  Object.keys(overrides).forEach(function (component) {
    var componentValue = theme.components[component] || {};
    componentValue.styleOverrides = overrides[component];
    theme.components[component] = componentValue;
  }); // theme.spacing

  theme.spacing = createSpacing(inputTheme.spacing); // theme.mixins.gutters

  var breakpoints = createBreakpoints(inputTheme.breakpoints || {});
  var spacing = theme.spacing;
  theme.mixins = _extends({
    gutters: function gutters() {
      var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _extends({
        paddingLeft: spacing(2),
        paddingRight: spacing(2)
      }, styles, _defineProperty({}, breakpoints.up('sm'), _extends({
        paddingLeft: spacing(3),
        paddingRight: spacing(3)
      }, styles[breakpoints.up('sm')])));
    }
  }, mixins);

  var typeInput = palette.type,
      modeInput = palette.mode,
      paletteRest = _objectWithoutProperties(palette, ["type", "mode"]);

  var finalMode = modeInput || typeInput || 'light';
  theme.palette = _extends({
    // theme.palette.text.hint
    text: {
      hint: finalMode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)'
    },
    mode: finalMode,
    type: finalMode
  }, paletteRest);
  return theme;
}