export interface StepLabelClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `orientation="horizontal"`. */
    horizontal: string;
    /** Styles applied to the root element if `orientation="vertical"`. */
    vertical: string;
    /** Styles applied to the label element that wraps `children`. */
    label: string;
    /** Pseudo-class applied to the label element if `active={true}`. */
    active: string;
    /** Pseudo-class applied to the label element if `completed={true}`. */
    completed: string;
    /** Pseudo-class applied to the root and label elements if `error={true}`. */
    error: string;
    /** Pseudo-class applied to the root and label elements if `disabled={true}`. */
    disabled: string;
    /** Styles applied to the `icon` container element. */
    iconContainer: string;
    /** Pseudo-class applied to the root and icon container and label if `alternativeLabel={true}`. */
    alternativeLabel: string;
    /** Styles applied to the container element which wraps label and `optional`. */
    labelContainer: string;
}
export declare type StepLabelClassKey = keyof StepLabelClasses;
export declare function getStepLabelUtilityClass(slot: string): string;
declare const stepLabelClasses: StepLabelClasses;
export default stepLabelClasses;
