import generateUtilityClasses from '../generateUtilityClasses';
import generateUtilityClass from '../generateUtilityClass';
export function getBackdropUtilityClass(slot) {
  return generateUtilityClass('MuiBackdrop', slot);
}
var backdropUnstyledClasses = generateUtilityClasses('MuiBackdrop', ['root', 'invisible']);
export default backdropUnstyledClasses;