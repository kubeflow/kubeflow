export interface OutlinedInputClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if the color is secondary. */
    colorSecondary: string;
    /** Styles applied to the root element if the component is focused. */
    focused: string;
    /** Styles applied to the root element if `disabled={true}`. */
    disabled: string;
    /** Styles applied to the root element if `startAdornment` is provided. */
    adornedStart: string;
    /** Styles applied to the root element if `endAdornment` is provided. */
    adornedEnd: string;
    /** Pseudo-class applied to the root element if `error={true}`. */
    error: string;
    /** Styles applied to the input element if `size="small"`. */
    sizeSmall: string;
    /** Styles applied to the root element if `multiline={true}`. */
    multiline: string;
    /** Styles applied to the NotchedOutline element. */
    notchedOutline: string;
    /** Styles applied to the input element. */
    input: string;
    /** Styles applied to the input element if `size="small"`. */
    inputSizeSmall: string;
    /** Styles applied to the input element if `multiline={true}`. */
    inputMultiline: string;
    /** Styles applied to the input element if `startAdornment` is provided. */
    inputAdornedStart: string;
    /** Styles applied to the input element if `endAdornment` is provided. */
    inputAdornedEnd: string;
}
export declare type OutlinedInputClassKey = keyof OutlinedInputClasses;
export declare function getOutlinedInputUtilityClass(slot: string): string;
declare const outlinedInputClasses: OutlinedInputClasses;
export default outlinedInputClasses;
