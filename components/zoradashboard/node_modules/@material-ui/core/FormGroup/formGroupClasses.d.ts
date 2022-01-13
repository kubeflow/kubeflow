export interface FormGroupClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `row={true}`. */
    row: string;
}
export declare type FormGroupClassKey = keyof FormGroupClasses;
export declare function getFormGroupUtilityClass(slot: string): string;
declare const formGroupClasses: FormGroupClasses;
export default formGroupClasses;
