export interface FormHelperTextClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Pseudo-class applied to the root element if `error={true}`. */
    error: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** Styles applied to the root element if `size="small"`. */
    sizeSmall: string;
    /** Styles applied to the root element if `variant="filled"` or `variant="outlined"`. */
    contained: string;
    /** Pseudo-class applied to the root element if `focused={true}`. */
    focused: string;
    /** Pseudo-class applied to the root element if `filled={true}`. */
    filled: string;
    /** Pseudo-class applied to the root element if `required={true}`. */
    required: string;
}
export declare type FormHelperTextClassKey = keyof FormHelperTextClasses;
export declare function getFormHelperTextUtilityClasses(slot: string): string;
declare const formHelperTextClasses: FormHelperTextClasses;
export default formHelperTextClasses;
