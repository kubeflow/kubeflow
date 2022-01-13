import { generateUtilityClasses, generateUtilityClass } from '@material-ui/unstyled';
export function getInputUtilityClass(slot) {
  return generateUtilityClass('MuiInput', slot);
}
const inputClasses = generateUtilityClasses('MuiInput', ['root', 'formControl', 'focused', 'disabled', 'colorSecondary', 'underline', 'error', 'sizeSmall', 'multiline', 'fullWidth', 'input', 'inputSizeSmall', 'inputMultiline', 'inputTypeSearch']);
export default inputClasses;