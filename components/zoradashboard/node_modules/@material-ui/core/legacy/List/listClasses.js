import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getListUtilityClass(slot) {
  return generateUtilityClass('MuiList', slot);
}
var listClasses = generateUtilityClasses('MuiList', ['root', 'padding', 'dense', 'subheader']);
export default listClasses;