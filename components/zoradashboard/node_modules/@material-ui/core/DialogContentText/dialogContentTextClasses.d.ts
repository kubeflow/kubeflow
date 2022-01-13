export interface DialogContentTextClasses {
    /** Styles applied to the root element. */
    root: string;
}
export declare type DialogContentTextClassKey = keyof DialogContentTextClasses;
export declare function getDialogContentTextUtilityClass(slot: string): string;
declare const dialogContentTextClasses: DialogContentTextClasses;
export default dialogContentTextClasses;
