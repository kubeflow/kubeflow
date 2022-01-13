import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getCardMediaUtilityClass(slot) {
  return generateUtilityClass('MuiCardMedia', slot);
}
var cardMediaClasses = generateUtilityClasses('MuiCardMedia', ['root', 'media', 'img']);
export default cardMediaClasses;