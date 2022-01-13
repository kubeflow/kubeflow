import { deepmerge } from '@material-ui/utils';
import createTheme from './createTheme';
export default function createMuiStrictModeTheme(options) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return createTheme.apply(void 0, [deepmerge({
    unstable_strictMode: true
  }, options)].concat(args));
}