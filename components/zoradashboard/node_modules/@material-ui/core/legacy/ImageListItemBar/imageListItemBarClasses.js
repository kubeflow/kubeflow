import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getImageListItemBarUtilityClass(slot) {
  return generateUtilityClass('MuiImageListItemBar', slot);
}
var imageListItemBarClasses = generateUtilityClasses('MuiImageListItemBar', ['root', 'positionBottom', 'positionTop', 'positionBelow', 'titleWrap', 'titleWrapBottom', 'titleWrapTop', 'titleWrapBelow', 'titleWrapActionPosLeft', 'titleWrapActionPosRight', 'title', 'subtitle', 'actionIcon', 'actionIconActionPosLeft', 'actionIconActionPosRight']);
export default imageListItemBarClasses;