import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getToolbarUtilityClass(slot) {
  return generateUtilityClass('MuiToolbar', slot);
}
var toolbarClasses = generateUtilityClasses('MuiToolbar', ['root', 'gutters', 'regular', 'dense']);
export default toolbarClasses;