export interface SnackbarClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `anchorOrigin={{ 'top', 'center' }}`. */
    anchorOriginTopCenter: string;
    /** Styles applied to the root element if `anchorOrigin={{ 'bottom', 'center' }}`. */
    anchorOriginBottomCenter: string;
    /** Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }}`. */
    anchorOriginTopRight: string;
    /** Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }}`. */
    anchorOriginBottomRight: string;
    /** Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }}`. */
    anchorOriginTopLeft: string;
    /** Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }}`. */
    anchorOriginBottomLeft: string;
}
export declare type SnackbarClassKey = keyof SnackbarClasses;
export declare function getSnackbarUtilityClass(slot: string): string;
declare const snackbarClasses: SnackbarClasses;
export default snackbarClasses;
