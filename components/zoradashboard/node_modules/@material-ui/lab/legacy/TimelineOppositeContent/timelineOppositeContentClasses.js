import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getTimelineOppositeContentUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineOppositeContent', slot);
}
var timelineOppositeContentClasses = generateUtilityClasses('MuiTimelineOppositeContent', ['root', 'positionLeft', 'positionRight', 'positionAlternate']);
export default timelineOppositeContentClasses;