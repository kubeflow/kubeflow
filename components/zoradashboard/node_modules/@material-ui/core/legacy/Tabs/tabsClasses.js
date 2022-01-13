import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getTabsUtilityClass(slot) {
  return generateUtilityClass('MuiTabs', slot);
}
var tabsClasses = generateUtilityClasses('MuiTabs', ['root', 'vertical', 'flexContainer', 'flexContainerVertical', 'centered', 'scroller', 'fixed', 'scrollableX', 'scrollableY', 'hideScrollbar', 'scrollButtons', 'scrollButtonsHideMobile', 'indicator']);
export default tabsClasses;