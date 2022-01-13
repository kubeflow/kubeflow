import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getYearPickerUtilityClass(slot) {
  return generateUtilityClass('MuiYearPicker', slot);
}
var yearPickerClasses = generateUtilityClasses('MuiYearPicker', ['root']);
export default yearPickerClasses;