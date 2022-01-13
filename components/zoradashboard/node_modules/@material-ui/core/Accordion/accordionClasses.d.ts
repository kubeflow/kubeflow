export interface AccordionClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element unless `square={true}`. */
    rounded: string;
    /** Pseudo-class applied to the root element if `expanded={true}`. */
    expanded: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** Styles applied to the root element unless `disableGutters={true}`. */
    gutters: string;
    /** Styles applied to the region element, the container of the children. */
    region: string;
}
export declare type AccordionClassKey = keyof AccordionClasses;
export declare function getAccordionUtilityClass(slot: string): string;
declare const accordionClasses: AccordionClasses;
export default accordionClasses;
