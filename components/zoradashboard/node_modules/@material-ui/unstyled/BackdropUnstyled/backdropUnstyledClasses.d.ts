export interface BackdropUnstyledClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `invisible={true}`. */
    invisible: string;
}
export declare type BackdropUnstyledClassKey = keyof BackdropUnstyledClasses;
export declare function getBackdropUtilityClass(slot: string): string;
declare const backdropUnstyledClasses: BackdropUnstyledClasses;
export default backdropUnstyledClasses;
