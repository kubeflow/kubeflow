import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getCardContentUtilityClass(slot) {
  return generateUtilityClass('MuiCardContent', slot);
}
var cardContentClasses = generateUtilityClasses('MuiCardContent', ['root']);
export default cardContentClasses;