import getThemeProps from './getThemeProps';
import useTheme from '../useTheme';
export default function useThemeProps(_ref) {
  var props = _ref.props,
      name = _ref.name,
      defaultTheme = _ref.defaultTheme;
  var theme = useTheme(defaultTheme);
  var mergedProps = getThemeProps({
    theme: theme,
    name: name,
    props: props
  });
  return mergedProps;
}