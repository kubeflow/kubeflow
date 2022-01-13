import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getIconButtonUtilityClass(slot) {
  return generateUtilityClass('MuiIconButton', slot);
}
var iconButtonClasses = generateUtilityClasses('MuiIconButton', ['root', 'disabled', 'colorInherit', 'colorPrimary', 'colorSecondary', 'edgeStart', 'edgeEnd', 'sizeSmall', 'sizeMedium', 'sizeLarge']);
export default iconButtonClasses;