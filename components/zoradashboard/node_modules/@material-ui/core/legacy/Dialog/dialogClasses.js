import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getDialogUtilityClass(slot) {
  return generateUtilityClass('MuiDialog', slot);
}
var dialogClasses = generateUtilityClasses('MuiDialog', ['root', 'scrollPaper', 'scrollBody', 'container', 'paper', 'paperScrollPaper', 'paperScrollBody', 'paperWidthFalse', 'paperWidthXs', 'paperWidthSm', 'paperWidthMd', 'paperWidthLg', 'paperWidthXl', 'paperFullWidth', 'paperFullScreen']);
export default dialogClasses;