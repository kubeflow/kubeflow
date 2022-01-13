export interface StepIconClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the SVG text element. */
    text: string;
    /** Pseudo-class applied to the root element if `active={true}`. */
    active: string;
    /** Pseudo-class applied to the root element if `completed={true}`. */
    completed: string;
    /** Pseudo-class applied to the root element if `error={true}`. */
    error: string;
}
export declare type StepIconClassKey = keyof StepIconClasses;
export declare function getStepIconUtilityClass(slot: string): string;
declare const stepIconClasses: StepIconClasses;
export default stepIconClasses;
