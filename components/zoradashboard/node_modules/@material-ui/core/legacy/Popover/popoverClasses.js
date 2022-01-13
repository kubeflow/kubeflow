import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getPopoverUtilityClass(slot) {
  return generateUtilityClass('MuiPopover', slot);
}
var popoverClasses = generateUtilityClasses('MuiPopover', ['root', 'paper']);
export default popoverClasses;