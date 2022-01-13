import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getAlertTitleUtilityClass(slot) {
  return generateUtilityClass('MuiAlertTitle', slot);
}
var alertTitleClasses = generateUtilityClasses('MuiAlertTitle', ['root']);
export default alertTitleClasses;