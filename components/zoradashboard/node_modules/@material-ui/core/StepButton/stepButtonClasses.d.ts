export interface StepButtonClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `orientation="horizontal"`. */
    horizontal: string;
    /** Styles applied to the root element if `orientation="vertical"`. */
    vertical: string;
    /** Styles applied to the `ButtonBase` touch-ripple. */
    touchRipple: string;
}
export declare type StepButtonClassKey = keyof StepButtonClasses;
export declare function getStepButtonUtilityClass(slot: string): string;
declare const stepButtonClasses: StepButtonClasses;
export default stepButtonClasses;
