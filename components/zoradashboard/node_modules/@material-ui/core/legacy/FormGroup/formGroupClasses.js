import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getFormGroupUtilityClass(slot) {
  return generateUtilityClass('MuiFormGroup', slot);
}
var formGroupClasses = generateUtilityClasses('MuiFormGroup', ['root', 'row']);
export default formGroupClasses;