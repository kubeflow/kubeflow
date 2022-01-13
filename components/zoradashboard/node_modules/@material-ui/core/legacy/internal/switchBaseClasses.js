import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getSwitchBaseUtilityClass(slot) {
  return generateUtilityClass('PrivateSwitchBase', slot);
}
var switchBaseClasses = generateUtilityClasses('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);
export default switchBaseClasses;