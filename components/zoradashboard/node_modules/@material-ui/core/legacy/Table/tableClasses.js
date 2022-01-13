import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getTableUtilityClass(slot) {
  return generateUtilityClass('MuiTable', slot);
}
var tableClasses = generateUtilityClasses('MuiTable', ['root', 'stickyHeader']);
export default tableClasses;