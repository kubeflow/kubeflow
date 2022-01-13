import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getListItemAvatarUtilityClass(slot) {
  return generateUtilityClass('MuiListItemAvatar', slot);
}
var listItemAvatarClasses = generateUtilityClasses('MuiListItemAvatar', ['root', 'alignItemsFlexStart']);
export default listItemAvatarClasses;