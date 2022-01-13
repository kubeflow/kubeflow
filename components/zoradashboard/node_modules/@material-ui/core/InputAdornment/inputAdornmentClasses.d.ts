export interface InputAdornmentClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `variant="filled"`. */
    filled: string;
    /** Styles applied to the root element if `variant="outlined"`. */
    outlined: string;
    /** Styles applied to the root element if `variant="standard"`. */
    standard: string;
    /** Styles applied to the root element if `position="start"`. */
    positionStart: string;
    /** Styles applied to the root element if `position="end"`. */
    positionEnd: string;
    /** Styles applied to the root element if `disablePointerEvents={true}`. */
    disablePointerEvents: string;
    /** Styles applied if the adornment is used inside <FormControl hiddenLabel />. */
    hiddenLabel: string;
    /** Styles applied if the adornment is used inside <FormControl size="small" />. */
    sizeSmall: string;
}
export declare type InputAdornmentClassKey = keyof InputAdornmentClasses;
export declare function getInputAdornmentUtilityClass(slot: string): string;
declare const inputAdornmentClasses: InputAdornmentClasses;
export default inputAdornmentClasses;
