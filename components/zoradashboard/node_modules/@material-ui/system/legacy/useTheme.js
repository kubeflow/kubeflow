import createTheme from './createTheme';
import useThemeWithoutDefault from './useThemeWithoutDefault';
export var systemDefaultTheme = createTheme();

function useTheme() {
  var defaultTheme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : systemDefaultTheme;
  return useThemeWithoutDefault(defaultTheme);
}

export default useTheme;