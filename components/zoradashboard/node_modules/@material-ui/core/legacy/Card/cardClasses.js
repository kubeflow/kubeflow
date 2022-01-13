import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getCardUtilityClass(slot) {
  return generateUtilityClass('MuiCard', slot);
}
var cardClasses = generateUtilityClasses('MuiCard', ['root']);
export default cardClasses;