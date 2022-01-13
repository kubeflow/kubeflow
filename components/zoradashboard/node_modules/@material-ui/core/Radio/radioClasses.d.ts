export interface RadioClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Pseudo-class applied to the root element if `checked={true}`. */
    checked: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** Styles applied to the root element if `color="primary"`. */
    colorPrimary: string;
    /** Styles applied to the root element if `color="secondary"`. */
    colorSecondary: string;
}
export declare type RadioClassKey = keyof RadioClasses;
export declare function getRadioUtilityClass(slot: string): string;
declare const radioClasses: RadioClasses;
export default radioClasses;
