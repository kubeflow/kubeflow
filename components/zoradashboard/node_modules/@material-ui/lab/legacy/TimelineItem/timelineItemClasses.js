import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getTimelineItemUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineItem', slot);
}
var timelineItemClasses = generateUtilityClasses('MuiTimelineItem', ['root', 'positionLeft', 'positionRight', 'positionAlternate', 'missingOppositeContent']);
export default timelineItemClasses;