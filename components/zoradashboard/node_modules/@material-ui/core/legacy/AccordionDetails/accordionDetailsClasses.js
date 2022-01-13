import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getAccordionDetailsUtilityClass(slot) {
  return generateUtilityClass('MuiAccordionDetails', slot);
}
var accordionDetailsClasses = generateUtilityClasses('MuiAccordionDetails', ['root']);
export default accordionDetailsClasses;