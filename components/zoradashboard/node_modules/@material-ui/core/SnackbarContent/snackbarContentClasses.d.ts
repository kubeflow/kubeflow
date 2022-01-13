export interface SnackbarContentClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the message wrapper element. */
    message: string;
    /** Styles applied to the action wrapper element if `action` is provided. */
    action: string;
}
export declare type SnackbarContentClassKey = keyof SnackbarContentClasses;
export declare function getSnackbarContentUtilityClass(slot: string): string;
declare const snackbarContentClasses: SnackbarContentClasses;
export default snackbarContentClasses;
