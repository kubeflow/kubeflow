export interface CircularProgressClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `variant="determinate"`. */
    determinate: string;
    /** Styles applied to the root element if `variant="indeterminate"`. */
    indeterminate: string;
    /** Styles applied to the root element if `color="primary"`. */
    colorPrimary: string;
    /** Styles applied to the root element if `color="secondary"`. */
    colorSecondary: string;
    /** Styles applied to the svg element. */
    svg: string;
    /** Styles applied to the `circle` svg path. */
    circle: string;
    /** Styles applied to the `circle` svg path if `variant="determinate"`. */
    circleDeterminate: string;
    /** Styles applied to the `circle` svg path if `variant="indeterminate"`. */
    circleIndeterminate: string;
    /** Styles applied to the `circle` svg path if `disableShrink={true}`. */
    circleDisableShrink: string;
}
export declare type CircularProgressClassKey = keyof CircularProgressClasses;
export declare function getCircularProgressUtilityClass(slot: string): string;
declare const circularProgressClasses: CircularProgressClasses;
export default circularProgressClasses;
