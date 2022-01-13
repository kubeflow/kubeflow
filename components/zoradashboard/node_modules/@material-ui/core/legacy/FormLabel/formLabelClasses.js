import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getFormLabelUtilityClasses(slot) {
  return generateUtilityClass('MuiFormLabel', slot);
}
var formLabelClasses = generateUtilityClasses('MuiFormLabel', ['root', 'colorSecondary', 'focused', 'disabled', 'error', 'filled', 'required', 'asterisk']);
export default formLabelClasses;