import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getAvatarGroupUtilityClass(slot) {
  return generateUtilityClass('MuiAvatarGroup', slot);
}
var avatarGroupClasses = generateUtilityClasses('MuiAvatarGroup', ['root', 'avatar']);
export default avatarGroupClasses;