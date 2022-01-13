export interface StepClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `orientation="horizontal"`. */
    horizontal: string;
    /** Styles applied to the root element if `orientation="vertical"`. */
    vertical: string;
    /** Styles applied to the root element if `alternativeLabel={true}`. */
    alternativeLabel: string;
    /** Pseudo-class applied to the root element if `completed={true}`. */
    completed: string;
}
export declare type StepClassKey = keyof StepClasses;
export declare function getStepUtilityClass(slot: string): string;
declare const stepClasses: StepClasses;
export default stepClasses;
