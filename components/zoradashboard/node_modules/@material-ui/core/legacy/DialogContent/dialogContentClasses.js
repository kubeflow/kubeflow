import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getDialogContentUtilityClass(slot) {
  return generateUtilityClass('MuiDialogContent', slot);
}
var dialogContentClasses = generateUtilityClasses('MuiDialogContent', ['root', 'dividers']);
export default dialogContentClasses;