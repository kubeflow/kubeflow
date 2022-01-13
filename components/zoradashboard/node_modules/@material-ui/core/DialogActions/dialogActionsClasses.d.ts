export interface DialogActionsClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element unless `disableSpacing={true}`. */
    spacing: string;
}
export declare type DialogActionsClassKey = keyof DialogActionsClasses;
export declare function getDialogActionsUtilityClass(slot: string): string;
declare const dialogActionsClasses: DialogActionsClasses;
export default dialogActionsClasses;
