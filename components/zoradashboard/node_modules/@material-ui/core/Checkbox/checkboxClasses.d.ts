export interface CheckboxClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Pseudo-class applied to the root element if `checked={true}`. */
    checked: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** Pseudo-class applied to the root element if `indeterminate={true}`. */
    indeterminate: string;
    /** Styles applied to the root element if `color="primary"`. */
    colorPrimary: string;
    /** Styles applied to the root element if `color="secondary"`. */
    colorSecondary: string;
}
export declare type CheckboxClassKey = keyof CheckboxClasses;
export declare function getCheckboxUtilityClass(slot: string): string;
declare const checkboxClasses: CheckboxClasses;
export default checkboxClasses;
