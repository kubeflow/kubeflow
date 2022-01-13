import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getCardActionsUtilityClass(slot) {
  return generateUtilityClass('MuiCardActions', slot);
}
var cardActionsClasses = generateUtilityClasses('MuiCardActions', ['root', 'spacing']);
export default cardActionsClasses;