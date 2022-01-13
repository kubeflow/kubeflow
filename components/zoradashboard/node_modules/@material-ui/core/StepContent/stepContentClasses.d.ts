export interface StepContentClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `last={true}` (controlled by `Step`). */
    last: string;
    /** Styles applied to the Transition component. */
    transition: string;
}
export declare type StepContentClassKey = keyof StepContentClasses;
export declare function getStepContentUtilityClass(slot: string): string;
declare const stepContentClasses: StepContentClasses;
export default stepContentClasses;
