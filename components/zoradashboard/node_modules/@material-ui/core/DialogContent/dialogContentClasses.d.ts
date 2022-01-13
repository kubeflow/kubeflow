export interface DialogContentClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `dividers={true}`. */
    dividers: string;
}
export declare type DialogContentClassKey = keyof DialogContentClasses;
export declare function getDialogContentUtilityClass(slot: string): string;
declare const dialogContentClasses: DialogContentClasses;
export default dialogContentClasses;
