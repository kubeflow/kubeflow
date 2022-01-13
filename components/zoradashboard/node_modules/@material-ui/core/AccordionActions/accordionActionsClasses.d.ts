export interface AccordionActionsClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element unless `disableSpacing={true}`. */
    spacing: string;
}
export declare type AccordionActionsClassKey = keyof AccordionActionsClasses;
export declare function getAccordionActionsUtilityClass(slot: string): string;
declare const accordionActionsClasses: AccordionActionsClasses;
export default accordionActionsClasses;
