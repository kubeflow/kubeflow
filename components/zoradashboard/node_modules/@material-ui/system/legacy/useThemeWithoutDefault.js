import { useTheme as muiUseTheme } from '@material-ui/private-theming';

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function useTheme() {
  var defaultTheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var contextTheme = muiUseTheme();
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme;
}

export default useTheme;