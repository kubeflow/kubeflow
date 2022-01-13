export interface FormControlClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `margin="normal"`. */
    marginNormal: string;
    /** Styles applied to the root element if `margin="dense"`. */
    marginDense: string;
    /** Styles applied to the root element if `fullWidth={true}`. */
    fullWidth: string;
}
export declare type FormControlClassKey = keyof FormControlClasses;
export declare function getFormControlUtilityClasses(slot: string): string;
declare const formControlClasses: FormControlClasses;
export default formControlClasses;
