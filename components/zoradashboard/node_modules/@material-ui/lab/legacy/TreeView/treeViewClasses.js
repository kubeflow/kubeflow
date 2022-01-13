import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getTreeViewUtilityClass(slot) {
  return generateUtilityClass('MuiTreeView', slot);
}
var treeViewClasses = generateUtilityClasses('MuiTreeView', ['root']);
export default treeViewClasses;