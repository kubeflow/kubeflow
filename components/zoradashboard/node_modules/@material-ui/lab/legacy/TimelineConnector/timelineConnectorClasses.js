import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getTimelineConnectorUtilityClass(slot) {
  return generateUtilityClass('MuiTimelineConnector', slot);
}
var timelineConnectorClasses = generateUtilityClasses('MuiTimelineConnector', ['root']);
export default timelineConnectorClasses;