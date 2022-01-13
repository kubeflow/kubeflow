export interface ToggleButtonClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** Pseudo-class applied to the root element if `selected={true}`. */
    selected: string;
    /** Pseudo-class applied to the root element if `color="standard"`. */
    standard: string;
    /** Pseudo-class applied to the root element if `color="primary"`. */
    primary: string;
    /** Pseudo-class applied to the root element if `color="secondary"`. */
    secondary: string;
    /** Styles applied to the root element if `size="small"`. */
    sizeSmall: string;
    /** Styles applied to the root element if `size="medium"`. */
    sizeMedium: string;
    /** Styles applied to the root element if `size="large"`. */
    sizeLarge: string;
}
export declare type ToggleButtonClassKey = keyof ToggleButtonClasses;
export declare function getToggleButtonUtilityClass(slot: string): string;
declare const toggleButtonClasses: ToggleButtonClasses;
export default toggleButtonClasses;
