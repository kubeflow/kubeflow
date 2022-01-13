import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getAccordionSummaryUtilityClass(slot) {
  return generateUtilityClass('MuiAccordionSummary', slot);
}
var accordionSummaryClasses = generateUtilityClasses('MuiAccordionSummary', ['root', 'expanded', 'focusVisible', 'disabled', 'gutters', 'contentGutters', 'content', 'expandIconWrapper']);
export default accordionSummaryClasses;