import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { formatMuiErrorMessage as _formatMuiErrorMessage } from "@material-ui/utils";
import { deepmerge } from '@material-ui/utils';
import { darken, getContrastRatio, lighten } from '@material-ui/system';
import common from '../colors/common';
import grey from '../colors/grey';
import purple from '../colors/purple';
import red from '../colors/red';
import orange from '../colors/orange';
import blue from '../colors/blue';
import lightBlue from '../colors/lightBlue';
import green from '../colors/green';
export var light = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: 'rgba(0, 0, 0, 0.87)',
    // Secondary text.
    secondary: 'rgba(0, 0, 0, 0.6)',
    // Disabled text have even lower visual prominence.
    disabled: 'rgba(0, 0, 0, 0.38)'
  },
  // The color used to divide different elements.
  divider: 'rgba(0, 0, 0, 0.12)',
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: common.white,
    default: common.white
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: 'rgba(0, 0, 0, 0.54)',
    // The color of an hovered action.
    hover: 'rgba(0, 0, 0, 0.04)',
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: 'rgba(0, 0, 0, 0.08)',
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: 'rgba(0, 0, 0, 0.26)',
    // The background color of a disabled action.
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(0, 0, 0, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
export var dark = {
  text: {
    primary: common.white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)'
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: '#121212',
    default: '#121212'
  },
  action: {
    active: common.white,
    hover: 'rgba(255, 255, 255, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};

function addLightOrDark(intent, direction, shade, tonalOffset) {
  var tonalOffsetLight = tonalOffset.light || tonalOffset;
  var tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;

  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === 'dark') {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}

function getDefaultPrimary() {
  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'light';

  if (mode === 'dark') {
    return {
      main: blue[200],
      light: blue[50],
      dark: blue[400]
    };
  }

  return {
    main: blue[700],
    light: blue[400],
    dark: blue[800]
  };
}

function getDefaultSecondary() {
  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'light';

  if (mode === 'dark') {
    return {
      main: purple[200],
      light: purple[50],
      dark: purple[400]
    };
  }

  return {
    main: purple[500],
    light: purple[300],
    dark: purple[700]
  };
}

function getDefaultError() {
  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'light';

  if (mode === 'dark') {
    return {
      main: red[500],
      light: red[300],
      dark: red[700]
    };
  }

  return {
    main: red[700],
    light: red[400],
    dark: red[800]
  };
}

function getDefaultInfo() {
  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'light';

  if (mode === 'dark') {
    return {
      main: lightBlue[400],
      light: lightBlue[300],
      dark: lightBlue[700]
    };
  }

  return {
    main: lightBlue[700],
    light: lightBlue[500],
    dark: lightBlue[900]
  };
}

function getDefaultSuccess() {
  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'light';

  if (mode === 'dark') {
    return {
      main: green[400],
      light: green[300],
      dark: green[700]
    };
  }

  return {
    main: green[800],
    light: green[500],
    dark: green[900]
  };
}

function getDefaultWarning() {
  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'light';

  if (mode === 'dark') {
    return {
      main: orange[400],
      light: orange[300],
      dark: orange[700]
    };
  }

  return {
    main: '#ED6C02',
    // closest to orange[800] that pass 3:1.
    light: orange[500],
    dark: orange[900]
  };
}

export default function createPalette(palette) {
  var _palette$mode = palette.mode,
      mode = _palette$mode === void 0 ? 'light' : _palette$mode,
      _palette$contrastThre = palette.contrastThreshold,
      contrastThreshold = _palette$contrastThre === void 0 ? 3 : _palette$contrastThre,
      _palette$tonalOffset = palette.tonalOffset,
      tonalOffset = _palette$tonalOffset === void 0 ? 0.2 : _palette$tonalOffset,
      other = _objectWithoutProperties(palette, ["mode", "contrastThreshold", "tonalOffset"]);

  var primary = palette.primary || getDefaultPrimary(mode);
  var secondary = palette.secondary || getDefaultSecondary(mode);
  var error = palette.error || getDefaultError(mode);
  var info = palette.info || getDefaultInfo(mode);
  var success = palette.success || getDefaultSuccess(mode);
  var warning = palette.warning || getDefaultWarning(mode); // Use the same logic as
  // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
  // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54

  function getContrastText(background) {
    var contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;

    if (process.env.NODE_ENV !== 'production') {
      var contrast = getContrastRatio(background, contrastText);

      if (contrast < 3) {
        console.error(["Material-UI: The contrast ratio of ".concat(contrast, ":1 for ").concat(contrastText, " on ").concat(background), 'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.', 'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast'].join('\n'));
      }
    }

    return contrastText;
  }

  var augmentColor = function augmentColor(_ref) {
    var color = _ref.color,
        name = _ref.name,
        _ref$mainShade = _ref.mainShade,
        mainShade = _ref$mainShade === void 0 ? 500 : _ref$mainShade,
        _ref$lightShade = _ref.lightShade,
        lightShade = _ref$lightShade === void 0 ? 300 : _ref$lightShade,
        _ref$darkShade = _ref.darkShade,
        darkShade = _ref$darkShade === void 0 ? 700 : _ref$darkShade;
    color = _extends({}, color);

    if (!color.main && color[mainShade]) {
      color.main = color[mainShade];
    }

    if (!color.hasOwnProperty('main')) {
      throw new Error(process.env.NODE_ENV !== "production" ? "Material-UI: The color".concat(name ? " (".concat(name, ")") : '', " provided to augmentColor(color) is invalid.\nThe color object needs to have a `main` property or a `").concat(mainShade, "` property.") : _formatMuiErrorMessage(11, name ? " (".concat(name, ")") : '', mainShade));
    }

    if (typeof color.main !== 'string') {
      throw new Error(process.env.NODE_ENV !== "production" ? "Material-UI: The color".concat(name ? " (".concat(name, ")") : '', " provided to augmentColor(color) is invalid.\n`color.main` should be a string, but `").concat(JSON.stringify(color.main), "` was provided instead.\n\nDid you intend to use one of the following approaches?\n\nimport { green } from \"@material-ui/core/colors\";\n\nconst theme1 = createTheme({ palette: {\n  primary: green,\n} });\n\nconst theme2 = createTheme({ palette: {\n  primary: { main: green[500] },\n} });") : _formatMuiErrorMessage(12, name ? " (".concat(name, ")") : '', JSON.stringify(color.main)));
    }

    addLightOrDark(color, 'light', lightShade, tonalOffset);
    addLightOrDark(color, 'dark', darkShade, tonalOffset);

    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }

    return color;
  };

  var modes = {
    dark: dark,
    light: light
  };

  if (process.env.NODE_ENV !== 'production') {
    if (!modes[mode]) {
      console.error("Material-UI: The palette mode `".concat(mode, "` is not supported."));
    }
  }

  var paletteOutput = deepmerge(_extends({
    // A collection of common colors.
    common: common,
    // The palette mode, can be light or dark.
    mode: mode,
    // The colors used to represent primary interface elements for a user.
    primary: augmentColor({
      color: primary,
      name: 'primary'
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: augmentColor({
      color: secondary,
      name: 'secondary',
      mainShade: 'A400',
      lightShade: 'A200',
      darkShade: 'A700'
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: augmentColor({
      color: error,
      name: 'error'
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: augmentColor({
      color: warning,
      name: 'warning'
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: augmentColor({
      color: info,
      name: 'info'
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: augmentColor({
      color: success,
      name: 'success'
    }),
    // The grey colors.
    grey: grey,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: contrastThreshold,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: getContrastText,
    // Generate a rich color object.
    augmentColor: augmentColor,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: tonalOffset
  }, modes[mode]), other);
  return paletteOutput;
}