import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getImageListItemUtilityClass(slot) {
  return generateUtilityClass('MuiImageListItem', slot);
}
var imageListItemClasses = generateUtilityClasses('MuiImageListItem', ['root', 'img', 'standard', 'woven', 'masonry', 'quilted']);
export default imageListItemClasses;