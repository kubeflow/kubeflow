import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getListItemSecondaryActionClassesUtilityClass(slot) {
  return generateUtilityClass('MuiListItemSecondaryAction', slot);
}
var listItemSecondaryActionClasses = generateUtilityClasses('MuiListItemSecondaryAction', ['root', 'disableGutters']);
export default listItemSecondaryActionClasses;