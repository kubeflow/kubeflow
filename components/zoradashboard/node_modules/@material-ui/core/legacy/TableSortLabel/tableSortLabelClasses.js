import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getTableSortLabelUtilityClass(slot) {
  return generateUtilityClass('MuiTableSortLabel', slot);
}
var tableSortLabelClasses = generateUtilityClasses('MuiTableSortLabel', ['root', 'active', 'icon', 'iconDirectionDesc', 'iconDirectionAsc']);
export default tableSortLabelClasses;