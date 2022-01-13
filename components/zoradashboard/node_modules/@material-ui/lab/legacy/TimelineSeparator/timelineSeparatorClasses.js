import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getTimelineSeparatorUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineSeparator', slot);
}
var timelineSeparatorClasses = generateUtilityClasses('MuiTimelineSeparator', ['root']);
export default timelineSeparatorClasses;