import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getSelectUtilityClasses(slot) {
  return generateUtilityClass('MuiSelect', slot);
}
var selectClasses = generateUtilityClasses('MuiSelect', ['root', 'select', 'filled', 'outlined', 'standard', 'disabled', 'focused', 'icon', 'iconOpen', 'iconFilled', 'iconOutlined', 'iconStandard', 'nativeInput']);
export default selectClasses;