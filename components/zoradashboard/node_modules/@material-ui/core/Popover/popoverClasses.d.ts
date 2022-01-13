export interface PopoverClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the Paper component. */
    paper: string;
}
export declare type PopoverClassKey = keyof PopoverClasses;
export declare function getPopoverUtilityClass(slot: string): string;
declare const popoverClasses: PopoverClasses;
export default popoverClasses;
