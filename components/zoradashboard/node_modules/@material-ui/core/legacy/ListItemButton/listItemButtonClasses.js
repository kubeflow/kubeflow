import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getListItemButtonUtilityClass(slot) {
  return generateUtilityClass('MuiListItemButton', slot);
}
var listItemButtonClasses = generateUtilityClasses('MuiListItemButton', ['root', 'focusVisible', 'dense', 'alignItemsFlexStart', 'disabled', 'divider', 'gutters', 'selected']);
export default listItemButtonClasses;