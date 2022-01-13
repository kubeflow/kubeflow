import { useThemeProps as systemUseThemeProps } from '@material-ui/system';
import defaultTheme from './defaultTheme';
export default function useThemeProps(_ref) {
  var props = _ref.props,
      name = _ref.name;
  return systemUseThemeProps({
    props: props,
    name: name,
    defaultTheme: defaultTheme
  });
}