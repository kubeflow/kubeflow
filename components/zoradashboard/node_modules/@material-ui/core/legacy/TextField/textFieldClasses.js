import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getTextFieldUtilityClass(slot) {
  return generateUtilityClass('MuiTextField', slot);
}
var textFieldClasses = generateUtilityClasses('MuiTextField', ['root']);
export default textFieldClasses;