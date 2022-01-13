export interface StepConnectorClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `orientation="horizontal"`. */
    horizontal: string;
    /** Styles applied to the root element if `orientation="vertical"`. */
    vertical: string;
    /** Styles applied to the root element if `alternativeLabel={true}`. */
    alternativeLabel: string;
    /** Pseudo-class applied to the root element if `active={true}`. */
    active: string;
    /** Pseudo-class applied to the root element if `completed={true}`. */
    completed: string;
    /** Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: string;
    /** Styles applied to the line element. */
    line: string;
    /** Styles applied to the root element if `orientation="horizontal"`. */
    lineHorizontal: string;
    /** Styles applied to the root element if `orientation="vertical"`. */
    lineVertical: string;
}
export declare type StepConnectorClassKey = keyof StepConnectorClasses;
export declare function getStepConnectorUtilityClass(slot: string): string;
declare const stepConnectorClasses: StepConnectorClasses;
export default stepConnectorClasses;
