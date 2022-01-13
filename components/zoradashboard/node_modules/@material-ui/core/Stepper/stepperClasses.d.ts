export interface StepperClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `orientation="horizontal"`. */
    horizontal: string;
    /** Styles applied to the root element if `orientation="vertical"`. */
    vertical: string;
    /** Styles applied to the root element if `alternativeLabel={true}`. */
    alternativeLabel: string;
}
export declare type StepperClassKey = keyof StepperClasses;
export declare function getStepperUtilityClass(slot: string): string;
declare const stepperClasses: StepperClasses;
export default stepperClasses;
