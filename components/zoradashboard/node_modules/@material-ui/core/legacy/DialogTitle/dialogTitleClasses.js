import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getDialogTitleUtilityClass(slot) {
  return generateUtilityClass('MuiDialogTitle', slot);
}
var dialogTitleClasses = generateUtilityClasses('MuiDialogTitle', ['root']);
export default dialogTitleClasses;