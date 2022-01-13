export interface TimelineDotClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `variant="filled"`. */
    filled: string;
    /** Styles applied to the root element if `variant="outlined"`. */
    outlined: string;
    /** Styles applied to the root element if `color="grey"` and `variant="filled"`. */
    filledGrey: string;
    /** Styles applied to the root element if `color="grey"` and `variant="outlined"`. */
    outlinedGrey: string;
    /** Styles applied to the root element if `color="primary"` and `variant="filled"`. */
    filledPrimary: string;
    /** Styles applied to the root element if `color="primary"` and `variant="outlined"`. */
    outlinedPrimary: string;
    /** Styles applied to the root element if `color="secondary"` and `variant="filled"`. */
    filledSecondary: string;
    /** Styles applied to the root element if `color="secondary"` and `variant="outlined"`. */
    outlinedSecondary: string;
}
export declare type TimelineDotClassKey = keyof TimelineDotClasses;
export declare function getTimelineDotUtilityClass(slot: string): string;
declare const timelineDotClasses: TimelineDotClasses;
export default timelineDotClasses;
