import { createStyled, shouldForwardProp } from '@material-ui/system';
import defaultTheme from './defaultTheme';
export var rootShouldForwardProp = function rootShouldForwardProp(prop) {
  return shouldForwardProp(prop) && prop !== 'classes';
};
export var slotShouldForwardProp = shouldForwardProp;
var styled = createStyled({
  defaultTheme: defaultTheme,
  rootShouldForwardProp: rootShouldForwardProp
});
export default styled;