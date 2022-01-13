import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getRatingUtilityClass(slot) {
  return generateUtilityClass('MuiRating', slot);
}
var ratingClasses = generateUtilityClasses('MuiRating', ['root', 'sizeSmall', 'sizeMedium', 'sizeLarge', 'readOnly', 'disabled', 'focusVisible', 'visuallyHidden', 'pristine', 'label', 'labelEmptyValueActive', 'icon', 'iconEmpty', 'iconFilled', 'iconHover', 'iconFocus', 'iconActive', 'decimal']);
export default ratingClasses;